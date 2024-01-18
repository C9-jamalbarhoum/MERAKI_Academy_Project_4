import axios from 'axios';
import React, { useEffect } from 'react'
import { useContext } from 'react';
import { USEContext } from '../App';
import { useNavigate } from 'react-router-dom';
function AdminDashboard() {
    const Navigate  = useNavigate()
    const {setCategory,category} = useContext(USEContext)

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
    <div style={{paddingTop:"100px" ,fontWeight:"bold"}}>AdminDashboard</div>
    <div style={{ padding: "10px  0" }} className="container">
          <div style={{ gap: "10px" }} class="row">
            {category.map((category, index) => {
              return (
                <>
                  <div onClick={()=>{
                    Navigate({
                      pathname: "/ProductAdmin",
                      search: `?catId=${category._id}`,
                    })

                  }} className="col-sm">
                   
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
  )
}

export default AdminDashboard