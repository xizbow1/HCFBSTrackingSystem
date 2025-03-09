import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/hcfbsTrackingSystem');
        console.log('MongoDB connected successfully');
        return conn;
    } catch (err) {
        console.log('DB connection error: ', err);
        process.exit(1);
    }
};

export default connectDB;