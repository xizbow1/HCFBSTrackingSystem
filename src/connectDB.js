import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async() => {
    try {
        //update with database name
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected successfully');
    } catch(err ){
        console.log('DB connection error: ', err);
        process.exit(1);
    }
}

export default connectDB;