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
import moment from "moment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EnergySavingsLeafOutlinedIcon from "@mui/icons-material/EnergySavingsLeafOutlined";
import Footer from "../components/Footer";

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
 
  return (
    <>
      <Grid container sx={{ minHeight: "100vh" }}>
        <Grid item md={5} xs={12}>
          <Box sx={{ p: 5, textAlign: "center", color: "text.secondary" }}>
            <CheckCircleOutlinedIcon color="primary" fontSize="large" />
            <Typography mt={2}>
              <strong>¡Gracias por tu compra {order.client.name}!</strong>
            </Typography>
            <Typography mt={2}>
              Tu orden ha sido confirmada y pronto estaremos contigo
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          md={7}
          xs={12}
          sx={{ bgcolor: "rgb(192, 211, 229, .3)" }}
        >
          <Box sx={{ p: 4, color: "text.secondary", width: "500px" }}>
            <Typography mt={5} variant="h4" color="primary" fontWeight="bold">
              Detalle del pedido
            </Typography>
            <Typography mt={2} fontWeight="bold">
              Has escogido una entrega: {order.deliveryType}
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
            {order.deliveryType === "A domicilio" && (
              <>
                <Grid container>
                  <Grid item xs={6} sm={4}>
                    <AccessTimeIcon />
                    <Typography>Día y hora de entrega</Typography>
                  </Grid>
                  <Grid item xs={6} sm={8}>
                    <Typography>
                      {moment(order.deliveryHour).format("DD/MM/YYYY HH:mm a")}
                    </Typography>
                  </Grid>
                </Grid>
                <hr />
              </>
            )}
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
                <Typography>Batería</Typography>
              </Grid>
              <Grid item xs={6} sm={8}>
                <Typography>Modelo {order.battery.model}</Typography>
                <Typography>Marca {order.battery.brand}</Typography>
                <Typography>
                  Entrega de batería usada: {order.deliverBattery}
                </Typography>
              </Grid>
            </Grid>
            <hr />
            <Grid container>
              <Grid item xs={6} sm={4}>
                
                <Typography>Precio</Typography>
                <Typography>Cupón</Typography>
              </Grid>
              <Grid item xs={6} sm={8}>
                <Typography> ${order.battery.price}</Typography>
                <Typography>-$200</Typography>
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
                <strong>MXN ${order.battery.price -200}</strong>
              </Typography>
            </Box>

            <Typography variant="caption" display="block" gutterBottom>
              *Precio incluye IVA
            </Typography>
            {order.deliverBattery === "Si" && (
              <Box display="flex" my={4}>
                <EnergySavingsLeafOutlinedIcon
                  fontSize="small"
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    p: 1,
                    mr: 2,
                    borderRadius: "50%",
                  }}
                />

                <Typography>
                  Al momento de tu pago recibirás un
                  <span style={{ fontWeight: "bold", color: "#1976D2" }}>
                    {" "}
                    descuento adicional
                  </span>{" "}
                  entre $200 pesos a $400 pesos dependiendo del tipo y tamaño de
                  tu batería
                </Typography>
              </Box>
            )}
            <Typography mt={3} fontWeight="bold">
              Recuerda que puedes contactarnos por WhatsApp en cualquier momento
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Footer />
      <WhatsApp />
    </>
  );
};

export default Thanks;
