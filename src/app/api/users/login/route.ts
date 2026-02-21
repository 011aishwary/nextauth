import { connect } from '@/mongoDBconfig/mongoDBconfig'
import User from '@/models/userMODEL'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextResponse, NextRequest } from 'next/server'

connect()
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody
        console.log(reqBody)

        const user = await User.findOne({email})

        if (!user) {
            return NextResponse.json({ error: "User Does not exist , Please SignUp " }, { status: 400 })
        }
        console.log("User Exists")

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) {
            console.log("Invalid Password")
            return NextResponse.json({ error: "Password is incorrect" }, { status: 400 })
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign({
            data: tokenData
        }, process.env.TOKEN_SECRET!, { expiresIn: '1d' });

        const response = NextResponse.json({
            message:"Login Successful",
            success:true
        })
        response.cookies.set("token" ,token ,{
            httpOnly:true,
        })

        return response

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}