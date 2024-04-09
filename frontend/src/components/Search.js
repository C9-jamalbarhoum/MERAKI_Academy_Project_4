import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { USEContext } from "../App";
import { useNavigate } from "react-router-dom";
import MultiActionAreaCard from "./MultiActionAreaCard";
function Search() {
  const Navigate = useNavigate();
  const { SearchVal, setSearchVal } = useContext(USEContext);
  const [SearchData, setSearchData] = useState([]);
  //! https://joy-joy-i0iy.onrender.com/search?q=name
  console.log(SearchData);
  useEffect(() => {
    axios
      .get(`https://joy-joy-i0iy.onrender.com/search?q=${SearchVal}`)
      .then((result) => {
        setSearchData(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [SearchVal]);
  return (
    <>
      <div style={{ paddingTop: "150px" }} className="container">
        <div
          style={{
            gap: "20px",
            justifyContent: "center",
            alignItems: "center",
          }}
          class="row"
        >
          {SearchData.map((products, index) => {
            return (
              <>
                <MultiActionAreaCard products={products} />
                {/* <div onClick={() => {
                 Navigate({
                  pathname:"/OneProduct",
                  search:`?pro=${products._id}`
                 })
                }} className="col-sm-">
                  <div
                    className="card"
                    style={{
                      width: "18rem",
                      height: "40vh",
                      borderRadius: "30px",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      style={{ height: "30vh", borderRadius: "30px" }}
                      className="card-img-top"
                      src={products.image[0]}
                      alt="Card image cap"
                    />
                    <div className="card-body">
                      <p style={{ fontWeight: "bold" }} className="card-text">
                        {products.title}
                      </p>
                    </div>
                  </div>
                </div> */}
              </>
            );
          })}
        </div>
        <section dclass="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div>
            <a class="me-4 text-reset">
              <img
                onClick={() => {
                  Navigate(-1);
                }}
                style={{ padding: "10px", cursor: "pointer" }}
                src="arrow-left.svg"
              ></img>
            </a>
            <a class="me-4 text-reset">
              <img
                onClick={() => {}}
                style={{ padding: "10px", cursor: "pointer" }}
                src="arrow-right.svg"
              ></img>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}

export default Search;
