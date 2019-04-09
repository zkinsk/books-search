import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import SearchBtn from "../components/SearchBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import "./pages.css";

class Books extends Component {
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
    API.getBooks()
      .then(res => {
        console.log(res);
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      })
      .catch(err => console.log(err));
  };

  searchBooks = (title, author) => {
    const searchData = {
      title: title,
      author: author? author:"",
    };
    console.log(searchData)
    API.searchBooks(searchData)
      .then(res => {
        let books = res.data.items
        this.setState({books: books});
      })
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
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
    }else if(this.state.title){
      this.searchBooks(this.state.title);
    }
  };

  render() {
    return (
      <Container fluid>
        <Jumbotron>
          <h1>What Books Should I Read?</h1>
          <SearchBtn onClick={this.searchBooks} />
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
                  {/* {console.log("state: ",this.state.books)} */}
                  {/* {console.log("rendering")} */}
                  {this.state.books.map( (book, i) => (
                    <ListItem key={book.id} book={book.volumeInfo} i={i}>
                      <DeleteBtn
                        onClick={() => this.deleteBook(book._id)}
                      />
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

export default Books;
