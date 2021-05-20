import express from 'express'
import Routes from './routes'
import Cors from 'cors'
import BodyParser from 'body-parser'
import Dotenv from 'dotenv'
import { DBconnection } from './libs'

Dotenv.config()
const app = express()

app.use(Cors())
app.use(BodyParser.urlencoded({ extended: false}))
app.use(BodyParser.json())

app.use('/', Routes)

DBconnection().then(() => {
    app.listen(process.env.PORT, () => { console.log(`server started at port ${process.env.PORT}`) });
}).catch(error => {
    console.log(error);
});
