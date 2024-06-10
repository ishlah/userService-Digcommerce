"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.userRouter = express_1.default.Router();
const userController_1 = require("../controllers/userController");
// Creat User
exports.userRouter.post("/api/users/", userController_1.userControllers.handleCreateUser);
// Edit Profile
exports.userRouter.patch("/api/users/:id", userController_1.userControllers.handleEditUser);
// Add Payment Details
exports.userRouter.patch("/api/users/payment-details/:id", userController_1.userControllers.handleAddPaymentDetail);
//Just for trying
exports.userRouter.get("/api/users/", userController_1.userControllers.handleGetUsers);
// Get User By Email
exports.userRouter.post("/api/userEmail", userController_1.userControllers.handleLoginByEmail);
// Delet User
exports.userRouter.delete("/api/users/:id", userController_1.userControllers.handleDeletUser);
