import React, { useState } from "react";
import axios from "axios";

function Filter() {
  const [filterCriteria, setFilterCriteria] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  const handleFilter = async () => {
    const response = await axios.get(`http://localhost:3001/books?filter=${filterCriteria}`);
    setFilteredBooks(response.data);
  };

  return (
    <div>
      <select value={filterCriteria} onChange={(event) => setFilterCriteria(event.target.value)}>
        <option value="">Select a filtering criteria</option>
        <option value="Fiction">Genre</option>
        <option value="author">Author</option>
        <option value="publicationYear">Publication Year</option>
      </select>
      <button onClick={handleFilter}>Filter</button>
      {filteredBooks.map((book) => (
        <div key={book.id}>
          <h2>{book.name}</h2>
          <p>Author: {book.author}</p>
          <p>Genre: {book.genre}</p>
        </div>
      ))}
    </div>
  );
}

export default Filter