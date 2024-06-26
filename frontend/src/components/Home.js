import { useEffect, useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Image from "react-bootstrap/Image";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
import { USEContext } from "../App";
import { useNavigate } from "react-router-dom";
import Cord from "./Cord";
import SwipeableTextMobileStepper from "./Carousel";
import Reload from "./relode/Reload";

function Home() {
  const Navigate = useNavigate();
  const { category } = useContext(USEContext);
  //{category[1].image}
  console.log(category);

  return (
    <>
      <div style={{ minHeight: "100vh" }}>
        {category.length < 1 && <Reload />}
        {category.length > 1 && (
          <>
            <Container>
              <Container style={{ paddingTop: "100px" }}>
                <Row
                  style={{
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <Col
                    style={{
                      position: "relative",

                      borderColor: "#E2DCD0",
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    <div className="nav-item dropdown">
                      <div
                        style={{ fontFamily: "-moz-initial", fontSize: "30px" }}
                        md={{ span: 3.5, offset: 5 }}
                      >{`Categorys`}</div>

                      <a
                        style={{ color: "#000" }}
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
                      <div
                        className="name"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <SwipeableTextMobileStepper category={category} />
                      </div>
                      <div
                        style={{ width: "100%" }}
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        {category.map((category, index) => {
                          return (
                            <>
                              <a
                                style={{ cursor: "pointer", width: "100%" }}
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
                    </div>
                  </Col>
                </Row>
              </Container>

              <Row
                style={{
                  gap: "10px",
                  padding: "0px 0",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {category.map((category, i) => {
                  return (
                    <>
                      <Cord
                        id={category._id}
                        image={category.image}
                        header={category.title}
                      />
                    </>
                  );
                })}
              </Row>
            </Container>
          </>
        )}
      </div>
    </>
  );
}

export default Home;
