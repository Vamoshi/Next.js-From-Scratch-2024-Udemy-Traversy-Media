import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  // Only fields specified in schema can be saved to db by strictQuery
  mongoose.set("strictQuery", true);

  if (connected) {
    console.log("====================================");
    console.log("MongoDB is connected");
    console.log("====================================");
    return;
  }

  try {
    // This basically just creates a global mongoose context
    // which can be accessed when using schemas that are created from a mongoose method
    // from what i understand
    await mongoose.connect(process.env.MONGODB_URI as string);
    connected = true;
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
};

export default connectDB;
