import React from "react";
import {Box,CircularProgress} from "@mui/material";

const Loading:React.FC = ()=>{

    return (
        <>
          <Box sx={{ height:"50px",width:"50px",margin:"10px auto"}}>
              <CircularProgress/>
          </Box> 
        </>
    )
}
export default Loading;