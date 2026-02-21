import clientPromise from "@/lib/mongodb"
import { getDataFromToken } from "@/helpers/getDataFromToken"

export async function POST(request) {

  try {
    const body = await request.json()
    const client = await clientPromise;
    const db = client.db("SRTlinks")
    const collection = db.collection("url")
    
    // Get user id from token
    const userId = await getDataFromToken(request)

    const check = await collection.findOne({shorturl: body.shorturl})
    if(check){
          return Response.json({success:false, error:true, message: 'URl already exists' })

    }

    const result = await collection.insertOne({
        url : body.url,
        shorturl : body.shorturl,
        userId: userId
    })

    return Response.json({success:true, error:false, message: 'Generated your URL' })
  } catch (error) {
    return Response.json({success:false, error:true, message: error.message })
  }
}