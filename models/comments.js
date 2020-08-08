const mongoose = require("mongoose");
const { Timestamp } = require("mongodb");
const Schema = mongoose.Schema;
const commentSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    dish: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dish",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

let Comments = mongoose.model("Comment", commentSchema);

module.exports = Comments;
