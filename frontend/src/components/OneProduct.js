import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { USEContext } from "../App";
import ReactStars from "react-stars";

const ratingChanged = (newRating) => {
  console.log(newRating);
};

function OneProduct() {
  const { user_id, setUser_id, product, setProduct } = useContext(USEContext);
  const Navigate = useNavigate();

  const [proData, setProData] = useState({});

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const proID = queryParams.get("pro") || "";

  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/${proID}`)
      .then((products) => {
        setProData(products.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/cart/${user_id}`)
      .then((result) => {
        setProduct(result.data.products);
        console.log(product);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ paddingTop: "140px" }} className="containerProduct">
      <div className="containerBox">
        {typeof proData.image === typeof [] ? (
          <div className="image-4">
            <div className="sm-3-img">
              {proData.image.map((img, i) => {
                return (
                  <>
                    <div style={{ width: "100%" }} className="imgs-pro">
                      <img
                        style={{ width: "100%", height: "100px" }}
                        src={img}
                      ></img>
                    </div>
                  </>
                );
              })}
            </div>
            <div className="firstImg">
              <img
                style={{ width: "100%", height: "100%" }}
                src={proData.image[0]}
              ></img>
            </div>
          </div>
        ) : (
          <img className="firstImg" src={proData.image}></img>
        )}

        <div className="box2-data">
          <h2>{proData.title}</h2>
          <h4 style={{ display: "flex", gap: "10px" }}>
            prating :{" "}
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              color2={"#ffd700"}
            />{" "}
          </h4>
          ,<p>description :{proData.description}</p>
          <h4>price :${proData.price}</h4>
          <h5>stockQuantity: {proData.stockQuantity}</h5>
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "flex-start",
            }}
          >
            <button
              onClick={() => {
                if (user_id||localStorage.getItem("token")) {
                  product.push(proData);
                  console.log(product);
                  //!!!!!!!!!!!!!!!!!!!!!!
             
                  axios
                    .put(`http://localhost:5000/cart/${user_id}`, product, {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                      },
                    })
                    .then((result) => {
                      console.log(result);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                } else {
                }
              }}
              className="btn btn-primary"
            >
              add to cart
            </button>

            <button class="btn btn-info">Buy it now</button>
          </div>
          <div>
            <h5 style={{ display: "flex", gap: "10px" }}>
              Share: <img src="facebook.svg"></img>
              <img src="instagram.svg"></img>
            </h5>
          </div>
        </div>
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
      <hr style={{ border: "3px solid #f1f1f1" }} />

      <div class="row">
        <div class="side">
          <div>PRODUCTS</div>
        </div>
        <div class="middle">
          <div class="bar-container">
            <div class="bar-5"></div>
          </div>
        </div>
        <div class="side right">
          <div>150</div>
        </div>
        <div class="side">
          <div>the service</div>
        </div>
        <div class="middle">
          <div class="bar-container">
            <div class="bar-5"></div>
          </div>
        </div>
        <div class="side right">
          <div>63</div>
        </div>
        <div class="side">
          <div>Shipping</div>
        </div>
        <div class="middle">
          <div class="bar-container">
            <div class="bar-4"></div>
          </div>
        </div>
        <div class="side right">
          <div>15</div>
        </div>
        <div class="side">
          <div>Instructions</div>
        </div>
        <div class="middle">
          <div class="bar-container">
            <div class="bar-2"></div>
          </div>
        </div>
        <div class="side right">
          <div>6</div>
        </div>
        <div class="side">
          <div>the price</div>
        </div>
        <div class="middle">
          <div class="bar-container">
            <div class="bar-1"></div>
          </div>
        </div>
        <div class="side right">
          <div>20</div>
        </div>
      </div>
    </div>
  );
}

export default OneProduct;
