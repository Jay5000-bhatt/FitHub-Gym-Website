import bcryptjs from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import validator from "validator";
import Trainer from "../Models/TrainerModel.js";
import Product from "../Models/ProductModel.js";
import User from "../Models/UserModal.js";
import Order from "../Models/OrderModel.js";

dotenv.config();

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET_KEY);
      res.json({
        success: true,
        message: "Logged in successfully",
        Token: token,
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log("Error in login ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const addTrainer = async (req, res) => {
  const { name, email, password, speciality, experience, about, fees } =
    req.body;
  const imageFile = req.file;

  try {
    // Check for missing fields
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !experience ||
      !about ||
      !fees
    ) {
      throw new Error("All fields are required");
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter a Valid Email." });
    }

    // Check if trainer already exists
    const TrainerAlreadyExists = await Trainer.findOne({ email });
    if (TrainerAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "Trainer already exists" });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    // Create new Trainer object
    const TrainerData = new Trainer({
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
      speciality: Array.isArray(speciality)
        ? speciality
        : JSON.parse(speciality),
      experience,
      about,
      fees,
    });

    // Save the trainer
    await TrainerData.save();

    // Respond with success
    res.status(201).json({
      success: true,
      message: "Trainer created successfully",
      Data: {
        ...TrainerData._doc,
        password: undefined, // Do not return password
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find({}).select("-password");
    res.json({
      success: true,
      message: "All Trainers Data fetched successfully",
      data: trainers,
    });
  } catch (error) {
    console.error("Error in getting all trainers ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const addProduct = async (req, res) => {
  const {
    name,
    brandName,
    flavour,
    amount,
    weight,
    servingsPerContainer,
    about,
  } = req.body;
  const imageFile = req.file;

  try {
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    // Create new Trainer object
    const newProduct = new Product({
      ProductImg: imageUrl,
      name,
      brandName,
      flavour,
      amount,
      weight,
      servingsPerContainer,
      about,
    });

    // Save the trainer
    await newProduct.save();

    // Respond with success
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({
      success: true,
      message: "All Products Data fetched successfully",
      data: products,
    });
  } catch (error) {
    console.error("Error in getting all products ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteproduct = async (req, res) => {
  const { productId } = req.body;
  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error in deleting product ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { productId, amount, weight, servingsPerContainer } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, {
      amount,
      weight,
      servingsPerContainer,
    });

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error in updating product ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getReqCustomers = async (req, res) => {
  try {
    const customers = await User.find({ isRequestmade: true });
    res.json({
      success: true,
      message: "Customers data fetched successfully",
      data: customers,
    });
  } catch (error) {
    console.error("Error in getting customers ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updatePaymentStatus = async (req, res) => {
  try {
    const { userId } = req.body;

    const currentDate = new Date();
    const expiryDate = new Date(currentDate);
    expiryDate.setMonth(currentDate.getMonth() + 1);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        isPaymentMade: true,
        dateOfPayment: currentDate,
        dateOfPlanExpiry: expiryDate,
        isRequestmade: false,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      success: true,
      message: "Payment status updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: true, message: "Server error" });
  }
};

export const declineReq = async (req, res) => {
  const { userId } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        isRequestmade: false,
        isPaymentMade: null,
        plan: "free",
        dateOfPayment: null,
        dateOfPlanExpiry: null,
        planprice: 0,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Respond with a success message
    return res.status(200).json({
      success: true,
      message: "Request declined successfully!",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error declining request:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const customers = await User.find({});
    res.json({
      success: true,
      message: "Customers data fetched successfully",
      data: customers,
    });
  } catch (error) {
    console.error("Error in getting customers ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orderData = await Order.find({});

    if (!orderData || orderData.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found." });
    }

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orderData,
    });
  } catch (error) {
    console.error("Error in getting order data: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const adminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.find({});
    const totalOrders = await Order.find({});

    const totalEarnings = totalOrders.reduce(
      (acc, order) => acc + order.amount,
      0
    );

    const DashData = {
      totalUsers: totalUsers.length,
      totalOrders: totalOrders.length,
      totalEarnings: totalEarnings,
    };

    res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      data: DashData,
    });
  } catch (error) {
    console.error("Error in getting dashboard data ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
