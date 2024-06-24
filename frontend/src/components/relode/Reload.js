import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Reload() {
  return (
    <div style={{height:"100vh" , width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>

      <Box  sx={{ display: 'flex' }}>
        
      <CircularProgress />
    </Box>
    </div>
    
  );
}