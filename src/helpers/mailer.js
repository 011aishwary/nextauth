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
        // Create a test account or replace with real credentials.
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "86882953ad183f",
                pass: "a14ed4d0c9a620"
            }
        });

        const mailOptions = {
            from: 'doodle1boogle@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify YOur Email" : "Reset Your Password",

            html: `<p>Click <a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "Verify your email " : "Reset your Password"} "or copy and paste the link in your browser " <br></br>
            <a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}">${process.env.DOMAIN}/verifyEmail?token=${hashedToken}</a></p> `,
        };

        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse


    } catch (error) {
        console.log("Mailer error " + error)
        throw new Error(error.message)

    }

}