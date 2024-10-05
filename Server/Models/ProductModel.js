import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    ProductImg: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    brandName: {
      type: String,
      required: true,
    },
    flavour: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    servingsPerContainer: {
      type: Number,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    cart: {
      type: Boolean,
      default: false,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
