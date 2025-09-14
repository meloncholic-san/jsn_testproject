import mongoose from "mongoose";
import { getEnvVar } from "../utils/getEnvVar.js";

export async function initMongoDB() {
  try {
    await mongoose.connect(getEnvVar("MONGO_URL"));
    console.log(`✅ Connected to MongoDB hosted by Railway`);
  } catch (error) {
    console.error("❌ Failed to connect MongoDB", error);
    process.exit(1);
  }
}