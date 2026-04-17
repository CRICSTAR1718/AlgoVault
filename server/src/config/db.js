import mongoose from "mongoose";

async function connectDB() {
  const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/algovault";
  await mongoose.connect(mongoURI);
  console.log("MongoDB connected");
}

export default connectDB;
