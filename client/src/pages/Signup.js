import React, { useState } from "react";
import axios from "axios";

function Signup() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');  

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:3001/signup', { name, email, password })
      .then((response) => {
        console.log(response.data);
      
      })
      .catch((error) => {
        console.error(error.response.data);
      });
      };

 
  return (
    <div>
    <form onSubmit={handleSubmit}>
    
    <label>
      Name:
      <input type="text" value={name || ""} onChange={(e) => setName(e.target.value)} />
    </label>
    <label>
      Email:
      <input type="email" value={email  || ""} onChange={(e) => setEmail(e.target.value)} />
    </label>
    <label>
      Password:
      <input type="password" value={password  || ""} onChange={(e) => setPassword(e.target.value)} />
    </label>
  

    <button type="submit">Submit</button>


  </form>
    </div>
  );
}

export default Signup