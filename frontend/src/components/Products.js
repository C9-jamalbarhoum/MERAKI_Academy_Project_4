import { useContext, useEffect } from "react";
import { USEContext } from "../App";

import axios from "axios";
import { useLocation } from "react-router-dom";

function Products() {
  const { Products, setProducts, setIDCategory, IDCategory } =
    useContext(USEContext);


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('catId') || '';
  console.log(searchQuery);


  useEffect(() => {
    axios
      .get(` http://localhost:5000/product/idCate/${searchQuery}`)
      .then((Products) => {
        console.log(Products.data);
        setProducts(Products.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchQuery]);

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
                      height: "40vh",
                      borderRadius: "30px",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      style={{ height: "30vh", borderRadius: "30px" }}
                      className="card-img-top"
                      src={category.image[0]}
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
