import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
const NotFound = () => {
  return (
    <>
      <Box sx={{display: "flex", justifyContent: "center", textAlign:"center"}} className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <Typography variant="h1">404</Typography>
                </div>
    
                <div className="contant_box_404">
                  <Typography variant="h2">Looks like you're lost</Typography>

                  <Typography variant="h6">The page you are looking for is not avaible</Typography>

             
                    <Button sx={{mt: 3}} component={Link} to={"/"} variant="contained">Regresa al inicio</Button>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default NotFound;
