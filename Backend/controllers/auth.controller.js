import { User } from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import { generateTokenSetCookie } from "../utils/generateTokenSetCookies.js"
import { sendVerificationEmail } from "../maitrap/emails.js";

export const signup = async (req, res) => {
    const { email, password, name } = req.body;
    console.log(email, password, name);
    try {
        if (!email || !password || !name) {
            throw new Error("All fields are reuquired!")
        }
        const userAlreadyExists = await User.findOne({ email })
        console.log(userAlreadyExists);
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }
        const hashedPassword = bcryptjs.hashSync(password, 10)
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        })
        const result = await user.save()

        // JSON WEB TOKEN
        generateTokenSetCookie(res, user._id,)
        await sendVerificationEmail(user.email, verificationToken);
        res.status(201).json({
            success: true, message: "User created successfully!", user: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}
export const login = async (req, res) => {
    res.send("login Route")
}
export const logout = async (req, res) => {
    res.send("logout Route")
}