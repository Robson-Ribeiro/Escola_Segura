import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from 'mongoose';

import { server, app } from "./socket.io/socket.js";

import authRoutes from "./routes/authRoutes.js";


app.use(express.json());

app.use("/auth", authRoutes);


const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL/*, { useNewUrlParser: true, useUnifiedTopology: true }*/)
  .then(() => server.listen(PORT, () => console.log(`Server Running on: http://localhost:${PORT}`)))
  .catch((error) => console.log(error));
