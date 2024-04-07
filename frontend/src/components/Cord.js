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
  return (
    <Card 
      style={{
        width: "100%",
        height: "70vh",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
      sx={{ display: "flex" }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5" sx={{ width: 200 }}>
            {header}
          </Typography>
        </CardContent>
        <DisableElevation id={id} />
      </Box>
      <CardMedia
        style={{
          padding: "40px",
   

          display: "flex",
          justifySelf: "flex-end",
          width: "25vw",
          height: "55vh",
          
        }}
        component="img"
        image={image}
        alt="Live from space album cover"
      />
    </Card>
  );
}

export default Cord;
