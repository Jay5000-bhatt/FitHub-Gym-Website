import express from "express";
import {
  addProduct,
  addTrainer,
  adminDashboard,
  adminLogin,
  declineReq,
  deleteproduct,
  getAllCustomers,
  getAllOrders,
  getAllProducts,
  getAllTrainers,
  getReqCustomers,
  updatePaymentStatus,
  updateProduct,
} from "../Controllers/AdminController.js";
import { authAdmin } from "../Middleware/AuthAdmin.js";
import upload from "../Middleware/Multer.js";

const AdminRouter = express.Router();

AdminRouter.post("/add-product", authAdmin, upload.single("ProductImg"), addProduct);

AdminRouter.post("/add-trainer", authAdmin, upload.single("image"), addTrainer);

AdminRouter.post("/login-admin", adminLogin);

AdminRouter.get("/trainerdata", authAdmin, getAllTrainers);

AdminRouter.get("/all-products", authAdmin, getAllProducts);

AdminRouter.get("/get-req", authAdmin, getReqCustomers);

AdminRouter.get("/customers", authAdmin, getAllCustomers);

AdminRouter.get("/getOrderData", authAdmin, getAllOrders);

AdminRouter.get("/admin-dashboard", authAdmin, adminDashboard);

AdminRouter.delete("/remove-product", authAdmin, deleteproduct);

AdminRouter.put("/update-product", authAdmin, updateProduct);

AdminRouter.put("/accept-request", authAdmin, updatePaymentStatus);

AdminRouter.put("/decline-request", authAdmin, declineReq);

export default AdminRouter;
