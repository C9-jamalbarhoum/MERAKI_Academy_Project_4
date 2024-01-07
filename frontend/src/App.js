import "./App.css";
import Navbar from "./components/Navbar";
import { useEffect, useState, createContext } from "react";
import axios from "axios";
import Footer from "./components/Footer";
export const USEContext = createContext();
import Home from "./components/Home";
function App() {
  const [category, setCategory] = useState([]);
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
      <USEContext.Provider value={{ category }}>
        <Navbar />
        <Home />
        <Footer />
      </USEContext.Provider>
    </div>
  );
}

export default App;
