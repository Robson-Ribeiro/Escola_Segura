import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New connection:", socket.id);

  socket.on("joinRoom", (data) => {
    console.log("User joined the room");
  });
});

export { server, app, io };