const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHhsWXUTENsgLz6JIl6ktIzF7qwWEErOzCmQ&s",
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    city: String,
    country: String,
    maplocation: String,
  },
  contact: {
    type: String,
    required: true,
  },
  interest: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", productSchema);
