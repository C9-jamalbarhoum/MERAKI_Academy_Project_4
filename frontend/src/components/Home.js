
import { useEffect, useState, useContext } from "react";

import { USEContext } from "../App";
import { useNavigate } from "react-router-dom";
function Home() {
  const Navigate  =useNavigate()
  const {category,setIDCategory,IDCategory} = useContext(USEContext)
  //{category[1].image}
  return (
    <>
      <div style={{ backgroundColor: "#fff" }}>
   
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div style={{height:"100vh" , width:"80vw" , margin: "0 130px" }}  class="carousel-inner">
    <div  class="carousel-item active">
      <img  class="d-block w-100" src= "https://m.media-amazon.com/images/I/81TcQ2E2EML._SL1500_.jpg"  alt="First slide"/>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src= "https://images.unsplash.com/3/www.madebyvadim.com.jpg?q=80&w=1782&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Second slide"/>
      {/* {} */}
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src= "https://w0.peakpx.com/wallpaper/975/852/HD-wallpaper-books-reading-books-background-with-books-bookshelf.jpg"alt="Third slide"/>
    </div>
  </div>
  <a style={{margin : "300px"}} class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span  style={{padding:"20px",margin:"0 500px 0 0 "}} class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a style={{margin : "300px  0"}}   class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span style={{padding:"20px", margin:"0 200px 0  0"}}   class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
      
        <div
          style={{ color: "#000", fontWeight: "bold" }}
          class="p-3 mb-2 bg-transparent text-#fff"
        >
          Shop By Department
        </div>
        <div style={{ padding: "10px  0" }} className="container">
          <div style={{ gap: "10px" }} class="row">
            {category.map((category, index) => {
              return (
                <>
                  <div onClick={()=>{
                    Navigate({
                      pathname: "/products",
                      search: `?catId=${category._id}`,
                    })

                  }} className="col-sm">
                    <div
                      className="card"
                      style={{
                        width: "18rem",
                        borderRadius: "30px",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        style={{ height: "30vh", borderRadius: "30px" }}
                        className="card-img-top"
                        src={category.image}
                        alt="Card image cap"
                      />
                      <div className="card-body">
                        <p style={{ fontWeight: "bold" }} className="card-text">
                          {category.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
