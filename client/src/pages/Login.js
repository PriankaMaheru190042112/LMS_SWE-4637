import React, { useState } from 'react';
import  { useNavigate ,Link} from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('secret_key', token);
      // redirect to the home page or the user's dashboard
      // using React Router or another method
      nav.push('http://localhost:3001/home')

    } catch (error) {
      console.error(error);
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <Link to={'/home'}>
        <button> Login</button>
     </Link> 
      {/* <button type="submit">Login</button> */}
    </form>
  );
}

export default Login;
