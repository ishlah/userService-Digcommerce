"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: String,
    password: String,
    email: String,
    created_at: Date,
    updated_at: Date,
    first_name: String,
    last_name: String,
    bio: String,
    payment_details: String,
});
exports.User = (0, mongoose_1.model)("User", userSchema);
