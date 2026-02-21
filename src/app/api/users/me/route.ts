import { connect } from '@/mongoDBconfig/mongoDBconfig'
import User from '@/models/userMODEL'
import { NextResponse, NextRequest } from 'next/server'
import { getDataFromToken } from '@/helpers/getDataFromToken'



connect()
export async function POST(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        const user =await User.findOne({_id : userId}).select("-password")
    
        
        if(!user){
            return NextResponse.json({ error: "User Does not exist , Please SignUp " }, { status: 400 })
        }
        return NextResponse.json({
            message : "User Found",
            data : user
        })
        
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}