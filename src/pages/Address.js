import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddressForm from "../components/AddressForm";
import CheckoutStepper from "../components/CheckoutStepper";
import Footer from "../components/Footer";
import Map from "../components/Map";
import PickForm from "../components/PickForm";
import WhatsApp from "../components/WhatsApp";
import ZipCodeForm from "../components/ZipCodeForm";
const CP = [
  "08500", "08100", "03400", "06880", "06850", "08930", "06140", "03100", "03103", "03104", "11800",
  "08400", "03630", "08900", "15900", "08700", "03650", "08830", "15530", "03510", "03810", "03023",
  "03020", "03500", "06800", "15020", "06700", "06760", "06820", "03600", "08200"
];

const Address = () => {
  const [zipCodeStatus, setZipCodeStatus] = useState("pending");
  const [zipCode, setZipCode] = useState("");

  const handleZipCode = (zipCode) => {
    if (CP.includes(zipCode)) {
      setZipCode(zipCode);
      setZipCodeStatus("valid");
    } else {
      setZipCodeStatus("invalid");
    }
  };
  return (
    <>
      <Grid container sx={{ minHeight: "100vh", m:1 }}>
        <Grid item xs={12} md={5}>
          <Box sx={{ p: 5 }}>
            <CheckoutStepper activeStep={1} />
          </Box>
          {zipCodeStatus === "pending" && (
            <ZipCodeForm handleZipCode={handleZipCode} />
          )}
          {zipCodeStatus === "valid" && <AddressForm zip={zipCode} />}
          {zipCodeStatus === "invalid" && <PickForm />}
        </Grid>
        <Grid item xs={12} md={7}>
          <Map />
        </Grid>
      </Grid>
      <Footer />
      <WhatsApp />
    </>
  );
};

export default Address;
