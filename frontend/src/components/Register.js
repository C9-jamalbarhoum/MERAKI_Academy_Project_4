import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Register() {
  const Navigate = useNavigate();

  const [userRegisterDATA, setUserRegisterDATA] = useState({
    userName: undefined,
    email: undefined,
    password: undefined,
    phoneNumber: undefined,
    location: undefined,
  });
  const [Successful, setSuccessful] = useState(false);
  return (
    <div
      style={{ display: "flex", justifyContent: "center", padding: "100px" }}
    >
      <div
        className="boxRe"
        style={{
          width: "70vw",
          height: "90vh",
          backgroundColor: "rgba(246, 247, 249, 0.94)",
        }}
      >
        <h1
          style={{
            paddingTop: "150px",
            fontFamily: "-moz-initial",
            fontWeight: "bold",
          }}
        >
          Register
        </h1>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <button
            className="Login  btn btn-light"
            onClick={() => {
              Navigate("/Login");
            }}
          >
            Login
          </button>
          <button
            className="Register btn btn-warning"
            onClick={() => {
              Navigate("/Register");
            }}
          >
            Register
          </button>
        </div>
        <div style={{ marginTop: "20px" }}>
          <form>
            <div
              style={{
                display: "flex",
                gap: "100px",
                justifyContent: "center",
              }}
            >
              <div className="box1forUSer">
                <div class="form-group">
                  <label for="UserName1">User Name</label>
                  <input
                    onChange={(e) => {
                      setUserRegisterDATA({
                        ...userRegisterDATA,
                        userName: e.target.value,
                      });
                    }}
                    type="text"
                    required
                    class="form-control"
                    id="UserName1"
                    placeholder="user Name"
                  />
                </div>

                <div class="form-group">
                  <label for="Email1">Email address</label>
                  <input
                    onChange={(e) => {
                      setUserRegisterDATA({
                        ...userRegisterDATA,
                        email: e.target.value,
                      });
                    }}
                    type="email"
                    required
                    class="form-control"
                    id="Email1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                  <small id="emailHelp" class="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input
                    onChange={(e) => {
                      setUserRegisterDATA({
                        ...userRegisterDATA,
                        password: e.target.value,
                      });
                    }}
                    type="password"
                    required
                    class="form-control"
                    id="Password1"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div style={{ padding: "40px" }} className="box2forUSer">
                <div class="form-group">
                  <label for="PhoneNumber1">Phone Number</label>
                  <input
                    onChange={(e) => {
                      setUserRegisterDATA({
                        ...userRegisterDATA,
                        phoneNumber: e.target.value,
                      });
                    }}
                    type="number"
                    required
                    class="form-control"
                    id="PhoneNumber1"
                    placeholder="Phone Number"
                  />
                </div>
                <div class="form-group">
                  <label for="location1">location</label>
                  <input
                    onChange={(e) => {
                      setUserRegisterDATA({
                        ...userRegisterDATA,
                        location: e.target.value,
                      });
                    }}
                    type="text"
                    required
                    class="form-control"
                    id="location1"
                    placeholder="Location"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                console.log(userRegisterDATA);
                axios
                  .post(
                    "http://localhost:5000/users/register",
                    userRegisterDATA
                  )
                  .then((result) => {
                    console.log(result);
                    setSuccessful(true);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
              type="submit"
              class="btn btn-primary"
            >
              Submit
            </button>
          </form>
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
                  onClick={() => {
                    Navigate("/Register");
                  }}
                  style={{ padding: "10px", cursor: "pointer" }}
                  src="arrow-right.svg"
                ></img>
              </a>
            </div>
          </section>
          <hr style={{ border: "3px solid #f1f1f1" }} />
        </div>
        {Successful && <h2>Welcome to Joy joy </h2>}
      </div>
    </div>
  );
}

export default Register;
