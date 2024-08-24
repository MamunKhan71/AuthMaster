import { User } from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import crypto from 'crypto'
import { generateTokenSetCookie } from "../utils/generateTokenSetCookies.js"
import { sendPasswordRestEmail, sendVerificationEmail, sendWelcomeEmail } from "../maitrap/emails.js";

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
export const verifyEmail = async (req, res) => {
    const { code } = req.body
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired verification code" })
        }
        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpiresAt = undefined
        await user.save()
        await sendWelcomeEmail(user.email, user.name)
        res.status(200).json({ succcess: true, message: "Email Verified Succesfully!", user: { ...user._doc, password: undefined } })
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ success: false, message: "Server Error" })
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid Credentials!" })
        }
        const isPasswordValid = bcryptjs.compareSync(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid Credentials!" })
        }
        generateTokenSetCookie(res, user._id)
        user.lastLogin = new Date()
        await user.save()
        res.status(200).json({
            success: true,
            message: "Logged In Successfully!",
            user: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        console.log("Error : ", error)
        return res.status(400).json({ success: false, message: error.message })
    }
}
export const logout = async (req, res) => {
    res.clearCookie("token")
    res.status(200).json({ success: true, message: "User Logged out successfully!" })
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: true, message: "User not found!" })
        }
        const resetToken = crypto.randomBytes(20).toString("hex")
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000 // 1 hour
        user.resetPasswordToken = resetToken
        user.resetPasswordExpiresAt = resetTokenExpiresAt
        user.save()
        await sendPasswordRestEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`)
        res.status(200).json({ succcess: true, message: "Password reset link sent to your email" })
    } catch (error) {
        res.status(400).json({ succcess: false, message: error.message })
    }
}