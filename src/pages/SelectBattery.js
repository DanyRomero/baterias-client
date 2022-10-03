import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingComponent from "../components/Loading";
import { API_URL } from "../utils/consts";

function SelectBattery() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/ordenes/${localStorage.orderId}`)
      .then((response) => {
        setOrder(response.data);
        console.log( "order get", response.data);
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
  };

  if (!order) {
    return <LoadingComponent />;
  }

  const selectedYear = order.model.years.find(
    (year) => year._id === order.year
  );
  return (
    <Container sx={{ py: 5}} >
      <Typography variant="h4" mb={5}>
        Seleccionar Bateria
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
              <CardContent>
                <Typography variant="h6" mb={2}>
                  <strong>{battery.name}</strong>
                </Typography>
                <Typography variant="body1">Modelo:{battery.model}</Typography>
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
    </Container>
  );
}

export default SelectBattery;
