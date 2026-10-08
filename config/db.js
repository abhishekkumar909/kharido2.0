import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${process.env.MONGO_URL}`);
  } catch (error) {
    console.error(`Error: mongodb connection failed ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;