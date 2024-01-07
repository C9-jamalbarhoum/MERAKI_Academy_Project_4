import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Allproducts from "./components/Allproducts";
import Previous from "./components/Products";
import { useEffect, useState, createContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import Footer from "./components/Footer";
export const USEContext = createContext();

function App() {
  const [category, setCategory] = useState([]);
  const [Products, setProducts] = useState([]);
  const [IDCategory, setIDCategory] = useState("");
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
      <USEContext.Provider value={{ category,setIDCategory,IDCategory,Products, setProducts }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products"  element={<Previous/>}/>
          <Route path="/Allproducts"  element={<Allproducts/>}/>
        </Routes>

        <Footer />
      </USEContext.Provider>
    </div>
  );
}

export default App;
