import { Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import CheckoutStepper from "../components/CheckoutStepper";
import Footer from "../components/Footer";
import LoadingComponent from "../components/Loading";
import WhatsApp from "../components/WhatsApp";
import { API_URL } from "../utils/consts";

import CardSelectedBattery from "./CardSelectedBattery";

function SelectBattery() {
  const [order, setOrder] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/ordenes/${localStorage.orderId}`)
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const sendBattery = (battery) => {
    axios
      .put(`${API_URL}/ordenes/${localStorage.orderId}`, {
        battery: battery._id,
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
    navigate("/direccion");
  };

  if (!order) {
    return <LoadingComponent />;
  }

  const selectedYear = order.model.years.find(
    (year) => year._id === order.year
  );

  const expensiveBattery = selectedYear.batteries.reduce((max, min) =>
    max.price > min.price ? max : min
  );

  return (
    <>
      <Container>
        <Grid container sx={{ py: 5 }}>
          <Grid item xs={12} sm={12} sx={{ p: 3 }}>
            <CheckoutStepper activeStep={0} />
            <Typography my={5} variant="h4" color="primary" fontWeight="bold">
              Seleccionar batería
            </Typography>
          </Grid>
          <Grid item container spacing={3}>
            {selectedYear.batteries.map((battery) => (
              <CardSelectedBattery battery={battery} order={order} sendBattery={sendBattery} />
            ))}
          </Grid>
        </Grid>
        <WhatsApp />
      </Container>
      <Footer />
    </>
  );
}

export default SelectBattery;
