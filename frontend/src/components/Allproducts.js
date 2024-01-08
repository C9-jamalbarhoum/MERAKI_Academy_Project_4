import axios from "axios";
import React, { useEffect, useContext } from "react";
import { USEContext } from "../App";
function Allproducts() {
  const { Products, setProducts } = useContext(USEContext);
  useEffect(() => {
    axios
      .get("http://localhost:5000/product/")
      .then((Allproducts) => {
        setProducts(Allproducts.data);
      })
      .then((err) => {
        console.log(err);
      });
  }, []);
  return  <div>
  <div style={{ padding: "150px  0" }} className="container">
    <div style={{ gap: "10px" }} class="row">
      {Products.map((category, index) => {
        return (
          <>
            <div onClick={() => {}} className="col-sm">
              <div
                className="card"
                style={{
                  width: "19rem",
                  height: "47vh",
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
</div>;
}

export default Allproducts;
