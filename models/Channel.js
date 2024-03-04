const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
  createAt: {
    type: Date,
    default: Date.now,
  },
  senderId: String,
  receiverId: String,
  text: {
    type: String,
    require: true,
  },
});

const msgRoomSchema = new Schema({
  staffId: String,
  userId: String,
  msg: String,
});
