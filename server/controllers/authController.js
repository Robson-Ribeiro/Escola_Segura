import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserModel from '../models/userModel.js';

export const signup = async (req, res) => {
  const { name, email, password, confirmPassword, address, phoneNumber, orgType } = req.body;
  if(!(name && email && password && confirmPassword && address && phoneNumber && orgType)) return res.status(400).json({ error: "Missing credentials."});
  if(password !== confirmPassword) return res.status(400).json({ error: "Password and Confirm Password do not match!"});
  
  try {
    const existingUser = await UserModel.findOne({ email });
    if(existingUser) return res.status(400).json({ error: "User already exists. Try using another e-mail!"});

    const passwordHash = await bcrypt.hash(password, 12);
    const newUser = await UserModel.create({ name, email, password: passwordHash, confirmPassword, address, phoneNumber, orgType });

    const token = jwt.sign({ id: newUser._id }, process.env.TOKEN_SECRET, { expiresIn: "7d" });

    return res.status(200).json({ user: { id: newUser._id, name: newUser.name, email: newUser.email, address: newUser.address, phoneNumber: newUser.phoneNumber, orgType: newUser.orgType }, token });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong." });
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  if(!(email && password)) return res.status(400).json({ error: "Missing credentials."});

  try {
    const user = await UserModel.findOne({ email });
    if(!user) return res.status(404).json({ error: "Invalid credentials."});

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect) return res.status(400).json({ error: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: "7d" });

    return res.status(200).json({ user: { id: user._id, name: user.name, email: user.email, address: user.address, phoneNumber: user.phoneNumber, orgType: user.orgType }, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong." });
  }
}

export const logout = async (req, res) => {
  res.status(200).send("everything ok");
}
