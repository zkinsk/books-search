import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { List, ListItem } from "../components/List";
import DeletBtn from "../components/DeleteBtn.js";


class Saved extends Component {
  state = {
    books: {}
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
    .then(book => {
      this.setState({books: book.data});
    })
  }

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };


  render() {
    console.log("state: ", this.state)
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                Saved Books
              </h1>
            </Jumbotron>
          </Col>
        </Row>
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
                    <ListItem key={book.id} book={book} i={i} saveBook = {this.saveBook} button = {<DeletBtn deleteBook={this.deleteBook} book={book}/>}>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h3>No Results to Display</h3>
              )}
            </div>
          </Col>
      </Container>
    );
  }
}

export default Saved;
