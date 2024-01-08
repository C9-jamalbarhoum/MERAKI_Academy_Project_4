import axios from "axios";
import React, { useState, useContext } from "react";
import { USEContext } from "../App";
import { useNavigate } from "react-router-dom";
function Login() {
  const { InLogin, setInLogin } = useContext(USEContext);

  const [userLoginDATA, setUserLoginDATA] = useState({
    email: undefined,
    password: undefined,
  });
  const Navigate = useNavigate();
  return (
    <>
      <div>
        <h1
          style={{
            paddingTop: "150px",
            fontFamily: "-moz-initial",
            fontWeight: "bold",
          }}
        >
          Login
        </h1>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <button
            className="Register btn btn-warning"
            onClick={() => {
              Navigate("/Login");
            }}
          >
            Login
          </button>
          <button
            className="Login  btn btn-light"
            onClick={() => {
              Navigate("/Register");
            }}
          >
            Register
          </button>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                onChange={(e) => {
                  setUserLoginDATA({
                    ...userLoginDATA,
                    email: e.target.value,
                  });
                }}
                type="email"
                class="form-control"
                id="exampleInputEmail1"
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
                  setUserLoginDATA({
                    ...userLoginDATA,
                    password: e.target.value,
                  });
                }}
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <div class="form-group form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="exampleCheck1">
                Check me out
              </label>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                axios
                  .post("http://localhost:5000/users/login", userLoginDATA)
                  .then((result) => {
                    localStorage.setItem("token", result.data.token);
                    localStorage.setItem("InLogin", true);
                    setInLogin(true)
                    console.log(result.data.token);
                    Navigate("/");
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
        </div>
      </div>
    </>
  );
}

export default Login;