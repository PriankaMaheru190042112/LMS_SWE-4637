import React,{useState,useEffect} from "react";
import {Link, useHistory, useParams,} from "react-router-dom"
import { toast } from "react-toastify";
import axios from "axios"



const AddEdit = () => {
    const [name, setName] = useState('');
    const [author, setauthor] = useState('');
    const [genre, setGenre] = useState('');
    const [data, setData] = useState([]);


    const {id}= useParams()

    // useEffect(()=>{
    //   const fetchData = async () => {
    //     const result = await axios.get(`http://localhost:3001/update/${id}`);
    //     setData(result.data);
    //   };
  
    //   fetchData(); 

    // },[id])

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Name: ${name} Author: ${author} Genre:${genre}`);

        axios.post('http://localhost:3001/add', { name, author, genre })
      .then((response) => {
        console.log(response.data);
      
      })
      .catch((error) => {
        console.error(toast.error(error.response.data));
      });
      };

   return(
    <div>
 <form onSubmit={handleSubmit}>
    
      <label>
        Name:
        <input type="text" value={name || ""} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Author:
        <input type="text" value={author  || ""} onChange={(e) => setauthor(e.target.value)} />
      </label>
      <label>
        Genre:
        <input type="text" value={genre  || ""} onChange={(e) => setGenre(e.target.value)} />
      </label>
    

      <button type="submit">Submit</button>


    </form>
    </div>
   )
  
}

export default AddEdit