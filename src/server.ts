import express from 'express';
const app = express();
const port = process.env.PORT || 8080;
import getConnection from './models';
import {offers} from './seeders/offers.seeder';
const db = getConnection();
const swaggerUi = require('swagger-ui-express')
const yaml = require('js-yaml');
const fs = require('fs');
const swaggerFile = yaml.load(fs.readFileSync('./src/swagger/swagger_output.yaml', 'utf8'));


//import routes

import offer from "./router/routes/offers.routes";
import user from "./router/routes/users.routes";

app
  .set('view engine', 'ejs')
  .use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
  .use(express.json())


app.use('/', offer)
app.use('/', user)



db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
})