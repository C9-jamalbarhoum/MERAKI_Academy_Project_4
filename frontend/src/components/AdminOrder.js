import axios from "axios";
import React, { useEffect,useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { USEContext } from "../App";
function AdminOrder() {

    const {token} = useContext(USEContext)
  useEffect(() => {
    axios
      .get("http://localhost:5000/order/getAll",{
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
  },[]);

  return (
    <>
      <div
        style={{
          paddingTop: "90px",
          backgroundColor: "blue",
          fontWeight: "bold",
        }}
      >
        Admin Order
      </div>

      <h5>Orders</h5>
      <div style={{width:"100vw"}}>
      <Container style={{width:"50%"}} fluid>
        <Row>
          <Col>1 of 1</Col>
        </Row>
      </Container>
      </div>
    </>
  );
}

export default AdminOrder;
