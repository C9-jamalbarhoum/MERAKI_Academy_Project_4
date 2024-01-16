import axios from "axios";
import React, { useState, useContext } from "react";
import { USEContext } from "../App";
import { useNavigate } from "react-router-dom";

import Alert from 'react-bootstrap/Alert';



























function Login() {
  const { InLogin, setInLogin, setToken ,setUserId} = useContext(USEContext);

  const [userLoginDATA, setUserLoginDATA] = useState({
    email: undefined,
    password: undefined,
  });
  const [massageInLogin, setMassageInLogin] = useState("");
  const [inErr, setInErr] = useState(false);
  const [errMassage , setErrorMassage] =useState("")

  function LinksExample() {
    return (
      <>
        {[
          'danger',
        ].map((variant) => (
          <Alert key={variant} variant={variant}>
              {errMassage}
          </Alert>
        ))}
      </>
    );
  }


  const Login = () => {
    axios
      .post("http://localhost:5000/users/login", userLoginDATA)
      .then((result) => {
        setToken(result.data.token);
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("InLogin", true);
        localStorage.setItem("userName",result.data.userName)
        localStorage.setItem("idUser",result.data.userId)
        setUserId(result.data.userId)
        setInLogin(true);
        setInErr(false);

        console.log(result);
       
        Navigate("/");
      })
      .catch((err) => {
        setErrorMassage(err.response.data.massage)

          console.log(errMassage);
      });
  };
  const Navigate = useNavigate();
  return (
    <>
      <div>
        {/* <div style={{height:"200px", width:"200"}}></div> */}
   
        <h1
          style={{
            paddingTop: "150px",
            fontFamily: "-moz-initial",
            fontWeight: "bold",
          }}
        >
          Login
        </h1>
        
        
      
        {inErr && (
          <div
            style={{
              margin: "10px",
              width: "200px",
              height: "40px",
              backgroundColor: "red",
            }}
          >
            {errMassage}
          </div>
        )}
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
        
            <button 
            style={{marginBottom:"10px"}}
              onClick={(e) => {
                e.preventDefault();
                Login();
              }}
              type="submit"
              class="btn btn-primary"
            >
              Submit
            </button>
          </form>
 
        </div>
        {LinksExample()}
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
    </>
  );
}

export default Login;
