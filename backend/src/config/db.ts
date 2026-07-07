//Instead of writing MongoDB connection everywhere, we create one function that does only one job.
import mongoose from "mongoose";

const connectDB = async () => { //why async because connecting mongodb takes time
    try {
        if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing");
}
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.info("✅ MongoDB Connected");
        
    } catch (error) {
        // res.status(500).error({error:error });//only controller have res and req
        console.error("MongoDB Connection Failed:", error);
        process.exit(1);//process.exit(1);
    }
};
export default connectDB;