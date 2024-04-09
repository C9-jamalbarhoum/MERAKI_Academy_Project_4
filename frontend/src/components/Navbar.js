import React, { useContext, useEffect, useState } from "react";
import { USEContext } from "../App";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Navbar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let num = 0;
  const Navigate = useNavigate();
  const [toggleCart, setToggleCart] = useState(false);

  const [toggleGoLogin, setToggleGoLogin] = useState(false);

  const {
    category,
    setInLogin,
    InLogin,
    setSearchVal,
    token,
    cartProduct,
    setCartProduct,
    setCopyCartPro,
    toggleOrder,
    setToggleOrder,
    userId,
    setUserId,
  } = useContext(USEContext);

  console.log(cartProduct);

  const getCartUser = () => {
    axios
      .get(`https://joy-joy-i0iy.onrender.com/cart/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setCartProduct(result.data.products);
        setCopyCartPro(result.data.products);
        console.log("true for api get cart");
        console.log(result.data.products);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //!     https://joy-joy-i0iy.onrender.com/cart/

  console.log(cartProduct);

  const ChangeProductOfCart = (productId, copy) => {
    axios
      .put(`https://joy-joy-i0iy.onrender.com/cart/Shang/${productId}`, copy, {
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

  const positiveQNT = (id, i) => {
    const copy = cartProduct.map((prod, index) => {
      if (id === prod.product._id) {
        prod.quantity++;
        prod.price += prod.product.price;
      }

      return prod;
    });
    console.log(copy);

    setCartProduct(copy);
    ChangeProductOfCart(id, copy);
  };

  const NegativeQNT = (id, i) => {
    const copy = cartProduct.map((prod, index) => {
      if (id === prod.product._id) {
        prod.quantity--;
        prod.price -= prod.product.price;
      }
      return prod;
    });
    console.log(copy);

    setCartProduct(copy);
    ChangeProductOfCart(id, copy);
  };

  return (
    <div>
      {" "}
      <nav
        style={{
          borderRadius: "5px",
          backgroundColor: "#000",
          color: "#fff",
          position: "fixed",
          width: "100%",
          zIndex: "2",
        }}
        class="navbar navbar-expand-lg navbar-dark "
      >
        {/* {navbar navbar-dark bg-dark} */}
        <a
          style={{ color: "#fff", fontWeight: "bold" }}
          className="navbar-brand"
          href="#"
        >
          <div className="boxLogo">
            <img
              style={{ height: "100%", backgroundColor: "#fff" }}
              src="—Pngtree—joy svg design_5692202.png"
            />
          </div>
          <div style={{ fontSize: "10px" }}>
            {" "}
            Joy <span style={{ color: "rgb(108,117,125)" }}>Joy </span>
          </div>
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
                style={{ cursor: "pointer", color: "#fff" }}
                onClick={() => {
                  Navigate("/");
                }}
                className="nav-link"
              >
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                style={{ color: "#fff" }}
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
              </div>
            </li>
            {toggleOrder && InLogin && (
              <li style={{ display: "flex" }} className="nav-item active">
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    Navigate("/OrderStatus");
                  }}
                  className="nav-link"
                >
                  Order status <span className="sr-only">(current)</span>
                </a>
                <img src="box-seam.svg"></img>
              </li>
            )}
            {userId === "65a8523490b338c8cbfa0269" && (
              <li style={{ display: "flex" }} className="nav-item active">
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    Navigate("/AdminDashboard");
                  }}
                  className="nav-link"
                >
                  Admin Dashboard <span className="sr-only">(current)</span>
                </a>
              </li>
            )}
          </ul>
          <form className="form-inline my-2 my-lg-0">
            {InLogin && (
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  minWidth: "100px",
                  height: "5vh",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    fontFamily: "-moz-initial",
                    width: "400px",
                    color: "#fff",
                    height: "100%",
                    textAlign: "left",
                    paddingTop: "12px",
                  }}
                  class="font-weight-bold"
                >
                  {localStorage.getItem("userName")}
                </p>
              </div>
            )}
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

            <div style={{ paddingLeft: "10px", display: "flex", gap: "10px" }}>
              {InLogin ? (
                <button
                  onClick={() => {
                    localStorage.clear();
                    setInLogin(false);
                    setUserId("");
                    setToggleOrder(false);
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
                    handleShow();
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
                <div>
                  <div
                    className="centenary-cart"
                    onClick={() => {
                      setToggleCart(!toggleCart);
                    }}
                  ></div>
                  <motion.div
                    animate={{ x: 100, scale: 1 }}
                    initial={{ scale: 0 }}
                    style={{
                      backgroundColor: "#000",
                      position: "absolute",
                      height: "100vh",
                      width: "400px",
                      height: "100vh",
                      top: "-1px",
                      right: "100px",
                      overflow: "auto",
                      border: "solid #000 3px",
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
                            num += pro.price;
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
                                      <div style={{ display: "flex" }}>
                                        <div
                                          onClick={() => {
                                            positiveQNT(pro.product._id);
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
                                        <div
                                          onClick={() => {
                                            console.log("a");
                                            if (
                                              pro.quantity > 1 &&
                                              pro.product._id
                                            ) {
                                              console.log(pro.product._id, i);
                                              NegativeQNT(pro.product._id, i);
                                            }
                                          }}
                                          className="Negative"
                                          style={{
                                            fontWeight: "bold",
                                            cursor: "pointer",
                                            padding: "5px",
                                          }}
                                        >
                                          -
                                        </div>{" "}
                                      </div>
                                    </div>
                                    <div> price : ${pro.product.price}</div>
                                    <div>
                                      {" "}
                                      total price : ${pro.price.toPrecision(3)}
                                    </div>
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
                                      ChangeProductOfCart(
                                        pro.product._id,
                                        copy
                                      );
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
                        <div> total : ${num.toPrecision(3)}</div>
                        <button
                          className="Register btn btn-warning"
                          onClick={() => {
                            setToggleCart(!toggleCart);
                          }}
                        >
                          back
                        </button>
                        <Button
                          onClick={() => {
                            setToggleCart(!toggleCart);
                            Navigate("/Checkout");
                          }}
                        >
                          Check out
                        </Button>
                      </div>
                    </div>
                    <div class="offcanvas-body">...</div>
                  </motion.div>
                </div>
              )}
              {toggleGoLogin && Navigate("/Login")}
            </div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header>
                <Modal.Title>Please go login First</Modal.Title>
              </Modal.Header>
              <Modal.Body>Please go login First</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    Navigate("/Login");
                    handleClose();
                  }}
                >
                  Login
                </Button>
              </Modal.Footer>
            </Modal>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
