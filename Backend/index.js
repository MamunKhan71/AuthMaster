import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './db/connectDB.js'
import cors from 'cors'
const app = express()
const port = process.env.PORT || 5000
import path from 'path'
dotenv.config()
import authRoutes from './routes/auth_route.js'
import cookieParser from 'cookie-parser'
app.use(express.json())
app.use(cookieParser())
const __dirname = path.resolve()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use('/api/auth', authRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}
app.listen(port, () => {
    connectDB()
    console.log("Server is running on port: ", port);
})
