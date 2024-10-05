import mongoose from "mongoose";

const TrainerSchema = new mongoose.Schema(
  {
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
      validate: {
        validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: "Please enter a valid Email Address.",
      },
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    image: {
      type: String,
      required: true,
    },
    speciality: {
      type: [String],
      required: true,
    },
    experience: {
      type: String,
      required: true,
      trim: true,
    },
    about: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1500,
    },
    available: {
      type: Boolean,
      required: true,
      default: true,
    },
    fees: {
      type: Number,
      required: true,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { minimize: false }
);

const Trainer = mongoose.model("Trainer", TrainerSchema);

export default Trainer;
