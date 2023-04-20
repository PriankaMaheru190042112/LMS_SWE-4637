import {BrowserRouter, Switch, Route, Routes} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import './App.css';
import Booklist from "./pages/Booklist"
import AddEdit from "./pages/AddEdit";
import Update from "./pages/Update";
import Search from "./pages/search";
import Filter from "./pages/Filter";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";


function App() {
  return (
    <BrowserRouter>
    <div className="App">
     
      <Routes>
      <Route path="/" element={<Booklist />} />
      <Route path="/add" element={<AddEdit />} />
      <Route path="/update/:id" element={<Update />} />
      <Route path="/search" element={<Search />} />
      <Route path="/filter" element={<Filter />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />


      </Routes>
     
    </div>
  
    </BrowserRouter>
    
  );
}

export default App;
