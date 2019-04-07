require("dotenv").config();
var axios = require("axios");
var keys = require("../keys.js");

const apiKey = keys.googleAPI 	 	

module.exports = {
  searchBook: function(req, res) {
    // let url = 'https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey'
    let title=req.param.title;
    let author=req.param.author;
    let query = author? `https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&key=${apiKey}`:
     `https://www.googleapis.com/books/v1/volumes?q=${title}&key=${apiKey}`
    ;
    axios.get(
      query
    ).then( data => {
      console.log(data)
      res.json(data);
    }).catch(error => console.log(error))
  },
};