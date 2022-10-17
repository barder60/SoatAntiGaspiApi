import express from "express";
const router = express.Router();
import getConnection from '../../models';
import moment from 'moment';


const db = getConnection();
const {Offer} = db


router.get('/offers', async(req, res) => {
    try {
        
        const offersGetted = await Offer.findAll({
            attributes: ["id", "title", "description"],
            rejectOnEmpty: true
        })

        res.status(200).json({ offersGetted })

    } catch (err: any) {
        if (err.name === 'SequelizeEmptyResultError')
            return res.status(404).json({ message: 'The requested resource does not exist.' })
    }
})

router.get('/offer/:id', async(req, res) => {
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


router.post('/offers', async(req, res) => {
    try {

        const { body: newOffer}  = req
        let newBody = {
            ...newOffer
        }

        newBody.expiration = new Date(newOffer.expiration)
        newBody.availability = new Date(newOffer.availability)
        
        const offersCreated = await Offer.create({
            ...newBody
        })

        res.status(201).json({ offersCreated })

    } catch (err: any) {
        if (err.name === 'SequelizeValidationError')
            return res.status(404).json({ message: err.message })
        if (err.name === 'SequelizeEmptyResultError')
            return res.status(404).json({ message: 'The requested resource does not exist.' })
    }
})



export default router;