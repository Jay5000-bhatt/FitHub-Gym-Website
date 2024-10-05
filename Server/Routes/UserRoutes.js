import express from "express";
import {
  ToggleCart,
  ToggleWatchList,
  fetchAllTrainers,
  getCartProducts,
  getProductData,
  getUserData,
  getOrders,
  loginUser,
  placeOrder,
  registerUser,
  requestUpgradePlan,
  updateUserData,
} from "../Controllers/UserController.js";
import upload from "../Middleware/Multer.js";
import { authUser } from "../Middleware/AuthUser.js";

const UserRouter = express.Router();

UserRouter.get("/trainers", fetchAllTrainers);

UserRouter.get("/productData", getProductData);

UserRouter.get("/userData", authUser, getUserData);

UserRouter.get("/cartData", authUser, getCartProducts);

UserRouter.get("/orderData", authUser, getOrders);

UserRouter.post("/login", loginUser);

UserRouter.post("/placeOrder", authUser, placeOrder);

UserRouter.post("/register", upload.single("image"), registerUser);

UserRouter.put("/update-userData", upload.single("image"), authUser, updateUserData);

UserRouter.put("/cart", authUser, ToggleCart);

UserRouter.put("/watchlist", authUser, ToggleWatchList);

UserRouter.put("/req-check", authUser, requestUpgradePlan);

export default UserRouter;
