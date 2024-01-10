import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Allproducts from "./components/Allproducts";
import Login from "./components/Login";
import Previous from "./components/Products";
import { useEffect, useState, createContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Cart from "./components/Cart";
import Search from "./components/Search";
import OneProduct from "./components/OneProduct";

export const USEContext = createContext();

function App() {

  const [token , setToken ] = useState(localStorage.getItem("token") || null)





  const [category, setCategory] = useState([]);
  const [Products, setProducts] = useState([]);

  const [user_id, setUser_id] = useState("");
  const [InLogin, setInLogin] = useState(
    localStorage.getItem("InLogin") || false
  );




  const [SearchVal, setSearchVal] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/category/")
      .then((result) => {
        setCategory(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="App">
      <USEContext.Provider
        value={{
          category,
          Products,
          setProducts,
          InLogin,
          setInLogin,
          SearchVal,
          setSearchVal,
          user_id,
          setUser_id,
          token,
          setToken

        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Previous />} />
          <Route path="/Allproducts" element={<Allproducts />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/OneProduct" element={<OneProduct />} />
        </Routes>

        <Footer />
      </USEContext.Provider>
    </div>
  );
}

export default App;
