import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    public_id: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);


const superheroSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      required: true,
      trim: true,
    },
    real_name: {
      type: String,
      required: true,
      trim: true,
    },
    origin_description: {
      type: String,
      trim: true,
    },
    superpowers: {
      type: [String],
      default: [],
    },
    catch_phrase: {
      type: String,
      trim: true,
    },
  images: {
    type: [imageSchema],
    default: [],
  }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Superhero", superheroSchema);