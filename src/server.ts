import express from 'express';
const app = express();
const port = process.env.PORT || 8080;
import getConnection from './models';
import {offers} from './seeders/offers.seeder';
const db = getConnection();

app.get('/', (req, res) => {
  console.log('\x1b[34m' + JSON.stringify(db.Offer) + '\x1b[37m');
    db.Offer.findAll().then((result: object) => res.json(result)).catch((err: object) => console.error(err));
})


db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
})