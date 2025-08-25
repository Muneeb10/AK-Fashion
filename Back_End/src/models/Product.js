import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    images: [String], // paths to uploaded images
    stock: { type: Number, default: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    rating: { type: Number, default: 0 }, // numeric rating
    currentPrice: { type: Number, required: true },
    originalPrice: { type: Number },
    colors: { type: Array }, // array of any type
    sizes: { type: Array }, // array of any type
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
