import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!)
    const connection = mongoose.connection;

    connection.on('connected', ()=>{
      console.log("Mongo DB connected successfully");
    })

    connection.on('error',(err)=>{
      console.error("Mongo Db connection. Please check if Mongo DB is running." + err);
      process.exit();
    })
    
  } catch (error) {
    console.log("something went wrong");
    console.log(error);
  }
  
}

