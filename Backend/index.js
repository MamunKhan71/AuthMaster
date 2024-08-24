import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './db/connectDB.js'
const app = express()
dotenv.config()
app.get('/', async (req, res) => {
    res.send('Running Successfully!')
})
app.listen(3000, () => {
    connectDB()
    console.log("Server is running on port: 3000");
})
