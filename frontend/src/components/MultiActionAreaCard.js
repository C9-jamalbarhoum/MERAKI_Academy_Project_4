
import { USEContext } from "../App";
import { useContext, useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";
import  axios  from "axios";
import Modal from "react-bootstrap/Modal";
export default function MultiActionAreaCard({products}) {
  const Navigate =useNavigate()
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {
    Products,
    setProducts,
    cartProduct,
    setCartProduct,
    setIDCategory,
    IDCategory,
    InLogin,
    category
  } = useContext(USEContext);
  const addProductToCart = async (dataPro) => {

    const copy = [...cartProduct];
    const pro = copy.find((product) => {
      if (typeof product.product !== "string")
        return product.product._id === dataPro._id;

      return product.product === dataPro._id;
    });
    console.log({ dataPro, copy, pro });
    if (!pro) {
      copy.push({
        product: dataPro._id,
        quantity: 1,
        price: dataPro.price,
      });
    } else {
      pro.quantity++;
      pro.price = dataPro.price * pro.quantity;
    }

    if (InLogin) {


console.log(cartProduct);
console.log(copy);
   setCartProduct(copy)
      try {
        const res = await axios.put(`http://localhost:5000/cart`, copy, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCartProduct(copy);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div class="div_card">    
    <Card  style={{width:"350px",height:"  40vh",display:"flex" ,flexDirection:"column" , alignItems:"center"}}>
      <CardActionArea   onClick={() => {
      Navigate({
        pathname: "/OneProduct",
        search: `?pro=${products._id}`,
      });
    }} >
        <CardMedia   
          component="img"
          height="140"
          image={products.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           {products?.title.slice(0,10)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           ${products.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{display:"flex",justifySelf:"flex-end",alignItems:"flex-end"}}>
        <Button  onClick={() => {
                          if (!InLogin) {
                            handleShow();
                          } else {
                            addProductToCart(products);
                          }
                        }} size="small" color="primary">
        add to cart
        </Button>
      </CardActions>
    </Card>
     <Modal show={show} onHide={handleClose}>
     <Modal.Header>
       <Modal.Title>Please go login First</Modal.Title>
     </Modal.Header>
     <Modal.Body>Please go login First</Modal.Body>
     <Modal.Footer>
       <Button variant="secondary" onClick={handleClose}>
         Close
       </Button>
       <Button
         variant="primary"
         onClick={() => {
           Navigate("/Login");
           handleClose();
         }}
       >
         Login
       </Button>
     </Modal.Footer>
   </Modal>
   </div>
   </>
  );
}