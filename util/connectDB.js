require("dotenv").config();

const mongoose = require("mongoose");
const uri = process.env.DATABASE_KEY;

async function mongooseConnect() {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { mongooseConnect };
