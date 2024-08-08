import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["message", "alert"],
  }
}, { timestamps: true });

const MessageModel = mongoose.model("Message", messageSchema);

export default MessageModel;
