import React from "react";

const Filter = ({ searchString, handleSearchStringChange }) => {
  return (
    <div>
      filter shown with{" "}
      <input value={searchString} onChange={handleSearchStringChange} />
    </div>
  );
};

export default Filter;
