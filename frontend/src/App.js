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
import CheckOut from "./components/CheckOut";
import OrderStatus from "./components/OrderStatus";
import AdminDashboard from "./components/AdminDashboard";
import ProductAdmin from "./components/ProductAdmin";
import AdminOrder from "./components/AdminOrder";
import NotF from "./NotF";
export const USEContext = createContext();

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const [cartProduct, setCartProduct] = useState([]);
  const [copyCartPro, setCopyCartPro] = useState([]);

  const [category, setCategory] = useState([]);
  const [Products, setProducts] = useState([]);

  const [toggleOrder, setToggleOrder] = useState(
    localStorage.getItem("toggleOrd") || false
  );

  const [userId, setUserId] = useState(localStorage.getItem("idUser") || "");
  const [InLogin, setInLogin] = useState(
    localStorage.getItem("InLogin") || false
  );

  const [SearchVal, setSearchVal] = useState("");
  useEffect(() => {
    axios
      .get("https://joy-joy-i0iy.onrender.com/category/")
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
          userId,
          setUserId,
          token,
          setToken,
          cartProduct,
          setCartProduct,
          copyCartPro,
          setCopyCartPro,
          toggleOrder,
          setToggleOrder,
        }}
      >
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Previous />} />
          <Route path="/Allproducts" element={<Allproducts />} />
          {!InLogin ? (
            <Route path="/Login" element={<Login />} />
          ) : (
            <Route path="/Login" element={<NotF />} />
          )}
          <Route path="/Register" element={<Register />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/OneProduct" element={<OneProduct />} />
          <Route path="/CheckOut" element={<CheckOut />} />
          <Route path="/OrderStatus" element={<OrderStatus />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/ProductAdmin" element={<ProductAdmin />} />
          <Route path="/AdminOrder" element={<AdminOrder />} />
          <Route path="*" element={<NotF />} />
        </Routes>
 
        <Footer />
      </USEContext.Provider>
    </div>
  );
}

export default App;
