import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './db/connectDB.js'
import cors from 'cors'
const app = express()
const port = process.env.PORT || 5000
dotenv.config()
import authRoutes from './routes/auth_route.js'
import cookieParser from 'cookie-parser'
app.get('/', async (req, res) => {
    res.send('Running Successfully!')
})
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use('/api/auth', authRoutes)
app.listen(port, () => {
    connectDB()
    console.log("Server is running on port: ", port);
})
