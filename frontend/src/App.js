import "./App.css";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";

import Home from "./components/Home";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
      <Footer/>
    
    </div>
  );
}

export default App;
