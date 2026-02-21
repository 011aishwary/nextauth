import { connect } from '@/mongoDBconfig/mongoDBconfig'
import User from '@/models/userMODEL'
import bcrypt from 'bcryptjs'
import { NextResponse, NextRequest } from 'next/server'
import { SendEmail } from '@/helpers/mailer'

connect()
export async function POST(request: NextRequest) {
    try {
        
        const reqBody =await request.json()
        const {username, email, password} = reqBody
        console.log(reqBody)

        const user = await User.findOne({email})

        if (user) {
            NextResponse.json({ error: "User Already Exists" }, { status: 400 })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Store hash in your password DB

        const newUser =new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser)


        // send verification email 
        await SendEmail({email , emailType:"VERIFY" ,UserID:savedUser._id})

        return NextResponse.json({
            message: "registered user successfully",
            success:true,
            savedUser
        })


    } catch (error:any) {
        console.log("Big Error" + error)
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}