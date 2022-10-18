import express from "express";
const router = express.Router();
import getConnection from '../../models';


const db = getConnection();
const {User} = db


router.get('/users', async(req, res) => {
    try {
        
        const usersGetted = await User.findAll({
            attributes: ["id", "firstName", "lastName", "profilImage"],
            rejectOnEmpty: true
        })

        res.status(200).json({ usersGetted })

    } catch (err: any) {
        if (err.name === 'SequelizeEmptyResultError')
            return res.status(404).json({ message: 'The requested resource does not exist.' })
    }
})

router
.get('/user/:id', async(req, res) => {
    try {
        const { id } = req.params
        const usersGetted = await User.findByPk(id, {
            rejectOnEmpty: true
        })

        delete usersGetted.dataValues.password;


        res.status(200).json({ usersGetted })

    } catch (err: any) {
        if (err.name === 'SequelizeEmptyResultError')
            return res.status(404).json({ message: 'The requested resource does not exist.' })
    }
})
.delete('/user/:id', async(req, res) => {
    try {
        const { id } = req.params
        await User.destroy({
            where: {
                id
            }
        })

        res.status(204)

    } catch (err: any) {
        console.log(err)
        console.log('name', err.name)
        if (err.name === 'SequelizeEmptyResultError')
            return res.status(404).json({ message: 'The requested resource does not exist.' })
    }
})



router.post('/users', async(req, res) => {
    try {

        const { body: newUser}  = req
        
        let newBody = {
            ...newUser
        }

        newBody.birthDate = new Date(newUser.birthDate)
        
        const userCreated = await User.create({
            ...newBody
        }, {
            fields: ['id', 'firstName', 'lastName', 'email']
        })

        res.status(201).json({
         userCreated: {
            id: userCreated.dataValues.id,
            firstName: userCreated.dataValues.firstName,
            lastName: userCreated.dataValues.lastName,
            email: userCreated.dataValues.email,
         }
        })

    } catch (err: any) {
        if(err.name === 'SequelizeUniqueConstraintError')
            return res.status(404).json({message: 'Username and Email must be unique'})
        if (err.name === 'SequelizeValidationError')
            return res.status(404).json({ message: err.message })
        if (err.name === 'SequelizeEmptyResultError')
            return res.status(404).json({ message: 'The requested resource does not exist.' })
    }
})



export default router;