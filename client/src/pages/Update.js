import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Update() {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [bookList, setBookList] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/update/${id}`)
      .then((response) => {
        const { name, author, genre } = response.data[0];
        setName(name);
        setAuthor(author);
        setGenre(genre);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`http://localhost:3001/update/${id}`, {
        name,
        author,
        genre,
      });

      const updatedBook = { id, name, author, genre };
      setBookList((prevBookList) =>
        prevBookList.map((book) =>
          book.id === updatedBook.id ? updatedBook : book
        )
      );

      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

   return(
    <div>
 <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Author:
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
      </label>
      <label>
        Genre:
        <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
      </label>
    

      <button type="submit"  onClick={handleSubmit }>Submit</button>

   
    </form>
    </div>
    )
 }
 
 export default Update