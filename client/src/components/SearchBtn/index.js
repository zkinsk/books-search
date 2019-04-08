import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function SearchBtn(props) {
  return (
    <button className="search-btn btn btn-info" {...props} role="button" tabIndex="0">
      Search
    </button>
  );
}

export default SearchBtn;