import { User } from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import crypto from 'crypto'
import { generateTokenSetCookie } from "../utils/generateTokenSetCookies.js"
import { sendPasswordRestEmail, sendVerificationEmail, sendWelcomeEmail, sendPasswordRestSuccessEmail } from "../maitrap/emails.js";

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

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body
    try {
        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpiresAt: { $gt: Date.now() } })
        if (!user) {
            return res.status(400).json({ success: true, message: "Invalid or expired reset token" })
        }
        user.password = bcryptjs.hashSync(password, 10)
        user.resetPasswordExpiresAt = undefined
        user.resetPasswordToken = undefined
        await user.save()
        await sendPasswordRestSuccessEmail(user.email)
        return res.status(200).json({ success: true, message: "Password updated successfully!" })
    } catch (error) {
        console.log("Password Could not be updated : ", error);
        return res.status(400).json({ success: false, message: "Password Could not be updated!" })
    }
}

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password")
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }
        return res.status(200).json({
            success: true, user
        })

    } catch (error) {
        console.log("Password Could not be updated : ", error);
        return res.status(400).json({ success: false, message: error.message })
    }
}

// rup gun dekhle , ami tomar sathe etodin thaki? amar kono cheler ovab pore nai..
// ami tomar moto na je arekta dhorbo
// tumi bolar k?
// Iccha chole geche..