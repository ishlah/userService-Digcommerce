"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const userModel_1 = require("../models/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.userControllers = {
    handleGetUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const allUser = yield userModel_1.User.find();
        res.status(200).json({ message: "Data all users", data: allUser });
    }),
    handleCreateUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username, email, password, first_name, last_name, bio } = req.body;
            const hashedpassword = yield bcrypt_1.default.hash(password, 12);
            const newUser = new userModel_1.User({
                username,
                email,
                password: hashedpassword,
                first_name,
                last_name,
                bio,
                created_at: new Date(),
            });
            // Save the new user to the database
            const user = yield newUser.save();
            return res
                .status(201)
                .json({ message: "Success create new user", data: user });
        }
        catch (error) {
            return res.status(500).json({ message: "Error" });
        }
    }),
    handleEditUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { username, email, password, first_name, last_name, bio } = req.body;
            const hashedpassword = yield bcrypt_1.default.hash(password, 12);
            const editUser = yield userModel_1.User.findByIdAndUpdate(id, {
                username,
                email,
                password: hashedpassword,
                first_name,
                last_name,
                bio,
                updated_at: new Date(),
            }, { new: true });
            if (!editUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(202).json({ message: "success edit user", data: editUser });
        }
        catch (error) {
            return res.status(500).json({ message: "Error" });
        }
    }),
    handleAddPaymentDetail: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { payment_details } = req.body;
            const addPaymentDetail = yield userModel_1.User.findByIdAndUpdate(id, { payment_details }, { new: true });
            if (!payment_details) {
                return res.status(404).json({ message: "User not found" });
            }
            res
                .status(200)
                .json({ message: "Add Payment Details", data: addPaymentDetail });
        }
        catch (error) {
            return res.status(500).json({ message: "Error" });
        }
    }),
    handleLoginByEmail: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: "Missing email parameter" });
        }
        try {
            const user = yield userModel_1.User.findOne({ email });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            res.status(200).json(user);
        }
        catch (err) {
            res.status(500).json({ message: "Error" });
        }
    }),
    handleDeletUser: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield userModel_1.User.findByIdAndDelete(id);
            res.status(200).json({ message: "Delet succes" });
        });
    },
};
