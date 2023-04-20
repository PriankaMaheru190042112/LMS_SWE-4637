import React,{useState,useEffect} from "react";
import {Link} from "react-router-dom"
import { toast } from "react-toastify";
import axios from "axios"

const Booklist = (props)=> {
   const [data,setData] = useState([])

   const loadData= async()=>{
    <div>hhgugyu</div>
    const response = await axios.get("http://localhost:3001/")
    setData(response.data)
   }

   useEffect(()=>{
    loadData()
   },[])

  const deleteBooks=(id)=>{
    axios.delete(`http://localhost:3001/delete/${id}`)
    
    toast.success("deleted")
    setTimeout(()=>loadData(),500)
  }

  return(
    <>
    <Link to={`/add/`}>
    <button> Add</button>
    </Link> 

    <Link to={`/filter/`}>
    <button> Filter</button>
    </Link> 

    <div>
    
      {data.map((item,index)=>{
            return(
                <>
                <p>Id: {item.id}</p>
                <p>Book Name: {item.name} ,  Author Name:{item.author} ,  Genre: {item.genre} </p>
                <Link to={`/update/${item.id}`}>
                <button> Update</button>
                </Link> 

                
                <button onClick={()=>deleteBooks(item.id)}> Delete</button>

                </>
              
            )
        })} 
    
    </div>

    </>
  )  
}

export default Booklist