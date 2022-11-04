import { Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";

const Footer = () => {
  return (
    <Box bgcolor="#070524" py={4}>
      <Container>
        <Grid container spacing={4} justifyContent="center">
          <Grid item sx={{ display: "flex" }}>
            <Typography variant="body2" color="#EAEAF1" mx={1} >
              Asesoría gratuita.
            </Typography>
            <Typography variant="body2" color="#EAEAF1">
              (55) 1681 013
            </Typography>
          </Grid>
          <Grid item sx={{ display: "flex" }}>
            <Typography variant="body2" color="#EAEAF1" mx={1}>
              Dirección.
            </Typography>
            <Typography variant="body2" color="#EAEAF1">
              Av. Azúcar 61 <br />
              Col. Granjas México <br />
              Iztacalco, CDMX 08400
            </Typography>
          </Grid>
        
          <Grid item sx={{ display: "flex" }}>
            <Typography variant="body2" color="#EAEAF1" mx={1}>
              Horarios.
            </Typography>
            <Typography variant="body2" color="#EAEAF1">
            
            Lunes a Viernes: 9:00am - 6:00pm <br />
            Sábados: 9:00am - 3:00pm
          
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
