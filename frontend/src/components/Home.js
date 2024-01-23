import { useEffect, useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { USEContext } from "../App";
import { useNavigate } from "react-router-dom";
function Home() {
  const Navigate = useNavigate();
  const { category } = useContext(USEContext);
  //{category[1].image}
  console.log(category);
  return (
    <>
      <div>
        <div
          id="carouselExampleControls"
          class="carousel slide"
          data-ride="carousel"
        >
          <div
            style={{
              paddingTop: "105px",
              zIndex: "1",
              height: "58vh",
              width: "80vw",
              margin: "0 130px",
            }}
            class="carousel-inner"
          >
            <div style={{ position: "relative" }} class="carousel-item active">
              <div
                style={{
                  position: "absolute",
                  left: "55%",
                  top: "7%",
                  height: "40vh",
                  background: "#E2DCD0",
                }}
              >
                <h1
                  style={{ color: "#000", fontFamily: "Courier, monospace " }}
                >
                  Safe and fast shipping
                </h1>
                <h1 style={{ color: "#000" }}>Delivery within three days</h1>
                <h1 style={{ color: "#000" }}>
                  {" "}
                  Joy <span style={{ color: "#fff" }}>Joy </span>{" "}
                </h1>
              </div>
              <img
                class="a-block w-100"
                src="https://cdn.salla.sa/form-builder/sw22pVtC23Vk9BKMegqid82k0JvieBgkR21bXlBi.png"
                alt="First slide"
              />
            </div>
          </div>
        </div>
        <Container>
          <Row style={{ gap: "10px", padding: "15px 0" }}>
            {category.map((category, i) => {
              return (
                <>
                  <Col style={{ width: "26rem" }} xs>
                    <Card
                      style={{
                        width: "26rem",
                        backgroundColor: "rgba(246, 247, 249, 0.94)",
                      }}
                    >
                      <Card.Body>
                        <Image
                          style={{ height: "300px", width: "500px" }}
                          src={category.image}
                          thumbnail
                        />
                        <Card.Title>{category.title}</Card.Title>

                        <Card.Text>{category.de}</Card.Text>
                        <Button
                          style={{
                            backgroundColor: "#E2DCD0",
                            borderColor: "#E2DCD0",
                            color:"#000",
                            fontWeight:"bold"
                          }}
                          onClick={() => {
                            Navigate({
                              pathname: "/products",
                              search: `?catId=${category._id}`,
                            });
                          }}
                          variant="primary"
                        >
                          Go to category
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </>
              );
            })}
          </Row>
        </Container>
        {/* <div style={{ padding: "10px  0" }} className="container">
          <div style={{ gap: "10px" }} class="row">
            {category.map((category, index) => {
              return (
                <>
                  <div
                    onClick={() => {
                      Navigate({
                        pathname: "/products",
                        search: `?catId=${category._id}`,
                      });
                    }}
                    className="col-sm"
                  >
                    <div
                      className="card"
                      style={{
                        width: "18rem",
                        borderRadius: "30px",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        style={{ height: "30vh", borderRadius: "30px" }}
                        className="card-img-top"
                        src={category.image}
                        alt="Card image cap"
                      />
                      <div className="card-body">
                        <p style={{ fontWeight: "bold" }} className="card-text">
                          {category.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div> */}
      </div>
    </>
  );
}

export default Home;
