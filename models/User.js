const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    todos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Todo",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
