import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URI)
        const connection = mongoose.connection

        connection.on("Connected" , ()=>{
            console.log("MongoDB Connected")
        })

        connection.on("error" ,(err)=>{
            console.log("There is an error connectiing to DB , make sure DB is up and Running : " + err)
            process.exit()
        })

    } catch (error) {
        console.log("Something Went Wrong while connectimg to DB")
        console.log(error)
    }
}