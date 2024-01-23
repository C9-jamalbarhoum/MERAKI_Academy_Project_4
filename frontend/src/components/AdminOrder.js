import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { USEContext } from "../App";
import { useNavigate } from "react-router-dom";
function AdminOrder() {
  const Navigate = useNavigate();
  const { token } = useContext(USEContext);
  const [ DataForUser , SetDataForUser] = useState([])
  const [DataHeaderOrder, serDataHeaderOrder] = useState([
    "NAME",
    "USER",
    "TOTAL",
    "ADDRESS",
    "STATUS",
    "NUMBER",
  ]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/order/getAll", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result);
        SetDataForUser(result.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div>
        <div
          style={{
            cursor:"pointer",
            paddingTop: "90px",
            backgroundColor: "green",
            fontWeight: "bold",
          }}
        >
          Admin Order
        </div>
        <h6    style={{
              cursor:"pointer",
            backgroundColor: "gray",
            fontWeight: "bold",
          }}
          onClick={() => {
            Navigate("/AdminDashboard");
          }}
        >
          Admin Dashboard
        </h6>
      </div>

      <h5>Orders</h5>
      <div style={{ width: "100vw" }}>
        <Container style={{ width: "50%" }} fluid>
          <Row>
            <Col>Customer requests </Col>
          </Row>
        </Container>
      </div>
      <div
        id="Tablees"
        style={{
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Table style={{ width: "100%" }} responsive>
          <thead>
            <tr>
              <th style={{ backgroundColor: "gray" }}>#</th>
              {Array.from({ length: 6 }).map((_, index) => (
                <th
                  style={{ backgroundColor: "gray", border: "solid 1px #fff" }}
                  key={index}
                >
                  {DataHeaderOrder[index]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
           
            {DataForUser.map((elm,i)=>{
              return (<>
               <tr>
              <td>{i+1}</td>
              {Array.from({ length: 6 }).map((_, index) => (
                <td style={{ border: "solid 1px #fff" }} key={index}>
                  {index === 2 && "$"+ elm.total}
                  {index === 4 && elm.status}
                  {index === 3 && "Amman"}
                  {index === 0 && elm.user.userName}
                  {index === 1 && elm.user.email}
                  {index === 5 && `0795956217`}
                </td>
               
              ))}
               </tr>
              
              </>)
            })} 
         
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default AdminOrder;
