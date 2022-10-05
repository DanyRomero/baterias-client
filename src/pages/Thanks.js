import React, { useEffect, useState } from "react";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { Container } from "@mui/system";
import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import LoadingComponent from "../components/Loading";
import { API_URL } from "../utils/consts";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import DynamicFormOutlinedIcon from "@mui/icons-material/DynamicFormOutlined";
import WhatsApp from "../components/WhatsApp";

const Thanks = () => {
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
  console.log(order);
  return (
    <Container sx={{ py: 5 }}>
      <Grid container spacing={5}>
        <Grid  mt={5} sm={5} item align="center" sx={{ color: "text.secondary" }}>
          <CheckCircleOutlinedIcon  color="primary" fontSize="large" />
          <Typography mt={2}><strong>¡Gracias por tu compra {order.client.name}!</strong></Typography>
          <Typography mt={2}>
            Tu orden ha sido confirmada y pronto estaremos contigo
          </Typography>
        </Grid>
        <Grid item sm={7}>
          <Typography mt={5} color="primary">
            <strong>Detalle del pedido</strong>
          </Typography>
          <Grid container mt={2}>
            <Grid item xs={6} sm={4}>
              <PersonOutlineOutlinedIcon />
              <Typography>Contacto</Typography>
            </Grid>
            <Grid item xs={6} sm={8}>
              <Typography>
                {order.client.name} {order.client.lastName}
              </Typography>
              <Typography>{order.client.phone}</Typography>
              <Typography>{order.client.email}</Typography>
            </Grid>
          </Grid>

          <hr />
          <Grid container>
            <Grid item xs={6} sm={4}>
              <FmdGoodOutlinedIcon />
              <Typography>Dirección de entrega</Typography>
            </Grid>
            <Grid item xs={6} sm={8}>
              <Typography>
                {order.address.addressOne} {order?.address?.addressTwo},{" "}
                {order.address.town}, CP {order.address.zipCode},{" "}
                {order.address.state}
              </Typography>
            </Grid>
          </Grid>
          <hr />
          <Grid container>
            <Grid xs={6} item sm={4}>
              <DirectionsCarOutlinedIcon />
              <Typography>Vehículo</Typography>
            </Grid>
            <Grid item xs={6} sm={8}>
              <Typography>
                {order.brand.name} {order.model.name} del año{" "}
                {selectedYear.from} - {selectedYear.to}
              </Typography>
            </Grid>
          </Grid>
          <hr />
          <Grid container>
            <Grid item xs={6} sm={4}>
              <DynamicFormOutlinedIcon />
              <Typography>Batería {order?.battery?.name}</Typography>
            </Grid>
            <Grid item xs={6} sm={8}>
              <Typography>Modelo {order.battery.model}</Typography>
            </Grid>
          </Grid>
          <hr />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "15px",
            }}
          >
            <Typography>
              <strong>Total de la orden</strong>
            </Typography>
            <Typography>
              <strong>MXN ${order.battery.price}</strong>
            </Typography>
          </Box>

          <Typography variant="caption" display="block" gutterBottom>
            *Precio incluye IVA
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            *Precio al entregar la batería usada
          </Typography>
          <Typography mt={3}>
            <strong>
              Recuerda que puedes contactarnos por WhatsApp en cualquier momento
            </strong>
          </Typography>
        </Grid>
      </Grid>
      <WhatsApp />
    </Container>
  );
};

export default Thanks;
