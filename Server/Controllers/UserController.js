import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import User from "../Models/UserModal.js";
import Product from "../Models/ProductModel.js";
import Trainer from "../Models/TrainerModel.js";
import Order from "../Models/OrderModel.js";

dotenv.config();

export const registerUser = async (req, res) => {
  const { name, email, password, phone, age, height, weight } = req.body;
  const imageFile = req.file;

  try {
    if (
      !name ||
      !email ||
      !password ||
      !imageFile ||
      !phone ||
      !age ||
      !height ||
      !weight
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists.",
      });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    // Create a new user object
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
      phone,
      age,
      height,
      weight,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User added successfully.",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error: " + error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (isMatch) {
      const Token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "24h",
      });

      res
        .status(200)
        .json({ success: true, message: "Logged in successfully", Token });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error in login ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getUserData = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    } else {
      return res.status(200).json({
        success: true,
        message: "User data fetched successfully",
        data: user,
      });
    }
  } catch (error) {
    console.error("Error in getting user data ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateUserData = async (req, res) => {
  const { userId, name, phone, height, weight, age, plan } = req.body;
  const imageFile = req.file;
  try {
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    if (!name || !phone || !height || !weight || !age || !plan) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    await User.findByIdAndUpdate(userId, {
      name,
      phone,
      height,
      weight,
      age,
      plan,
    });

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;

      await User.findByIdAndUpdate(userId, { image: imageUrl });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Error in updating user data ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getProductData = async (req, res) => {
  try {
    const ProductData = await Product.find({});
    if (!ProductData) {
      return res
        .status(404)
        .json({ success: false, message: "No Products Available." });
    } else {
      return res.status(200).json({
        success: true,
        message: "Products data fetched successfully",
        data: ProductData,
      });
    }
  } catch (error) {
    console.error("Error in getting user product data ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const fetchAllTrainers = async (req, res) => {
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

export const ToggleCart = async (req, res) => {
  const { productId, cart } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, {
      cart: cart,
    });

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error in updating product ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const ToggleWatchList = async (req, res) => {
  const { productId, isLiked } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, {
      isLiked: isLiked,
    });

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      message: "Product added to watchlist successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error in updating product ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getCartProducts = async (req, res) => {
  try {
    const cartProducts = await Product.find({ cart: true });

    if (!cartProducts) {
      return res
        .status(404)
        .json({ success: false, message: "No products in cart" });
    }
    res.status(200).json({
      success: true,
      message: "Cart Products fetched successfully",
      data: cartProducts,
    });
  } catch (error) {
    console.error("Error in getting cart products ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const requestUpgradePlan = async (req, res) => {
  const { userId, planName, isRequested } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, {
      plan: planName,
      isRequestmade: isRequested,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({
      success: true,
      message: "Request to upgrade plan sent successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error in updating user ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const placeOrder = async (req, res) => {
  const { productId, userId } = req.body;
  try {
    if (!userId || !productId) {
      return res.status(404).json({
        success: false,
        message: "User ID and Product ID are required.",
      });
    }

    // Check if the same user has already placed an order for this product
    const existingOrder = await Order.findOne({
      userId: userId,
      productId: productId,
    });
    if (existingOrder) {
      return res.status(400).json({
        success: false,
        message: "Order for this product has already been placed by this user.",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found in cart." });
    }

    const { name: productName, brandName, flavour, amount } = product;
    if (!productName || !brandName || !flavour || !amount) {
      return res
        .status(400)
        .json({ success: false, message: "Incomplete product details." });
    }
    const newOrder = new Order({
      userId: userId,
      productId: productId,
      productName: productName,
      brandName: brandName,
      flavour: flavour,
      amount: amount,
      isplaced: true,
    });

    await newOrder.save();

    res.status(200).json({
      success: true,
      message: "Order placed successfully",
      data: newOrder,
    });
  } catch (error) {
    console.error("Error in placing order: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getOrders = async (req, res) => {
  const { userId } = req.body;
  try {
    if (!userId) {
      return res
        .status(404)
        .json({ success: false, message: "User ID is required." });
    }
    const OrderData = await Order.find({ userId: userId });

    if (!OrderData) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found for this user." });
    }
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: OrderData,
    });
  } catch (error) {
    console.error("Error in getting orders: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
