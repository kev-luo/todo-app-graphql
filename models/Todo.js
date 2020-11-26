const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    is_completed: Boolean,
    is_public: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);