import React,{useState,useEffect} from "react";
import axios from "axios";

const Home = (props)=> {
    const [data,setData] = useState([])
 
    const loadData= async()=>{
     <div>hhgugyu</div>
     const response = await axios.get("http://localhost:3001/")
     setData(response.data)
    }
 
    useEffect(()=>{
     loadData()
    },[])
 
    const updateStatus = (bookId) => {
        axios
          .put(`/home/${bookId}`, { isAvailable: 'Unavailable' })
          .then((res) => {
            // update the book with the new status in the local state
            const updatedBookIndex = data.findIndex((book) => book.id === bookId);
            const updatedBook = {
              ...data[updatedBookIndex],
              isAvailable: 'Unavailable'
            };

            const newBooks = [
              ...data.slice(0, updatedBookIndex),
              updatedBook,
              ...data.slice(updatedBookIndex + 1),
            ];
            setData(newBooks);
          })
          .catch((err) => console.error(err));
      };
 
   return(
     <> 
 
     <div>
     
       {data.map((item,index)=>{
             return(
                 <>
                 <p>Id: {item.id}</p>
                 <p>Book Name: {item.name} ,  Author Name:{item.author} ,  Genre: {item.genre}, Status:{item.isAvailable} </p>
         
                 <button onClick={() => updateStatus(item.id)}>Borrow</button> 
                 </>
               
             )
         })} 
     
     </div>
 
     </>
   )  
 }
 
 export default Home