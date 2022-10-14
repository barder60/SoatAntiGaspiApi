import express from "express";
const router = express.Router();
import getConnection from '../../models';

const db = getConnection();


router.get('/offers', (req, res) => {
    db.Offer.findAll().then((result: object) => res.json(result)).catch((err: object) => console.error(err));
})


export default router;