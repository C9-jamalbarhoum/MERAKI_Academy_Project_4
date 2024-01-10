import React, { useContext, useEffect, useState } from "react";
import { USEContext } from "../App";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function Navbar() {
  const [total, setTotal] = useState(0);
  const Navigate = useNavigate();
  const [toggleCart, setToggleCart] = useState(false);

  const [toggleGoLogin, setToggleGoLogin] = useState(false);
  const [cartProduct, setCategory] = useState([]);

  const {
    category,
    setIDCategory,
    setInLogin,
    InLogin,
    SearchVal,
    setSearchVal,
    user_id,
    setUser_id,
  } = useContext(USEContext);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/cart/${user_id}`)
      .then((result) => {
        console.log(result.data.products);
        setCategory(result.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [toggleCart]);

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
                data-toggle="modal"
                data-target="#exampleModalCenter"
                id="cart-img"
                onClick={() => {
                  if (InLogin) {
                    setToggleCart(!toggleCart);
                    const token = jwtDecode(localStorage.getItem("token"));
                    setUser_id(token.userId);
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
                  {/* <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">login first</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div> */}

                  <div className="Cart-box">
                    Shopping Cart
                    {/* {cartProduct.map((pro, i) => {
                      setTotal(total + pro.price)
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
                  })} */}
                    <div className="totalCart">
                      <p>Total:{total}</p>
                    </div>
                    <div className="checkOut">
                      <button>checkOut</button>
                    </div>
                  </div>
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
