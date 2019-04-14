import React from "react";
import "./style.css";
// import Books from "../../pages/Books";

// This file exports both the List and ListItem components

export function List({ children }) {
  return (
    <div className="list-overflow-container">
      <ul className="list-group">{children}</ul>
    </div>
  );
}

function multiAuthor(author, i, arr){
 if (i === arr.length -1){
   return author
 }else if(i === arr.length -2){
   return `${author} & `
 }else{return `${author}, `}
}

export function ListItem({ book, i, saveBook, button }) {
  // console.log("book", book);
  return (
    <li className="list-group-item">
    {/* {console.log(i)} */}
      <div className="row">
        <div className="col-12 col-sm order-last order-sm-first">
        <h5>{book.title}</h5>
        {book.subtitle? <p>{book.subtitle}</p>: ""}
        <p>Written By: {book.authors.length === 1 ? book.authors[0]: book.authors.map(multiAuthor)}</p>
        </div>
        <div className="col-12 col-sm-2 text-center text-sm-right">
         <a role="button" className="btn btn-info" href={book.infoLink} target="_blank" rel='noreferrer noopener'>View</a>
         {button}
        </div>
      </div>
      <div className="row">
      {book.thumbnail?
        <div className="col-12 col-sm-auto text-center text-sm-left">
           <img src={book.thumbnail} alt={book.title}/>
        </div>: ""}
        <div className="col-12 col-sm">
          <p> {book.description}</p>
        </div>
      </div>
    </li>
  )
}
