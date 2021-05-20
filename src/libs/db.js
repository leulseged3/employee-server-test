import mongoose from 'mongoose'
import Dotenv from 'dotenv'

Dotenv.config()
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.3rfmc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

export const DBconnection = () => mongoose.connect(uri,{ 
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology:true
});
