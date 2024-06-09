import { Schema, model } from "mongoose";
import { IUser } from "../types/entity";

const userSchema = new Schema<IUser>({
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

export const User = model("User", userSchema);
