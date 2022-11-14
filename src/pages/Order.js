import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../utils/consts";
import ClientForm from "../components/ClientForm";
import { Paper, Typography, Container, Box, Grid } from "@mui/material";
import LoadingComponent from "../components/Loading";
import CheckoutStepper from "../components/CheckoutStepper";
import WhatsApp from "../components/WhatsApp";
import moment from "moment";
import Footer from "../components/Footer";

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
  const deliveryDate = moment(order.deliveryHour).format("DD/MM/YYYY HH:mm a");
  const comaPrice = order.battery.price.toLocaleString('en-US', {maximumFractionDigits:2})
   const pickupDesc = order.battery.price * .15
  const comapickUpDesc = pickupDesc.toLocaleString('en-US', {maximumFractionDigits:2})
  const finalPickupPrice = order.battery.price -200 -pickupDesc
  const finalDeliveryPrice = order.battery.price -200
  


  return (
    <>
      <Grid container sx={{ minHeight: "100vh" }}>
        <Grid item md={5} xs={12}>
          <Box sx={{ p: 5 }}>
            <CheckoutStepper activeStep={2} />
          </Box>
          <ClientForm />
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          md={7}
          xs={12}
          sx={{ bgcolor: "rgb(192, 211, 229, .3)" }}
        >
          <Box sx={{ p: 5, color: "text.secondary", width: "500px" }}>
            <Typography mt={5} variant="h4" color="primary">
              <strong>Verifica la información de tu pedido</strong>
            </Typography>
            <Typography mt={2} fontWeight="bold">
              Entrega vía: {order.deliveryType}
            </Typography>

            <hr />
            <Typography mt={2}>Dirección de entrega</Typography>
            <Typography>
              {order.address.addressOne} {order?.address?.addressTwo},{" "}
              {order.address.town}, CP {order.address.zipCode},{" "}
              {order.address.state}
            </Typography>
            <hr />
            {order.deliveryType === "A domicilio" && 
              <>
                <Typography mt={2}>Día y horario de entrega</Typography>
                <Typography>{deliveryDate}</Typography>
                <hr />
              </>
            }

            <Typography>Vehículo</Typography>
            <Typography>
              {order.brand.name} {order.model.name} del año {selectedYear.from}{" "}
              - {selectedYear.to}
            </Typography>
            <hr />
            <Typography>Batería</Typography>
            <Typography>Modelo {order.battery.model}</Typography>
            <Grid
              item
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography>Marca {order.battery.brand}</Typography>
              <Typography>${comaPrice}</Typography>
            </Grid>
            
            <hr />
            <Grid
              item
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography>Cupón</Typography>
              <Typography>-$200</Typography>
            </Grid>
            
            <hr />
            {order.deliveryType === "Pickup" && <>
            <Grid
              item
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography>Descuento por recolección en sucursal</Typography>
              <Typography>-${comapickUpDesc}</Typography>
            </Grid>
            
            <hr />
            </>}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>
                <strong>Total</strong>
              </Typography>
              {order.deliveryType === "Pickup" ? <Typography fontWeight="bold">
                MXN ${finalPickupPrice.toLocaleString('en-US', {maximumFractionDigits:2})}
              </Typography>  :
              <Typography fontWeight="bold">
                MXN ${finalDeliveryPrice.toLocaleString('en-US', {maximumFractionDigits:2})}
              </Typography>}
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Footer />
      <WhatsApp />
    </>
  );
};

export default Order;
