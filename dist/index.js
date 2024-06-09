"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRouter_1 = require("./routers/userRouter");
dotenv_1.default.config();
const DB_URL = process.env.DB_URL_DEV;
mongoose_1.default
    .connect(DB_URL)
    .then(() => console.log("mongodb connect..."))
    .catch((err) => console.log("Error"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", userRouter_1.userRouter);
app.get("/", (req, res) => {
    return res.status(200).json({ msg: "Hello from user service." });
});
const port_connection = process.env.PORT;
app.listen(port_connection);
