import { useContext, useEffect } from "react";
import { USEContext } from "../App";

import axios from "axios";

function Products() {
  const { Products, setProducts, setIDCategory, IDCategory } =
    useContext(USEContext);
  useEffect(() => {
    axios
      .get(` http://localhost:5000/product/idCate/${IDCategory}`)
      .then((Products) => {
        console.log(Products.data);
        setProducts(Products.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [IDCategory]);

  return (
    <div>
      <div style={{ padding: "150px  0" }} className="container">
        <div style={{ gap: "10px" }} class="row">
          {Products.map((category, index) => {
            return (
              <>
                <div onClick={() => {}} className="col-sm">
                  <div 
                    className="card"
                    style={{
                      width: "18rem",
                      height:"40vh",
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

export default Products;
