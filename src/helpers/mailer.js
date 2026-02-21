import User from '@/models/userMODEL';
import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs';

export const SendEmail = async ({ email, emailType, UserID }) => {
    try {
        console.log(UserID)
        const hashedToken = await bcrypt.hash(UserID.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(UserID, {$set: { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 }})
        }
        else if (emailType === "RESET") {
            await User.findByIdAndUpdate(UserID,{$set: { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 }})
        }
        // Encode the token to handle special characters like '/' or '$'
        const encodedToken = encodeURIComponent(hashedToken);

        // Configure your email service
        // For Gmail: service: 'gmail', auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS }
        // For Mailtrap (Testing): host: "sandbox.smtp.mailtrap.io", port: 2525, auth: { ... }
        
        var transport = nodemailer.createTransport({
            service: 'gmail', // Use 'gmail' for real emails
            auth: {
                user: process.env.MAIL_USER, 
                pass: process.env.MAIL_PASS  
            }
        });

        const mailOptions = {
            from: process.env.MAIL_USER, // Sender address
            to: email, 
            subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
            
            // Fixed: Use encodedToken to ensure the link works correctly
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "Verify your email" : "Reset your Password"} or copy and paste the link below in your browser: <br>
            <a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}">${process.env.DOMAIN}/verifyEmail?token=${hashedToken}</a></p>`,
        };

        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse


    } catch (error) {
        console.log("Mailer error " + error)
        throw new Error(error.message)

    }

}