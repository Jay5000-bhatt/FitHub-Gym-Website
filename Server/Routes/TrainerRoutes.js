import express from "express";

import {
  TrainerLogin,
  TrainerProfile,
  UpdateProfile,
  adminDashboard,
  getAllCustomers,
  getAllOrders,
} from "../Controllers/TrainerController.js";
import { AuthTrainer } from "../Middleware/AuthTrainer.js";

const TrainerRouter = express.Router();

TrainerRouter.post("/trainer-login", TrainerLogin);

TrainerRouter.get("/profile", AuthTrainer, TrainerProfile);

TrainerRouter.get("/customers-data", AuthTrainer, getAllCustomers);

TrainerRouter.get("/getOrderData", AuthTrainer, getAllOrders);

TrainerRouter.get("/admin-dashboard", AuthTrainer, adminDashboard);

TrainerRouter.put("/update-profile", AuthTrainer, UpdateProfile);

export default TrainerRouter;
