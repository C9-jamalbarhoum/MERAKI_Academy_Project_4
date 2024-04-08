import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";

import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export function DisableElevation({ id }) {
  const Navigate = useNavigate();
  return (
    <Button
      onClick={() => {
        Navigate({
          pathname: "/products",
          search: `?catId=${id}`,
        });
      }}
      variant="contained"
      disableElevation
    >
      click here
    </Button>
  );
}
function Cord({ image, header, id }) {
  const theme = useTheme();
  const Navigate = useNavigate();
  return (
    <>
      <div onClick={()=>{
             Navigate({
              pathname: "/products",
              search: `?catId=${id}`,
            });
      }}  class="card_cat">
  
        <img  src={image}
          class="img"

       />
           
          <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer"></metadata>
            <g id="_1421394342400">
              <g>
                <polygon
                  fill="#343434"
                  fill-rule="nonzero"
                  points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"
                ></polygon>
                <polygon
                  fill="#8C8C8C"
                  fill-rule="nonzero"
                  points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"
                ></polygon>
                <polygon
                  fill="#3C3C3B"
                  fill-rule="nonzero"
                  points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"
                ></polygon>
                <polygon
                  fill="#8C8C8C"
                  fill-rule="nonzero"
                  points="392.07,1277.38 392.07,956.52 -0,724.89"
                ></polygon>
                <polygon
                  fill="#141414"
                  fill-rule="nonzero"
                  points="392.07,882.29 784.13,650.54 392.07,472.33"
                ></polygon>
                <polygon
                  fill="#393939"
                  fill-rule="nonzero"
                  points="0,650.54 392.07,882.29 392.07,472.33"
                ></polygon>
              </g>
            </g>
          </g>
      
        <div class="textBox">
          <p  style={{color:"#000"}} class="text head">   {header}</p>
      
          
        </div>
      </div>
    </>
    // <Card
    //   style={{
    //     width: "100%",
    //     height: "70vh",
    //     display: "flex",
    //     justifyContent: "space-around",
    //     alignItems: "center",
    //   }}
    //   sx={{ display: "flex" }}
    // >
    //   <Box>
    //     <CardContent sx={{ flex: "1 0 auto" }}>
    //       <Typography component="div" variant="h5" sx={{ width: 200 }}>
    //         {header}
    //       </Typography>
    //     </CardContent>
    //     <DisableElevation id={id} />
    //   </Box>
    //   <CardMedia
    //     style={{
    //       padding: "40px",

    //       display: "flex",
    //       justifySelf: "flex-end",
    //       width: "25vw",
    //       height: "55vh",

    //     }}
    //     component="img"
    //     image={image}
    //     alt="Live from space album cover"
    //   />
    // </Card>
  );
}

export default Cord;
