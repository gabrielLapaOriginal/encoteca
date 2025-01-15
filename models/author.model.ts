import mongoose, { Document } from "mongoose";

interface Author extends Document {
  name: string,
  birthDate: Date,
  nationality: string,
  image: string,
  genres: [string]
}

const AuthorSchema = new mongoose.Schema<Author>(
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
  export default Author