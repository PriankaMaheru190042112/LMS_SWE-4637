import React, { useState } from "react";
import axios from "axios";

function Search() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    const response = await axios.get(`http://localhost:3001/search?keyword=${searchKeyword}`);
    setSearchResults(response.data);
  };

  return (
    <div>
      <input
        type="text"
        value={searchKeyword}
        onChange={(event) => setSearchKeyword(event.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {searchResults.map((result) => (
        <div key={result.id}>
          Book Name:  {result.name} <br></br>
          Author Name:  {result.author} <br></br>
          Genre:  {result.genre} <br></br>
            </div>

      ))}
    </div>
  );
}

export default Search