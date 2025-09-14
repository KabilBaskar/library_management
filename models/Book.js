const { Schema, model } = require("mongoose");

const BookSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    isbn: { type: String, trim: true },
    description: { type: String, default: "" },
    publishedDate: { type: Date },
    copies: { type: Number, default: 1 }
  },
  { timestamps: true }
);

module.exports = model("Book", BookSchema);
