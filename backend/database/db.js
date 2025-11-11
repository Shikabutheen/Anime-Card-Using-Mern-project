import mongoose from "mongoose";

const connecedb =async()=>{

    try {
        await mongoose.connect(process.env.MONGO_URL,{
            dbName:"Anime-cards"
        });
        console.log("MongoDb Connected..");
        
    } catch(err) 
        
    {
        console.log(err);
        
    }
}

export default connecedb