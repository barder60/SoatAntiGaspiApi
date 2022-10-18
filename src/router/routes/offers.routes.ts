import express from "express";
const router = express.Router();
import getConnection from '../../models';
import moment from 'moment';
import { copyFileSync } from "fs";
import {isInTheFuture} from '../../service/date.service'
import {preparePaginationOptions} from '../../service/pagination.service'


const db = getConnection();
const {Offer} = db


router.get('/offers', async(req, res) => {
    try {

        const { query } = req;
        const pagination = preparePaginationOptions(query)

        const options = {
            attributes: ["id", "title", "description"],
            rejectOnEmpty: true,
            ...pagination
        }
        
        const offersGetted = await Offer.findAll(options)

        res.status(200).json({ offersGetted })

    } catch (err: any) {
        if (err.name === 'SequelizeEmptyResultError')
            return res.status(404).json({ message: 'The requested resource does not exist.' })
    }
})

router
.get('/offer/:id', async(req, res) => {
    try {
        const { id } = req.params
        const offersGetted = await Offer.findByPk(id, {
            rejectOnEmpty: true
        })

        res.status(200).json({ offersGetted })

    } catch (err: any) {
        if (err.name === 'SequelizeEmptyResultError')
            return res.status(404).json({ message: 'The requested resource does not exist.' })
    }
})
.delete('/offer/:id', async(req, res) => {
    try {
        const { id } = req.params
        await Offer.destroy({
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



router.post('/offers', async(req, res) => {
    try {

        const { body: newOffer}  = req
        let newBody = {
            ...newOffer
        }

        newBody.expiration = new Date(newOffer.expiration)
        newBody.availability = new Date(newOffer.availability)

        if((isInTheFuture(newBody.expiration) && isInTheFuture(newBody.availability)) === false)
            return res.status(404).json({message: 'Expiration and availability date must be in the future, please verify your body'})
        
        const offersCreated = await Offer.create({
            ...newBody
        })

        res.status(201).json({ offersCreated })

    } catch (err: any) {
        console.log(err)
        if (err.name === 'SequelizeValidationError'|| err.name === 'SequelizeUniqueConstraintError')
            return res.status(404).json({ message: err.message })
        if (err.name === 'SequelizeEmptyResultError')
            return res.status(404).json({ message: 'The requested resource does not exist.' })
    }
})



export default router;