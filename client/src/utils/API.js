import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },
  searchBooks: function(searchData) {
    // let title = searchData.title;
   const {title, author} = searchData
  //  console.log(title)
  //  console.log(author)
    return axios.get(`/api/googlebooks/${title}/${author}`);
  }
};
