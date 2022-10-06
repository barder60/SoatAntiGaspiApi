"use strict";
import cors from 'cors';
import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import { db } from './db';
import { Offer } from './types/Offer'
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(cors());

app.get('/offers/:id', async (req: Request, res:Response) => {
   const { id } = req.params;

   const user = await db.any("SELECT * FROM antigaspi.Offers WHERE Id = $1", [id]);
   
   res.send(user);
});

app.post('/offers', async (req: Request, res:Response) => {
 const {title, description, email, companyName, address, availability, expiration, status } = req.body;
 
 const offer:Offer = Object.assign(new Offer(), { id: uuidv4(), title, description, email, companyName, address, availability, expiration, status });

 const validationResult = offer.getValidationResult();
 
 if(!validationResult.isValid) {
   res.status(400);
   res.send(validationResult.errors);
 }

db.one('INSERT INTO antigaspi.Offers(id, title, description, email, companyName, address, availability, expiration, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id', 

[offer.id, offer.title, offer.description, offer.email, offer.companyName, offer.address, offer.availability, offer.expiration, offer.status])

.then((data) => {
   res.status(201);
   res.send(offer);
})
.catch((error) => {
   res.status(500);
   res.send(error);
})})
app.listen(process.env.API_PORT, () => console.log(`Listening on port ${process.env.API_PORT}`));

export const calculate = () => {
   return 1
}