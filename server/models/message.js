const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },

    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    id: String,
  },
  { strict: "throw" }
);

module.exports = mongoose.model("messages", messageSchema);
