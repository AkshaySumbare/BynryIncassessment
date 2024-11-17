require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const UserJson = require("./User.json");


const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
      
  //  await User.deleteMany()
    await User.create(UserJson)
    console.log("Success")
  } catch (error) {
    console.log(error);
  }
};
start();