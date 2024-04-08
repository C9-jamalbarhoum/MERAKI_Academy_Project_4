import { useContext, useEffect, useState } from "react";
import { USEContext } from "../App";

import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import MultiActionAreaCard from "./MultiActionAreaCard";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SwipeableTextMobileStepper from "./Carousel"
function Products() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [proData, setProData] = useState({});

  const Navigate = useNavigate();

  const {
    Products,
    setProducts,
    cartProduct,
    setCartProduct,
    setIDCategory,
    IDCategory,
    InLogin,
    category
  } = useContext(USEContext);

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
    <Container  style={{ paddingTop: "80px" ,display:"flex",alignItems:"center",flexDirection:"column"}}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          padding: "20px",
        }}
      >

        <Button   onClick={() => {
            Navigate(-1);
            setProducts([]);
          }} variant="contained">back</Button>

      </div>
      <SwipeableTextMobileStepper category={Products}/>
        <Row md={3} xs={1} xl={4} style={{display:"flex",justifyContent:"center",alignItems:"center" , width:"100%"}} >
          {Products.map((products, index) => {
            return (
              <>
                 <MultiActionAreaCard products={products}/>
              </>
            );
          })}
        </Row>
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

     
    </Container>
    
  );
}

export default Products;
