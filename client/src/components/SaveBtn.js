import React from "react";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function SaveBtn({saveBook, book}) {
  return (
    <button className="btn btn-success" onClick={() => saveBook(book)}>Save</button>
  );
}

export default SaveBtn;