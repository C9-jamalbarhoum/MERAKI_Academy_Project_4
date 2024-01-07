import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
function Home() {
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
  //background-color: rgb(212, 197, 200);
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <div>
        <img
          style={{ width: "100%", height: "100vh" }}
          src="https://img.freepik.com/free-photo/set-plant-twigs-near-ornament-hearts-threads_23-2148042175.jpg?w=1380&t=st=1704638241~exp=1704638841~hmac=c95c097c68905716da2b3c31defa3274daa57c41552256363e8655aaf0154f83"
        ></img>
      </div>
      <div style={{color: "#000", fontWeight:"bold" }} class="p-3 mb-2 bg-transparent text-#fff">
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
  );
}

export default Home;
