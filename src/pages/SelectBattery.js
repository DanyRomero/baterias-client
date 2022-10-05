import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import CheckoutStepper from "../components/CheckoutStepper";
import LoadingComponent from "../components/Loading";
import WhatsApp from "../components/WhatsApp";
import { API_URL } from "../utils/consts";

function SelectBattery() {
  const [order, setOrder] = useState(null);

  const navigate = useNavigate()

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
  return (
    <Container sx={{ py: 5 }}>
      <Box sx={{ p: 3, color: "text.secondary" }}>
        <CheckoutStepper activeStep={0} />
        <Typography my={5} variant="h5" color="primary">
          <strong>Seleccionar batería</strong>
        </Typography>
        <Grid container spacing={3}>
          {selectedYear.batteries.map((battery) => (
            <Grid item xs={12} sm={4} key={battery._id}>
              <Card>
                <CardMedia
                  component="img"
                  alt="battery"
                  image="/images/bateria.png"
                />
                <CardContent sx={{ color: "text.secondary" }}>
                  <Typography color="primary" variant="h6" mb={1}>
                    <strong>{battery.name}</strong>
                  </Typography>
                  <Typography variant="body1">
                    Modelo:{battery.model}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Precio: ${battery.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={() => sendBattery(battery)}>
                    Seleccionar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <WhatsApp />
    </Container>
  );
}

export default SelectBattery;
