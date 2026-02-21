import clientPromise from "@/lib/mongodb";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("SRTlinks")
    const collection = db.collection("url")
    const userId = await getDataFromToken(request)
    const result = await collection.find({ userId: userId }).toArray()

    return Response.json({ success: true, urls: result })
  }
  catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}