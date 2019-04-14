import React from "react";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function DeleteBtn({deleteBook, book}) {
  return (
    <button className="btn btn-danger" onClick={() => deleteBook(book.id)}>Delete</button>
  );
}

export default DeleteBtn;
