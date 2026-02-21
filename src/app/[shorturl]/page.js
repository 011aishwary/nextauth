import { redirect, notFound } from "next/navigation";
import clientPromise from "@/lib/mongodb";

export default async function Page({ params }) {

    const { shorturl } = await params

    const client = await clientPromise;
    const db = client.db("SRTlinks")
    const collection = db.collection("url")


    const check = await collection.findOne({shorturl: shorturl})
    if(check){
          redirect(check.url)
    }
    else{
        notFound()
    }

  
  return <div>My Post: {shorturl}</div>
}