import React, { useContext } from "react";
import { USEContext } from "../App";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const { category, setIDCategory,setInLogin,InLogin } = useContext(USEContext);
  const Navigate = useNavigate();
  return (
    <div>
      {" "}
      <nav
        style={{
          borderRadius: "5px",
          color: "",
          position: "fixed",
          width: "100%",
          zIndex: "2",
        }}
        class="navbar navbar-expand-lg navbar-dark bg-dark"
      >
        {/* {navbar navbar-dark bg-dark} */}
        <a
          style={{ color: "#fff", fontWeight: "bold" }}
          className="navbar-brand"
          href="#"
        >
          <div className="boxLogo">
            <img
              style={{ height: "100%" }}
              src="./Yoyo Nail Zone Logo.png"
              alt="fill image "
            />
          </div>
          Joy <span style={{ color: "pink" }}>Joy </span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                about ass
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
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
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {category.map((category, index) => {
                  return (
                    <>
                      <a
                        style={{ cursor: "pointer" }}
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
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    Navigate({
                      pathname: "/Allproducts",
                      search: `?catId=${category._id}`,
                    })
                  }}
                  className="dropdown-item"
                >
                  All items
                </a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#">
                Admin Dashboard
              </a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
            <div style={{ paddingLeft: "10px", display: "flex", gap: "10px" }}>
              {InLogin?<button onClick={()=>{
                localStorage.clear()
                setInLogin(false)

              }} type="button" class="btn btn-danger">Logout</button> :<img
                onClick={() => {
                  Navigate("/Login");
                }}
                style={{ width: "20px", cursor: "pointer" }}
                src="./person.svg"
              ></img>}
              <img 
                onClick={() => {
                  // Navigate("/Cart"); //!!!!!
                }}
                style={{ width: "20px", cursor: "pointer" ,position:"relative"}}
                src="./cart.svg"
              ></img>
            </div>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
