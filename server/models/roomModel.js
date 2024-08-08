import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
  },

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
