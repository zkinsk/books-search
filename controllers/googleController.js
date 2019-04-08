require("dotenv").config();
var axios = require("axios");
// var keys = require("../keys.js");

const apiKey = process.env.GOOGLE_API_KEY	 	

module.exports = {
  searchBook: function(req, res) {
    // console.log("apiKey: ", apiKey);
    // console.log(req.params);
    let title=req.params.title;
    let author=req.params.author;
    let query = author? `https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&key=${apiKey}`:
     `https://www.googleapis.com/books/v1/volumes?q=${title}&key=${apiKey}`
    ;
    // console.log(query)
    axios.get(
      query
    ).then( result => {
      // console.log(result.data)
      res.json(result.data);
    }).catch(error => console.log(error))
  },
};