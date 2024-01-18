import { useContext, useEffect, useState } from "react";
import { USEContext } from "../App";

import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
function ProductAdmin() {
  const [toggleInUpdate, setToggleInUpdate] = useState(false);

  const [showInput, setShowInput] = useState(false);

  const handleCloseInput = () => setShowInput(false);
  const handleShowInput = () => setShowInput(true);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const Navigate = useNavigate();
  const { Products, setProducts, setIDCategory, IDCategory, token } =
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
  }, [toggleInUpdate]);

  const [DataOneForProduct, setDataOneForProduct] = useState({
    title: undefined,
    price: undefined,
    stockQuantity: undefined,
  });
  const getDataOneProduct = (id) => {
    axios
      .get(`http://localhost:5000/product/${id}`)
      .then((products) => {
        setDataOneForProduct(products.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const UpdateProduct = (id) => {
    axios
      .put(`http://localhost:5000/product/${id}`, DataOneForProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result);
        setToggleInUpdate(true);
        handleShow();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(DataOneForProduct);

  return (
    <div>
      <div style={{ paddingTop: "80px" }} className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            padding: "40px",
          }}
        >
          <Button onClick={() => Navigate(-1)}>back</Button>
        </div>
        <div style={{ gap: "20px" }} class="row">
          {Products.map((products, index) => {
            return (
              <>
                <div
                  onClick={() => {
                    // Navigate({
                    //   pathname: "/OneProduct",
                    //   search: `?pro=${products._id}`,
                    // });
                  }}
                  className="col-sm"
                >
                  <div
                    className="car"
                    style={{
                      width: "18rem",
                      height: "45vh",
                      borderRadius: "30px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        variant="primary"
                        type="button"
                        className="btn btn-warning"
                        onClick={() => {
                          getDataOneProduct(products._id);
                          handleShowInput();
                        }}
                      >
                        update
                      </button>
                      <button type="button" className="btn btn-danger">
                        delete
                      </button>
                    </div>
                    <img
                      style={{ height: "30vh", borderRadius: "30px" }}
                      className="card-img-top"
                      src={products.image[0]}
                      alt="Card image cap"
                    />
                    <div className="card-body">
                      <p style={{ fontWeight: "bold" }} className="card-text">
                        {products.title}
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
            <a class="me-4 text-reset">
              <img
                onClick={() => {}}
                style={{ padding: "10px", cursor: "pointer" }}
                src="arrow-right.svg"
              ></img>
            </a>
          </div>
        </section>
      </div>
      <Modal show={showInput} onHide={handleCloseInput}>
        <Modal.Header>
          <Modal.Title>update product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>title</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setDataOneForProduct({
                    ...DataOneForProduct,
                    title: e.target.value,
                  });
                }}
                type="email"
                defaultValue={DataOneForProduct.title}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>price</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setDataOneForProduct({
                    ...DataOneForProduct,
                    price: e.target.value,
                  });
                }}
                type="email"
                defaultValue={DataOneForProduct.price}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Stock Quantity</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setDataOneForProduct({
                    ...DataOneForProduct,
                    stockQuantity: e.target.value,
                  });
                }}
                type="email"
                defaultValue={DataOneForProduct.stockQuantity}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleCloseInput();
              setDataOneForProduct({
                title: undefined,
                price: undefined,
                stockQuantity: undefined,
              });
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleCloseInput();
              UpdateProduct(DataOneForProduct._id);
            }}
          >
            update
          </Button>
        </Modal.Footer>
      </Modal>
      <br />

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>for Update</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "green" }}>
          The modification process succeeded
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ backgroundColor: "green" }}
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProductAdmin;
