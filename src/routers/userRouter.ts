import express from "express";
export const userRouter = express.Router();
import { userControllers } from "../controllers/userController";

// Creat User
userRouter.post("/api/users/", userControllers.handleCreateUser);

// Edit Profile
userRouter.patch("/api/users/:id", userControllers.handleEditUser);

// Add Payment Details
userRouter.patch(
  "/api/users/payment-details/:id",
  userControllers.handleAddPaymentDetail
);

//Just for trying

userRouter.get("/api/users/", userControllers.handleGetUsers);

// Get User By Email
userRouter.get("/api/userEmail", userControllers.handleLoginByEmail);
