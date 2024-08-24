import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })
        console.log("Email send successfully ", response);
    } catch (error) {
        console.log("Error: ", error);
        throw new Error(`Error sending : ${error}`)
    }
}
export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "756a13b6-412d-4feb-833a-94e8b4f635aa",
            template_variables: {
                "company_info_name": "AuthSuite",
                "name": name,
            }
        })
        console.log("Welcome Email sent successfully ", response);
    } catch (error) {
        console.log(`Error Sending Email : ${error}`)
        throw new Error(`Error Sending Email : ${error}`)
    }
}

export const sendPasswordRestEmail = async (email, resetURL) => {
    const recipient = [{ email }]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset"
        })
    } catch (error) {
        console.log("Error sending password reset email : ", error)
        throw new Error(`Error sending password reset email : `, error)
    }
}