const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const bookSchema = new Schema({
//   title: { type: String, required: true },
//   author: { type: String, required: true },
//   synopsis: String,
//   date: { type: Date, default: Date.now }
// });
const bookSchema = new Schema({
  id: String,
  title: { type: String, required: true },
  authors: [{ type: String, required: true }],
  description: String,
  thumbnail: String,
  infoLink: String,
  date: { type: Date, default: Date.now }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;



// id: id,
// title: book.title,
// subtitle: book.subtitle,
// thumbnail: tnail,
// authors: [...book.authors],
// infoLink: book.infoLink,
// description: book.description