import mongoose from "mongoose";
const connectDB = async(DATABASE_URL)=>{
    // console.log("asdf",DATABASE_URL)
    try{
        const DB_options = {
            dbname : 'yahoo',
        }
        await mongoose.connect(DATABASE_URL,DB_options);
        
        console.log('connect successfully');
    }catch(err){
        console.log('err');
    }
}
export default connectDB