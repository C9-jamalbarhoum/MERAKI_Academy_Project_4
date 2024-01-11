import React, { useContext, useEffect, useState } from "react";
import { USEContext } from "../App";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
function Navbar() {
  const [total, setTotal] = useState(0);
  const Navigate = useNavigate();
  const [toggleCart, setToggleCart] = useState(false);

  const [toggleGoLogin, setToggleGoLogin] = useState(false);
  const [cartProduct, setCartProduct] = useState([]);

  const {
    category,
    setIDCategory,
    setInLogin,
    InLogin,
    SearchVal,
    setSearchVal,
    user_id,
    setUser_id,
    token,
    setToken,
  } = useContext(USEContext);

  const getCartUser = () => {
    axios
      .get(`http://localhost:5000/cart/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setCartProduct(result.data.products);
        console.log("true for api get cart");
        console.log(result.data.products);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //!     http://localhost:5000/cart/

  console.log(cartProduct);

  const deleteProductOfCart = (productId,copy) => {
    console.log(productId);
    console.log(token);
    axios
      .put(`http://localhost:5000/cart/Shang/${productId}`,copy, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const NegativeQNT = () => {
    console.log(cartProduct);
  };
  return (
    <div>
      {" "}
      <nav
        style={{
          borderRadius: "5px",
          color: "",
          position: "fixed",
          width: "100%",
          zIndex: "2",
        }}
        class="navbar navbar-expand-lg navbar-dark bg-dark"
      >
        {/* {navbar navbar-dark bg-dark} */}
        <a
          style={{ color: "#fff", fontWeight: "bold" }}
          className="navbar-brand"
          href="#"
        >
          <div className="boxLogo">
            <img
              style={{ height: "100%" }}
              src="./Yoyo Nail Zone Logo.png"
              alt="fill image "
            />
          </div>
          Joy <span style={{ color: "pink" }}>Joy </span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a
                style={{ cursor: "pointer" }}
                onClick={() => {
                  Navigate("/");
                }}
                className="nav-link"
              >
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                about us
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Shop By Department
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {category.map((category, index) => {
                  return (
                    <>
                      <a
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          Navigate({
                            pathname: "/products",
                            search: `?catId=${category._id}`,
                          });
                        }}
                        className="dropdown-item"
                      >
                        {category.title}
                      </a>
                    </>
                  );
                })}
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    Navigate({
                      pathname: "/Allproducts",
                      search: `?catId=${category._id}`,
                    });
                  }}
                  className="dropdown-item"
                >
                  All items
                </a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#">
                Admin Dashboard
              </a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              onChange={(e) => {
                setSearchVal(e.target.value);
                Navigate("/Search");
              }}
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
            <div style={{ paddingLeft: "10px", display: "flex", gap: "10px" }}>
              {InLogin ? (
                <button
                  onClick={() => {
                    localStorage.clear();
                    setInLogin(false);
                  }}
                  type="button"
                  class="btn btn-danger"
                >
                  Logout
                </button>
              ) : (
                <img
                  onClick={() => {
                    Navigate("/Login");
                  }}
                  style={{ width: "20px", cursor: "pointer" }}
                  src="./person.svg"
                ></img>
              )}
              <img
                id="cart-img"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                //=>    type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"
                onClick={() => {
                  if (InLogin) {
                    getCartUser();
                    setToggleCart(!toggleCart);
                  } else {
                  }
                }}
                style={{
                  width: "20px",
                  cursor: "pointer",
                  position: "relative",
                }}
                src="./cart.svg"
              ></img>
              {toggleCart && (
                <>
                  <motion.div
                    animate={{ x: 100, scale: 1 }}
                    initial={{ scale: 0 }}
                    style={{
                      backgroundColor: "gray",
                      position: "absolute",
                      height: "100vh",
                      width: "400px",
                      height: "100vh",
                      top: "-1px",
                      right: "100px",
                      overflow: "auto",
                      border: "solid #000 6px",
                    }}
                    class="offcanvas offcanvas-end"
                    tabindex="-1"
                    id="offcanvasRight"
                    aria-labelledby="offcanvasRightLabel"
                  >
                    <div class="offcanvas-header">
                      <h5 style={{ fontFamily: "-moz-initial" }}>
                        {" "}
                        Shopping Cart
                      </h5>

                      <div
                        style={{
                          display: "flex ",
                          gap: "20px",
                          flexDirection: "column",
                        }}
                      >
                        {cartProduct.map((pro, i) => {
                          if (pro.product) {
                            return (
                              <div>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: "10px",
                                  }}
                                >
                                  <div style={{ width: "70px" }}>
                                    <img
                                      onClick={() => {
                                        Navigate({
                                          pathname: "/OneProduct",
                                          search: `?pro=${pro.product._id}`,
                                        });
                                      }}
                                      style={{
                                        height: "100%",
                                        width: "100%",
                                        cursor: "pointer",
                                        borderRadius: "40px",
                                        height: "10vh",
                                      }}
                                      src={pro.product.image}
                                    ></img>
                                  </div>
                                  <div
                                    style={{
                                      textAlign: "left",
                                      width: "250px",
                                    }}
                                  >
                                    <div> title : {pro.product.title}</div>
                                    <div
                                      style={{ display: "flex", gap: "10px" }}
                                    >
                                      quantity : {pro.quantity}{" "}
                                      <div style={{}}>
                                        <div
                                          onClick={() => {
                                            NegativeQNT();
                                          }}
                                          className="positive"
                                          style={{
                                            fontWeight: "bold",
                                            cursor: "pointer",
                                            padding: "5px",
                                          }}
                                        >
                                          +
                                        </div>{" "}
                                        <span
                                          className="Negative"
                                          style={{
                                            fontWeight: "bold",
                                            cursor: "pointer",
                                            padding: "5px",
                                          }}
                                        >
                                          -
                                        </span>{" "}
                                      </div>
                                    </div>
                                    <div> price : ${pro.product.price}</div>
                                  </div>
                                  <div
                                    onClick={() => {
                                    

                                      const copy = cartProduct.filter(
                                        (prod, i) => {
                                          if (prod.product) {
                                            return (
                                              prod.product._id !==
                                              pro.product._id
                                            );
                                          }
                                        }
                                      );
                                      deleteProductOfCart(pro.product._id,copy);
                                      console.log(copy);
                                      setCartProduct(copy);
                                    }}
                                    style={{
                                      width: "20px",
                                      cursor: "pointer",
                                      color: "red",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    x
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        })}
                        <button
                          className="Register btn btn-warning"
                          onClick={() => {
                            setToggleCart(!toggleCart);
                          }}
                        >
                          back
                        </button>
                      </div>
                    </div>
                    <div class="offcanvas-body">...</div>
                  </motion.div>
                  {/*               


                  <div className="Cart-box">
                    Shopping Cart //! lop => for cart product => !// arror => !!
                    {cartProduct.map((pro, i) => {
                      // setTotal(total + pro.price);
                      return (
                        <>
                          <div>
                            <div className="x"> x</div>
                            <div className="productCart">
                              <div>
                                {" "}
                                <img src={pro.image}></img>
                              </div>
                              <div>
                                {" "}
                                <p>{pro.title}</p>
                                <span className="price">{pro.price} </span>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                    <div className="totalCart">
                      <p>Total:{total}</p>
                    </div>
                    <div className="checkOut">
                      <button>checkOut</button>
                    </div>
                  </div> */}
                </>
              )}
              {toggleGoLogin && Navigate("/Login")}
            </div>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
