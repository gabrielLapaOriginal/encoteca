const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please insert a title"],
    },

    author: {
      type: String,
      required: [true, "Please insert the books author"],
    },

    publishedDate: {
      type: Date,
      required: [true, "Please insert the publishing date"],
    },

    genre: {
      type: String,
      required: [true, "Please insert the genre"],
    },

    summary: {
      type: String,
      required: [true, "Please insert the summary"],
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", BookSchema);

module.exports = Book