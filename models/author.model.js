const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please insert the authors name"]
    },
    birthDate: {
      type: Date,
      required: [true, "Please enter the author's date of birth"]
    },
    nationality: {
      type: String,
      required: [true, "Please enter the author's nationality"]
    },
    image: {
      type: String,
      required: false
    },
    genres: {
      type: [String],
      required: [true, "Please insert the genres the author writes "]
    },
  },
  {
    timestamps: true,
  }
);

  const Author = mongoose.model("Author", AuthorSchema);

module.exports = Author