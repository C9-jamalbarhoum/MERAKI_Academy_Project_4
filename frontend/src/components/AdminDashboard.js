import axios from "axios";
import React, { useEffect } from "react";
import { useContext } from "react";
import { USEContext } from "../App";
import { useNavigate } from "react-router-dom";
function AdminDashboard() {
  const Navigate = useNavigate();
  const { setCategory, category } = useContext(USEContext);

  useEffect(() => {
    axios
      .get("http://localhost:5000/category/")
      .then((result) => {
        setCategory(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          backgroundColor: "red",
          paddingTop: "100px",
          fontWeight: "bold",
        }}
      >
        <h6>Admin Dashboard</h6>
        <h6 onClick={()=>{
          Navigate("/AdminOrder")
        }}>Order</h6>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h6
          style={{
            fontWeight: "bold",
            padding: "15px",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        >
          {" "}
          Choose which category you want to edit
        </h6>
      </div>
      <div style={{ padding: "10px  0" }} className="container">
        <div style={{ gap: "10px" }} class="row">
          {category.map((category, index) => {
            return (
              <>
                <div
                  onClick={() => {
                    Navigate({
                      pathname: "/ProductAdmin",
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
      </div>
    </>
  );
}

export default AdminDashboard;
