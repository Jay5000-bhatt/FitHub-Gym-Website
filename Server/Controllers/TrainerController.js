import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Trainer from "../Models/TrainerModel.js";
import User from "../Models/UserModal.js";
import Order from "../Models/OrderModel.js";

dotenv.config();

export const TrainerLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const TrainerData = await Trainer.findOne({ email });
    if (!TrainerData) {
      return res
        .status(401)
        .json({ success: false, message: "Email or Password Incorrect" });
    }
    const isMatch = await bcryptjs.compare(password, TrainerData.password);
    if (!isMatch) {
      const Token = jwt.sign(
        { TrainerId: TrainerData._id },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "24h",
        }
      );
      res.json({ success: true, message: "Logged in successfully", Token });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Email or Password Incorrect" });
    }
  } catch (error) {
    console.error("Error in login ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const TrainerProfile = async (req, res) => {
  try {
    const { TrainerId } = req.body;
    const TrainerData = await Trainer.findById(TrainerId).select("-password");

    if (!TrainerData) {
      return res
        .status(404)
        .json({ success: false, message: "Trainer not found" });
    }

    res.status(200).json({
      success: true,
      message: "Trainer's Profile fetched successfully",
      data: TrainerData,
    });
  } catch (error) {
    console.error("Error in fetching Trainer's profile ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const UpdateProfile = async (req, res) => {
  try {
    const { TrainerId, fees, experience, available } = req.body;

    const updatedTrainer = await Trainer.findByIdAndUpdate(TrainerId, {
      fees,
      experience,
      available,
    });

    if (updatedTrainer) {
      res.status(200).json({
        success: true,
        message: "Trainer's Profile updated successfully",
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Trainer not found" });
    }
  } catch (error) {
    console.error("Error in updating Trainer's profile ", error);
    res.status(500).json({ success: false, message: "Server Error" });
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
