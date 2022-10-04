import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import AddressForm from "../components/AddressForm";
import CheckoutStepper from "../components/CheckoutStepper";

const Address = () => {
  return (
    <Container sx={{ py: 5 }}>
      <Box elevation={6}>
        <CheckoutStepper activeStep={1} />
        <Grid py={5} container spacing={2}>
          <Grid item md={5}>
            <AddressForm />
          </Grid>
          <Grid item md={5} sx={{ ml: 3, py: 5, color: "text.secondary" }}>
            
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Address;
