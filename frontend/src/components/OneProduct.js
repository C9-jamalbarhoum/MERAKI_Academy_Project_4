import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { USEContext } from "../App";
import ReactStars from "react-stars";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

//



















function OneProduct() {
  const [show, setShow] = useState(false);
  const [ToggleDelete, setToggleDelete] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { userId, setUserId, token, cartProduct, setCartProduct, InLogin } =
    useContext(USEContext);

  const [cartUser, setCartUser] = useState({
    products: [],
  });

  const Navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [proData, setProData] = useState({});
  const [ratingNum, setRatingNum] = useState(4);
  const [ImgSrc, setImgSrc] = useState("");
  const [ToggleReviews, setToggleReviews] = useState(false);

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
  }, [proID]);
  const ratingChanged = (newRating) => {
    setRatingNum(Math.round(newRating));
    setReviews({ ...Reviews, reviews: newRating });
    console.log(Reviews);
  };

  const [Reviews, setReviews] = useState({
    comment: undefined,
    reviews: ratingNum,
    commenter: userId,
  });
  const createComment = () => {
    if (InLogin) {
      axios
        .post(`http://localhost:5000/product/${proID}`, Reviews, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          console.log({
            proData,
            Reviews,
          });
          setProData({ ...proData, reviews: [...proData.reviews, Reviews] });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }
  };
  const deletedCommit = async (commentId) => {
    try {
      const deletedCommitR = await axios.delete(
        `http://localhost:5000/?reviewsId=${commentId}&productId=${proID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const filterProductForDeleteComment = (index) => {
    const copyForDeleteComment = proData.reviews.filter((comment, i) => {
      return index !== i;
    });

    setProData({ ...proData, reviews: copyForDeleteComment });
  };
  console.log({ cartProduct });
  const addProductToCart = async (dataPro) => {
    const copy = [...cartProduct];
    const pro = copy.find((product) => {
      if (typeof product.product !== "string")
        return product.product._id === dataPro._id;

      return product.product === dataPro._id;
    });
    console.log({ dataPro, copy, pro });
    if (!pro) {
      copy.push({
        product: dataPro._id,
        quantity: 1,
        price: dataPro.price,
      });
    } else {
      pro.quantity++;
      pro.price = dataPro.price *   pro.quantity ;
    
    }

    if (InLogin) {
      try {
        const res = await axios.put(`http://localhost:5000/cart`, copy, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCartProduct(copy);
      } catch (error) {
        console.log(error);
      }
    }
  };

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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ paddingTop: "140px" }} className="containerProduct">
      <div className="containerBox">
        {typeof proData.image === typeof [] ? (
          <div className="image-4">
            <div className="sm-3-img">
              {/* { for img on Click show img  => } */}
              <div
                class="modal fade"
                id="exampleModalLong"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLongTitle"
                aria-hidden="true"
              >
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLongTitle">
                        welcome Joy joy
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
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={ImgSrc}
                      ></img>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {proData.image.map((img, i) => {
                return (
                  <>
                    <div
                      class="btn btn-primary"
                      data-toggle="modal"
                      data-target="#exampleModalLong"
                      onClick={(e) => {
                        setImgSrc(e.target.src);
                      }}
                      style={{
                        width: "100%",
                        height: "25%",
                        cursor: "pointer",
                      }}
                      className="imgs-pro"
                    >
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={img}
                      ></img>
                    </div>
                  </>
                );
              })}
            </div>
            <div className="firstImg">
              <img
                style={{ width: "100%", height: "50%" }}
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
            Rating :{" "}
            <ReactStars
              edit={false}
              count={5}
              onChange={ratingChanged}
              value={4}
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
                if (!InLogin) {
                  handleShow();
                } else {
                  addProductToCart(proData);
                }
              }}
              className="btn btn-primary"
            >
              add to cart
            </button>
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
      {/* {//!   =>  reviews  && Comments &&  } */}
      <div style={{ padding: "50px" }} className="container">
        <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
          <button
            onClick={() => {
              setToggleReviews(!ToggleReviews);
            }}
            class="btn btn-light"
          >
            reviews
          </button>
          <button
            onClick={() => {
              setToggle(true);
            }}
            data-toggle="modal"
            data-target="#exampleModal"
            data-whatever="@mdo"
            className="btn btn-light"
          >
            Comments
          </button>
        </div>
      </div>
      {ToggleReviews && (
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
      )}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                New Comments
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
              <form>
                <div class="form-group">
                  <label for="message-text" class="col-form-label">
                    Comments:
                  </label>
                  {toggle &&
                    proData.reviews.map((reviews, i) => {
                      return (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                              width: "2000px",
                            }}
                          >
                            <img
                              style={{ height: "100%", paddingTop: "5px" }}
                              src="person-circle.svg"
                            ></img>
                            <p>
                              {localStorage.getItem("userName")} :{" "}
                              {reviews.comment}
                            </p>
                            <ReactStars
                              edit={false}
                              count={5}
                              value={reviews.reviews}
                              size={24}
                              color2={"#ffd700"}
                            />
                          </div>{" "}
                          {reviews.commenter === userId && (
                            <h1
                              onClick={() => {
                                deletedCommit(reviews._id);
                                filterProductForDeleteComment(i);
                                console.log(reviews._id);
                              }}
                              style={{ color: "red", cursor: "pointer" }}
                            >
                              x
                            </h1>
                          )}
                          {/* <h1
                            onClick={() => {
                              deletedCommit(reviews._id);
                              console.log(reviews._id);
                            }}
                            style={{ color: "red", cursor: "pointer" }}
                          >
                            x
                          </h1> */}
                        </div>
                      );
                    })}
                  <div style={{ display: "flex" }}>
                    {" "}
                    <h5>Rating Here : </h5>
                    <div>
                      {" "}
                      <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        value={ratingNum}
                        size={24}
                        color2={"#ffd700"}
                      />
                    </div>
                  </div>
                  <textarea
                    onChange={(e) => {
                      setReviews({ ...Reviews, comment: e.target.value });
                      // console.log(e.target.value);
                    }}
                    class="form-control"
                    id="message-text"
                  ></textarea>
                </div>
              </form>
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
                onClick={() => {
                  createComment();
                 
                }}
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
              >
                Send message
              </button>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OneProduct;
