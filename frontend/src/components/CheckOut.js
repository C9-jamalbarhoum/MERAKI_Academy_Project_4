import { useContext, useEffect, useState } from "react";
import { USEContext } from "../App";
import axios from "axios";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
function CheckOut() {
  useEffect(() => {
    axios
      .get("https://joy-joy-i0iy.onrender.com/order/get", {
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
  }, []);

  const Negative = useNavigate();
  let num = 0;
  const {
    token,
    cartProduct,
    setCartProduct,
    toggleOrder,
    setToggleOrder,
    copyCartPro,
    setCopyCartPro,
  } = useContext(USEContext);
  console.log(cartProduct); // for order //

  const [total, setTotal] = useState([]);
  useEffect(() => {
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
  }, []);
  const chickCartDelete = () => {
    axios
      .put(
        `https://joy-joy-i0iy.onrender.com/cart/deleteCart`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ChangeProductOfCart = (productId, copy) => {
    console.log(productId);
    console.log(token);
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

  const [order, setOrder] = useState({
    products: cartProduct,
    total: undefined,
    status: "Pending",
  });
  const createOrder = () => {
    let totals = 0;

    for (let i = 0; i < cartProduct.length; i++) {
      totals += cartProduct[i].price;
    }

    axios
      .post(
        "https://joy-joy-i0iy.onrender.com/order/",
        { ...order, total: totals, products: cartProduct },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ padding: "50px" }}>
      <div style={{ paddingTop: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            padding: "40px",
          }}
        >
          <Button onClick={() => Negative(-1)}>back</Button>
        </div>
      </div>

      <div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {cartProduct.map((elm, i) => {
            return (
              <>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "center",
                  }}
                >
                  <div>
                    <img
                      style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "100px",
                      }}
                      src={elm.product.image}
                    ></img>
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <h5>title : {elm.product.title}</h5>
                    <h6>price: ${elm.price.toPrecision(4)}</h6>
                    <h7>quantity : {elm.quantity}</h7>
                  </div>
                  <div>
                    <div
                      onClick={() => {
                        const copy = cartProduct.filter((prod, i) => {
                          if (prod.product) {
                            return prod.product._id !== elm.product._id;
                          }
                        });
                        ChangeProductOfCart(elm.product._id, copy);
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
              </>
            );
          })}
        </div>
      </div>
      <hr style={{ border: "3px solid #f1f1f1" }} />

      <div style={{ paddingTop: "80px" }} class="chickOut">
        <div class="col-75">
          <div class="container">
            <form action="/action_page.php">
              <div class="row">
                <div class="col-50">
                  <h3>Billing Address</h3>
                  <label for="fname">
                    <i class="fa fa-user"></i> Full Name
                  </label>
                  <input
                    type="text"
                    id="fname"
                    name="firstname"
                    placeholder="John M. Doe"
                  />
                  <label for="email">
                    <i class="fa fa-envelope"></i> Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                  />
                  <label for="adr">
                    <i class="fa fa-address-card-o"></i> Address
                  </label>
                  <input
                    type="text"
                    id="adr"
                    name="address"
                    placeholder="542 W. 15th Street"
                  />
                  <label for="city">
                    <i class="fa fa-institution"></i> City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="New York"
                  />

                  <div class="row">
                    <div class="col-50">
                      <label for="state">State</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        placeholder="NY"
                      />
                    </div>
                    <div class="col-50">
                      <label for="zip">Zip</label>
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        placeholder="10001"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <input
                onClick={(e) => {
                  setToggleOrder(true);
                  localStorage.setItem("toggleOrd", true);
                  e.preventDefault();
                  createOrder();
                }}
                type="submit"
                value="Continue"
                class="btnChick btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModalCenter"
              />
            </form>
            <div
              class="modal fade"
              id="exampleModalCenter"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">
                      Purchase completed
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <p>
                      A message has been sent to your Gmail
                      <br /> For shipping 3 days The representative will contact
                      you{" "}
                    </p>{" "}
                    <img src="car-front.svg"></img>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      onClick={(e) => {
                        Negative("/");
                        // setCartProduct([]);
                        chickCartDelete();
                      }}
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Confirm the operation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-25">
          <div class="container-chick">
            <h4>
              Cart{" "}
              <span class="price" style={{ color: "black" }}>
                <i class="fa fa-shopping-cart"></i> <b>{cartProduct.length}</b>
              </span>
            </h4>

            {cartProduct.map((elm, i) => {
              num += elm.price;

              return (
                <>
                  {" "}
                  <p>
                    <a>Product {i + 1}</a>{" "}
                    <span class="price">${elm.price.toPrecision(4)}</span>
                  </p>
                </>
              );
            })}
            <hr />
            <p>
              Total{" "}
              <span class="price" style={{ color: "black" }}>
                <b>${num.toPrecision(3)}</b>
                {/* {total.push(num.toPrecision(3))} */}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
