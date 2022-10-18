const bcrypt =  require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const tokenControl = require('../../auth/generateToken')
const { ValidationError, UniqueConstraintError } = require('sequelize')


import express from "express";
const router = express.Router();
import getConnection from '../../models';

const db = getConnection();
const {User} = db


router.post('/registration', async(req, res) => {
    try {
        
        const {body: userToAdd} = req
        const userCreated = await User.create(userToAdd)

        const { id: userID, firstName, lastName, username, role } = userCreated.dataValues

        const token = tokenControl.getToken({ username, role })

        res.status(201).json({ userID, firstName, lastName, token })
    } catch (err: any) {
        if (err instanceof ValidationError || err instanceof UniqueConstraintError)
            return res.status(400).json({ message: 'BadRequest' });

          if (err.name === 'SequelizeEmptyResultError')
            return res.status(404).json({ message: err.message })

          return res.status(500).json({ message: 'InternalError' })
    }
})

router.post('/login', async(req, res) => {
    try {
        
        const {body} = req
        const { email, password} = body;


        if(email&& password) {
            const option = {
                where: {
                    email
                },
                rejectOnEmpty: true
            }
            
            const userFound = await User.findOne(option)
            const isPasswordValid = await bcrypt.compare(password, userFound.dataValues.password)
            if (!isPasswordValid) return res.status(404).json({message: 'Wrong password.'})

            const { username, role } = userFound.dataValues
            const token = tokenControl.getToken({ username, role })

            res.status(201).json({ token })

        } else {
            res.status(404).json({'message': 'email and password are obligatory to login'})
        }

    } catch (err: any) {
        console.log(err)
        if (err instanceof ValidationError || err instanceof UniqueConstraintError)
            return res.status(400).json({ name: 'AntiGaspiApi:BadRequest' });

          if (err.name === 'SequelizeEmptyResultError')
            return res.status(404).json({ name: 'AntiGaspiApi:ItemNotFound' })

          return res.status(500).json({ name: 'InternalError' })
    }
})


export default router;