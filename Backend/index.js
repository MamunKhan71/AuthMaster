import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './db/connectDB.js'
const app = express()
const port = process.env.PORT || 5000
dotenv.config()
import authRoutes from './routes/auth_route.js'
app.get('/', async (req, res) => {
    res.send('Running Successfully!')
})
app.use(express.json())
app.use('/api/auth', authRoutes)
app.listen(port, () => {
    connectDB()
    console.log("Server is running on port: ", port);
})
