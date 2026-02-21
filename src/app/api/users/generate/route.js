import clientPromise from "@/lib/mongodb"

export async function POST(request) {

    const body = await request.json()
    const client = await clientPromise;
    const db = client.db("SRTlinks")
    const collection = db.collection("url")
    

    const check = await collection.findOne({shorturl: body.shorturl})
    if(check){
          return Response.json({success:false, error:true, message: 'URl already exists' })

    }

    const result = await collection.insertOne({
        url : body.url,
        shorturl : body.shorturl
        
    })

  return Response.json({success:true, error:false, message: 'Generated your URL' })
}