import { useContext, useEffect } from "react";
import { USEContext } from "../App";

import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

function Products() {
  const Navigate = useNavigate()
  const { Products, setProducts, setIDCategory, IDCategory } =
    useContext(USEContext);


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('catId') || '';
  console.log(searchQuery);


  useEffect(() => {
    axios
      .get(` http://localhost:5000/product/idCate/${searchQuery}`)
      .then((Products) => {
        console.log(Products.data);
        setProducts(Products.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchQuery]);

  return (
    <div>
      
      <div style={{ paddingTop:"150px" }} className="container">
      <div style={{display:"flex" ,justifyContent:"flex-start", padding:"40px"}}>
      <Button onClick={()=>Navigate(-1)}>back</Button>
      </div>
        <div style={{ gap: "20px" }} class="row">
          {Products.map((products, index) => {
            return (
              <>
                <div onClick={() => {
                 Navigate({
                  pathname:"/OneProduct",
                  search:`?pro=${products._id}`
                 })
                }} className="col-sm">
                  <div
                    className="card"
                    style={{
                      width: "18rem",
                      height: "40vh",
                      borderRadius: "30px",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      style={{ height: "30vh", borderRadius: "30px" }}
                      className="card-img-top"
                      src={products.image[0]}
                      alt="Card image cap"
                    />
                    <div className="card-body">
                      <p style={{ fontWeight: "bold" }} className="card-text">
                        {products.title}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
          
        </div>
              <section  dclass="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
     

     <div>
       <a class="me-4 text-reset">
         <img onClick={()=>{
      Navigate(-1)
         }}  style={{padding:"10px" ,cursor:"pointer"}} src="arrow-left.svg"></img>
       </a>
       <a class="me-4 text-reset">
         <img onClick={()=>{
 
         }}  style={{padding:"10px",cursor:"pointer"}}  src="arrow-right.svg"></img>
       </a>
     </div>
   </section>
      </div>
      
    </div>
  );
}

export default Products;
