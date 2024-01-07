import React from "react";
import { useEffect, useState, useContext } from "react";

import { USEContext } from "../App";
function Home() {
  const {category} = useContext(USEContext)
  //{category[1].image}
  return (
    <>
      <div style={{ backgroundColor: "#fff" }}>
   
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div style={{height:"100vh"}}  class="carousel-inner">
    <div  class="carousel-item active">
      <img  class="d-block w-100" src= "https://m.media-amazon.com/images/I/81TcQ2E2EML._SL1500_.jpg"  alt="First slide"/>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src= "https://m.media-amazon.com/images/I/71c4F1CPMEL._SL1500_.jpg" alt="Second slide"/>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src= "https://m.media-amazon.com/images/I/71cw2PWB6LL._AC_SX522_.jpg"alt="Third slide"/>
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a style={{color:"#000"}} class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
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
                  <div className="col-sm">
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
