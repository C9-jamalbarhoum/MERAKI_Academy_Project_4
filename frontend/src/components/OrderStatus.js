import React, { useEffect } from "react";
import Button from '@mui/material/Button';
import { setConfiguration } from "react-grid-system";
import { Container, Row, Col } from "react-grid-system";
import { useNavigate } from "react-router-dom";
function OrderStatus() {
  const Navigate = useNavigate();
  useEffect((err) => {});

  return (
    <>
      <div style={{ paddingTop: "100px" }}>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          id="boxOrder"
        >
          <div
            style={{ display: "flex", justifyContent: "start", gap: "10px" }}
          >
            <Button
              onClick={() => {
                Navigate(-1);
              }}
              style={{ padding: "10px 15px 10px 15px", marginLeft: "10px" }}
            >
              back
            </Button>
          </div>

          <Container>
            <Row>
              <Col sm={4}>
                <img
                  style={{ width: "100%", height: "100%" }}
                  src="https://www.nopcommerce.com/images/thumbs/0005759_check-order-status-foxnetsoftcom.png"
                ></img>
              </Col>
              <Col sm={4}>
                <img
                  style={{ width: "100%", height: "100%" }}
                  src="https://www.brightpearl.com/wp-content/uploads/2021/03/image2-1.jpg.webp"
                ></img>
              </Col>
              <Col sm={4}>
                <img
                  style={{ width: "100%", height: "100%" }}
                  src="https://www.modulebazaar.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/o/r/order_status.jpg"
                ></img>
              </Col>
            </Row>
          </Container>
          <Container style={{border:"4px solid gray"}}>
            <Row>
              <Col style={{display:"flex",alignItems:"center"}} sm={4}>
                <h4 style={{width:"150px"}} >Order Status : </h4>
              </Col>
              <Col sm={4}>
              <div class="modal-body">
                    <p>
                      For shipping 3 days The representative will contact you{" "}
                    </p>{" "}
                    <img src="car-front.svg"></img>
                  </div>
              </Col>
              <Col sm={4}>
              <div class="modal-body">
                    <p style={{color:"red" ,fontWeight:"bold"}}>
                      PENDING{" "}
                    </p>{" "}
                    <img    style={{ width: "20%", height: "20%" }} src="https://media3.giphy.com/media/8MGj00g1Vv7VJxjG5X/giphy.gif?cid=ecf05e4735eor3x3ialwpjqq0nbmcpgwil36oqmj0iy1dua4&ep=v1_gifs_search&rid=giphy.gif&ct=g" ></img>
              
                  </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default OrderStatus;
