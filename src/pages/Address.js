import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import AddressForm from "../components/AddressForm";
import CheckoutStepper from "../components/CheckoutStepper";
import Map from "../components/Map";
import WhatsApp from "../components/WhatsApp";

const Address = () => {
  return (
    <>
      <Grid container sx={{ minHeight: "100vh" }}>
        <Grid item md={5}>
          <Box sx={{ p: 5 }}>
            <CheckoutStepper activeStep={1} />
          </Box>
          <AddressForm />
        </Grid>
        <Grid item md={7}>
          <Map />
        </Grid>
      </Grid>
      <WhatsApp />
    </>
  );
};

export default Address;
