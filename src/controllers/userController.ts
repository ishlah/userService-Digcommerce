import type { Request, Response } from "express";
import { User } from "../models/userModel";
import bcrypt from "bcrypt";

export const userControllers = {
  handleGetUsers: async (req: Request, res: Response) => {
    const allUser = await User.find();
    res.status(200).json({ message: "Data all users", data: allUser });
  },
  handleCreateUser: async (req: Request, res: Response) => {
    try {
      const { username, email, password, first_name, last_name, bio } =
        req.body;
      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        first_name,
        last_name,
        bio,
        created_at: new Date(),
      });

      // Save the new user to the database
      const user = await newUser.save();
      return res
        .status(201)
        .json({ message: "Success create new user", data: user });
    } catch (error) {
      return res.status(500).json({ message: "Error" });
    }
  },
  handleEditUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { username, email, password, first_name, last_name, bio } =
        req.body;
      const hashedPassword = await bcrypt.hash(password, 12);

      const editUser = await User.findByIdAndUpdate(
        id,
        {
          username,
          email,
          password: hashedPassword,
          first_name,
          last_name,
          bio,
          updated_at: new Date(),
        },
        { new: true }
      );
      if (!editUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(202).json({ message: "success edit user", data: editUser });
    } catch (error) {
      return res.status(500).json({ message: "Error" });
    }
  },

  handleAddPaymentDetail: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { payment_details } = req.body;
      const addPaymentDetail = await User.findByIdAndUpdate(
        id,
        { payment_details },
        { new: true }
      );
      if (!payment_details) {
        return res.status(404).json({ message: "User not found" });
      }
      res
        .status(200)
        .json({ message: "Add Payment Details", data: addPaymentDetail });
    } catch (error) {
      return res.status(500).json({ message: "Error" });
    }
  },

  handleLoginByEmail: async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Missing email parameter" });
    }

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: "Error" });
    }
  },
  handleDeletUser: async function (req: Request, res: Response) {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "Delet succes" });
  },
};
