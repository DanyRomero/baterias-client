import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ScheduleIcon from "@mui/icons-material/Schedule";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import DiscountOutlinedIcon from "@mui/icons-material/DiscountOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import EnergySavingsLeafOutlinedIcon from "@mui/icons-material/EnergySavingsLeafOutlined";

const Benefits = () => {
  return (
    <Container sx={{ py: 12 }}>
      <Typography variant="h4" align="center">
        <span style={{ color: "#1976D2" }}>Distelub</span> y{" "}
        <span style={{ color: "red" }}>LTH</span> te envían tu batería a
        domicilio
      </Typography>
      <Typography variant="h5" align="center" mt={3}>
        Conoce algunos de los beneficios que ofrecemos
      </Typography>
      <Grid container mt={4} spacing={3}>
        <Grid
          item
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            pr: 4,
          }}
        >
          <Box display="flex" mb={3}>
            <SearchIcon
              fontSize="medium"
              sx={{
                backgroundColor: "primary.main",
                color: "white",
                p: 1,
                borderRadius: "50%",
              }}
            />
            <Box>
              <Typography
                ml={3}
                fontWeight="bold"
                component="p"
                variant="body1"
              >
                Encuentra tu batería ideal
              </Typography>
              <Typography my={1} ml={3} variant="body2">
                Te brindaremos las opciones adecuadas para tu vehículo, de las
                cuales tu podrás elegir la de tu agrado. Recuerda que
                podrás contar con asesoría personalizada.
              </Typography>
            </Box>
          </Box>
          <Box display="flex" mb={3}>
            <ScheduleIcon
              fontSize="medium"
              sx={{
                backgroundColor: "primary.main",
                color: "white",
                p: 1,
                borderRadius: "50%",
              }}
            />
            <Box>
              <Typography
                ml={3}
                fontWeight="bold"
                component="p"
                variant="body1"
              >
                Programa tu instalación
              </Typography>
              <Typography my={1} ml={3} variant="body2">
                Obtendrás tu batería en menos de 24 horas en el domicilio
                de tu elección
              </Typography>
            </Box>
          </Box>
          <Box display="flex" mb={3}>
            <PaidOutlinedIcon
              fontSize="medium"
              sx={{
                backgroundColor: "primary.main",
                color: "white",
                p: 1,
                borderRadius: "50%",
              }}
            />
            <Box>
              <Typography
                fontWeight="bold"
                component="p"
                ml={3}
                variant="body1"
              >
                Facilidades de pagos
              </Typography>
              <Typography my={1} ml={3} variant="body2">
                Podrás pagar por transferencia o pago con tarjeta en hasta 3
                meses sin intereses. Aceptamos todas las tarjetas de crédito.
              </Typography>
            </Box>
          </Box>
          <Box display="flex" mb={3}>
            <DiscountOutlinedIcon
              fontSize="medium"
              sx={{
                backgroundColor: "primary.main",
                color: "white",
                p: 1,
                borderRadius: "50%",
              }}
            />
            <Box>
              <Typography
                fontWeight="bold"
                component="p"
                ml={3}
                variant="body1"
              >
                Obten descuentos especiales
              </Typography>
              <Typography my={1} ml={3} variant="body2">
                Podrás obtener descuentos durante tu proceso de compra,
                simplemente al pedir por este medio ya tendrás $200 MXN de
                descuento
              </Typography>
            </Box>
          </Box>
          <Box display="flex" mb={3}>
            <EngineeringOutlinedIcon
              fontSize="medium"
              sx={{
                backgroundColor: "primary.main",
                color: "white",
                p: 1,
                borderRadius: "50%",
              }}
            />
            <Box>
              <Typography
                fontWeight="bold"
                component="p"
                ml={3}
                variant="body1"
              >
                Diagnóstico e instalación sin costo
              </Typography>
              <Typography my={1} ml={3} variant="body2">
                El diagnóstico, instalación y envío van por nuestra cuenta en la
                compra de tu batería
              </Typography>
            </Box>
          </Box>
          <Box display="flex" mb={3}>
            <EnergySavingsLeafOutlinedIcon
              fontSize="medium"
              sx={{
                backgroundColor: "primary.main",
                color: "white",
                p: 1,
                borderRadius: "50%",
              }}
            />
            <Box>
              <Typography
                fontWeight="bold"
                component="p"
                ml={3}
                variant="body1"
              >
                Apoyamos al medio ambiente
              </Typography>
              <Typography my={1} ml={3} variant="body2">
                Conscientes de la importancia de cuidar el medio ambiente,
                reciclamos las baterías usadas para recuperar la materia prima
                (polipropileno y plomo) y fabricar nuevas baterías
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item md={6} sx={{display: "flex", alignItems:"center"}} >
          <img
            width="100%"
            src="/images/car2.jpg"
            alt=""
            style={{ borderRadius: "10px" }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Benefits;
