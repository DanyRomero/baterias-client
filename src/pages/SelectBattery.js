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
import Footer from "../components/Footer";
import LoadingComponent from "../components/Loading";
import WhatsApp from "../components/WhatsApp";
import { API_URL } from "../utils/consts";
import RecommendOutlinedIcon from "@mui/icons-material/RecommendOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import { border } from "@mui/system";

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
  return (
    <>
      <Container>
        <Grid container sx={{ py: 5 }}>
          <Grid item xs={12} sm={12} sx={{ p: 3 }}>
            <CheckoutStepper activeStep={0} />
            <Typography my={5} variant="h4" color="primary">
              <strong>Seleccionar batería</strong>
            </Typography>
          </Grid>
          <Grid item container spacing={3}>
            {selectedYear.batteries.map((battery) => (
              <Grid item xs={12} sm={4} key={battery._id}>
                <Card variant="outlined">
                  <CardMedia
                    sx={{ maxWidth: "60%", margin: "20px auto" }}
                    component="img"
                    alt="battery"
                    image="/images/bateria.png"
                  />
                  <CardContent sx={{ color: "text.secondary" }}>
                    <Typography color="primary" variant="h6" mb={1}>
                      <strong>{battery.name}</strong>
                    </Typography>
                    <Box display="flex" my={1}>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="primary.dark"
                        mr={2}
                      >
                        Precio: ${battery.price-400}
                      </Typography>
                      <Box>
                        <Typography
                          variant="body2" fontWeight="bold"
                        >
                          Descuento de $200 MXN por comprar en este medio
                         </Typography>
                        <Typography
                          variant="body2" fontWeight="bold"
                        >
                          Y al menos $200 MXN entregando batería usada
                         </Typography>
                        <Typography
                          variant="body2"
                        >
                          *Excepto baterías de gel
                         </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" fontWeight="bold" my={2}>
                      Precio regular: ${battery.price} sin entregar batería
                      usada
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => sendBattery(battery)}
                    >
                      Comprar ahora
                    </Button>
                    <Box>
                      <Typography variant="body2" mt={3}>
                        Modelo:{battery.model}
                      </Typography>
                      <Box display="flex">
                        <RecommendOutlinedIcon fontSize="small" />
                        <Typography variant="body2" ml={1}>
                          Garantía:{battery.garanty} meses
                        </Typography>
                      </Box>
                      <Box display="flex">
                        <SupportAgentOutlinedIcon fontSize="small" />
                        <Typography variant="body2" ml={1}>
                          Incluye servicio de auxilio en el camino sin costo
                        </Typography>
                      </Box>
                      <Box display="flex">
                        <PaymentOutlinedIcon fontSize="small" />
                        <Typography variant="body2" ml={1}>
                          Paga a meses sin intereses
                        </Typography>
                      </Box>
                      <Box display="flex">
                        <BoltOutlinedIcon fontSize="small" />
                        <Typography variant="body2" ml={1}>
                          Capacidad de arranque de {battery.start} amperes
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
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
