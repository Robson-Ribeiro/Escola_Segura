import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
  ],

  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: [],
    },
  ],
}, { timestamps: true });

const RoomModel = mongoose.model("Room", roomSchema);

export default RoomModel;
