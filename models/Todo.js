const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: String,
    is_completed: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

todoSchema.indexes({ createdAt: 1}, {expiresAfterSeconds: 3600})

module.exports = mongoose.model("Todo", todoSchema);
