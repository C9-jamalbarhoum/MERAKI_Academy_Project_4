import { useContext, useEffect } from "react";
import { USEContext } from "../App";

import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

function Products() {
  const Navigate = useNavigate();
  const { Products, setProducts, setIDCategory, IDCategory } =
    useContext(USEContext);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("catId") || "";
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
    <div style={{ paddingTop: "80px" }} >
              <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            padding: "40px",
          }}
        >
          <Button
            style={{
              width:"100px",
              backgroundColor: "#E2DCD0",
              borderColor: "#E2DCD0",
              color: "#000",
              fontWeight: "bold",
            }}
            onClick={() => {
              Navigate(-1);
              setProducts([]);
            }}
          >
            back
          </Button>
        </div>
      <div className="container">

        <div style={{ gap: "10px" }} class="row">
          {Products.map((products, index) => {
            return (
              <>
                <div
                  style={{
                    border: "solid 2px #E2DCD0",
                    backgroundColor: "#DCDCDC",
                    padding: "5px",
                  }}
                  onClick={() => {
                    Navigate({
                      pathname: "/OneProduct",
                      search: `?pro=${products._id}`,
                    });
                  }}
                  className="col-sm"
                >
                  <div
                    className="card"
                    style={{
                      width: "15rem",
                      height: "50vh",

                      cursor: "pointer",
                    }}
                  >
                    <img
                      style={{
                        height: "30vh",
                        padding: "10px",
                        borderBottom: "solid 1px #000",
                      }}
                      className="card-img-top"
                      src={products.image[0]}
                      alt="Card image cap"
                    />
                    <div className="card-body">
                      <p style={{ fontWeight: "bold" }} className="card-text">
                        {products.title}
                      </p>
                      <p style={{ fontWeight: "bold" }} className="card-text">
                        price : ${products.price}
                      </p>
                    </div>
                  </div>
                </div>
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
          </div>
        </section>
      </div>
    </div>
  );
}

export default Products;
