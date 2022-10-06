import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../utils/consts";
import ClientForm from "../components/ClientForm";
import { Paper, Typography, Container, Box, Grid } from "@mui/material";
import LoadingComponent from "../components/Loading";
import CheckoutStepper from "../components/CheckoutStepper";
import WhatsApp from "../components/WhatsApp";

const Order = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/ordenes/${localStorage.orderId}`)
      .then((response) => {
        setOrder(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!order) {
    return <LoadingComponent />;
  }
  const selectedYear = order.model.years.find(
    (year) => year._id === order.year
  );

  return (
    <>
      <Grid container sx={{ minHeight: "100vh" }}>
        <Grid item md={5} xs={12}>
          <Box sx={{ p: 5 }}>
            <CheckoutStepper activeStep={2} />
          </Box>
          <ClientForm />
        </Grid>
        <Grid item container justifyContent="center" md={7} xs={12} sx={{ bgcolor: "rgb(192, 211, 229, .3)" }}>
          <Box sx={{ p: 5, color: "text.secondary", width: '500px' }}>
            <Typography mt={5} variant="h4" color="primary">
              <strong>Resumen del pedido</strong>
            </Typography>
            <Typography mt={2}>Dirección de entrega</Typography>
            <Typography>
              {order.address.addressOne} {order?.address?.addressTwo},{" "}
              {order.address.town}, CP {order.address.zipCode},{" "}
              {order.address.state}
            </Typography>
            <hr />
            <Typography>Vehículo</Typography>
            <Typography>
              {order.brand.name} {order.model.name} del año {selectedYear.from}{" "}
              - {selectedYear.to}
            </Typography>
            <hr />
            <Typography>Batería</Typography>
            <Typography>{order?.battery?.name}</Typography>
            <Grid
              item
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography>Modelo {order.battery.model}</Typography>
              <Typography>${order.battery.price}</Typography>
            </Grid>
            <hr />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>
                <strong>Total</strong>
              </Typography>
              <Typography>
                <strong>MXN ${order.battery.price}</strong>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <WhatsApp />
    </>
  );
};

export default Order;
