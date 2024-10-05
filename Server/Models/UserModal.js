import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  plan: {
    type: String,
    default: "free",
  },
  planprice: {
    type: Number,
    default: 0,
  },
  isRequestmade: {
    type: Boolean,
    default: false,
  },
  isPaymentMade: {
    type: Boolean,
    default: false,
  },
  dateOfJoining: {
    type: Date,
    default: Date.now,
  },
  dateOfPayment: {
    type: Date,
    default: null,
  },
  dateOfPlanExpiry: {
    type: Date,
    default: null,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
