import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  address: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: String,
    required: true,
  },

  orgType: {
    type: String,
    required: true,
    enum: ["education", "security"],
  }
}, { timestamps: true });

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
