import React, { Component } from "react";
import SaveBtn from "../components/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import "./pages.css";

class Search extends Component {
  state = {
    books: [],
    title: "",
    author: "",
  };

  componentDidMount() {
    // this.loadBooks();
    // this.searchBooks();
  }

  loadBooks = () => {
    API
      .getBooks()
      .then(res => {
        // console.log(res);
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      })
      .catch(err => console.log(err));
  };

  searchBooks = (title, author) => {
    const searchData = {
      title: title,
      author: author? author : "",
    };
    // console.log(searchData)
    API.searchBooks(searchData)
      .then(res => {
        let books = res.data.items
        console.log(res.data.items);
        let bookReduce = this.reduceBooks(books);
        console.log("x: ", bookReduce);
        // console.log("books; ", books);
        this.setState({books: bookReduce});
      })
      .catch(err => console.log(err));
  };

  reduceBooks = (books) => {
    return books.map(book => {
      let id = book.id
      book = book.volumeInfo
      if (!book.authors){book.authors = ["No Authors Listed"]};
      let tnail = book.imageLinks ? book.imageLinks.thumbnail : "";
        return  {
          id: id,
          title: book.title,
          subtitle: book.subtitle,
          thumbnail: tnail,
          authors: [...book.authors],
          infoLink: book.infoLink,
          description: book.description
        }
      })
  }


  saveBook = (data) => {
    API.getBook(data.id)
    .then((res, err) => {
      if (!res.data.length){
        API.saveBook(data)
        .then (res => {
          console.log(res);
        })
      }else{console.log("that one has already been saved")}
    })
    .catch (err => console.log(err));
  };


  handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      // console.log(this.state.title, this.state.author)
      this.searchBooks(this.state.title, this.state.author)
      this.resetForm();
    }else if(this.state.title){
      this.searchBooks(this.state.title);
      this.resetForm();
    }
  };

  resetForm =() => {
    this.setState({author: "", title: ""})
  }

  render() {
    return (
      <Container fluid>
        <Jumbotron>
          <h1>What Books Should I Read?</h1>
          {/* <SearchBtn onClick={this.searchBooks} /> */}
        </Jumbotron>
        <Row>
          <Col size="12">
            <div className="searchForm">
              <h4 className="py-3">Book Search</h4>
              <form>
                <Input
                  value={this.state.title}
                  onChange={this.handleInputChange}
                  name="title"
                  placeholder="Title (required)"
                />
                <Input
                  value={this.state.author}
                  onChange={this.handleInputChange}
                  name="author"
                  placeholder="Author (optional)"
                />
                <div className="text-right">
                  <FormBtn
                    disabled={!this.state.title}
                    onClick={this.handleFormSubmit}
                  >
                    Search Book
                  </FormBtn>
                </div>
              </form>
            </div>
          </Col>
        </Row>
        <Row>
          <Col size="12">
            <div className="results">
            <h4 className="py-3"
            style={{color: this.state.books.length ? "red": ""}}
            >Results</h4>
              {this.state.books.length ? (
                <List>
                  {console.log("state: ",this.state.books)}
                  {/* {console.log("rendering")} */}
                  {this.state.books.map( (book, i) => (
                    <ListItem key={book.id} book={book} i={i} saveBook = {this.saveBook} button={<SaveBtn book={book} saveBook={this.saveBook}/>}>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h3>No Results to Display</h3>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Search;
