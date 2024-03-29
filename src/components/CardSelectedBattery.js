import {
  Box,
  Card,
  Grid,
  Button,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import RecommendOutlinedIcon from "@mui/icons-material/RecommendOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import StarIcon from "@mui/icons-material/Star";
import LthModal from "./LthModal";
import AgmModal from "./AgmModal";
import FullPowerModal from "./FullPowerModal";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";

const CardSelectedBattery = ({ battery, order, sendBattery }) => {
  const selectedYear = order.model.years.find(
    (year) => year._id === order.year
  );

  const expensiveBattery = selectedYear.batteries.reduce((max, min) =>
    max.price > min.price ? max : min
  );
  const { price, _id, brand, model } = battery;
  const comaPrice = price.toLocaleString("en-US", { maximumFractionDigits: 2 });
  const cuponPrice = price - 200;
  const comaCuponPrice = cuponPrice.toLocaleString("en-US", {
    maximumFractionDigits: 2,
  });
  return (
    <Grid item xs={12} sm={4} key={_id}>
      <Card variant="outlined" sx={{ position: "relative" }}>
        {expensiveBattery._id === _id && (
          <Box
            display="flex"
            alignItems="center"
            p={1}
            position="absolute"
            bgcolor="red"
            color="white"
            borderRadius="0 10px"
          >
            <StarIcon />
            <Typography sx={{ color: "white" }}>Recomendada</Typography>
          </Box>
        )}
        {brand === "LTH" && (
          <CardMedia
            sx={{ width: "250px", margin: "20px auto", height: "250px" }}
            component="img"
            alt="battery"
            image="/images/lthBattery.png"
          />
        )}
        {brand === "AGM" && (
          <CardMedia
            sx={{ width: "250px", margin: "20px auto", height: "250px" }}
            component="img"
            alt="battery"
            image="/images/agmBattery.png"
          />
        )}
        {brand === "Full Power" && (
          <CardMedia
            sx={{ width: "250px", margin: "20px auto", height: "250px" }}
            component="img"
            alt="battery"
            image="/images/FullBattery.png"
          />
        )}

        <CardContent sx={{ color: "text.secondary" }}>
          <Typography color="primary" variant="h6" mb={1} fontWeight="bold">
            {model}
          </Typography>
          <Box display="flex" my={1}>
            <Typography
              variant="h6"
              fontWeight="bold"
              color="primary.dark"
              mr={2}
            >
              Precio: ${comaCuponPrice}
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              CUPÓN -$200 MXN
            </Typography>
          </Box>
          <Typography variant="body2" fontWeight="bold" my={2}>
            Precio regular: ${comaPrice} MXN
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={() => sendBattery(battery)}
          >
            Comprar ahora
          </Button>
          {battery.brand === "LTH" && (
            <>
              <Box display="flex" mt={2}>
                <RecommendOutlinedIcon fontSize="small" />
                <Typography variant="body2" ml={1}>
                  Garantía: 48 meses
                </Typography>
              </Box>
              <Box display="flex">
                <CurrencyExchangeOutlinedIcon fontSize="small" />
                <Typography variant="body2" ml={1}>
                  Reemplazo: 12 meses sin costo
                </Typography>
              </Box>
            </>
          )}
          {battery.brand === "AGM" && (
            <>
              <Box display="flex" mt={2}>
                <RecommendOutlinedIcon fontSize="small" />
                <Typography variant="body2" ml={1}>
                  Garantía: 60 meses
                </Typography>
              </Box>
              <Box display="flex">
                <CurrencyExchangeOutlinedIcon fontSize="small" />
                <Typography variant="body2" ml={1}>
                  Reemplazo: 18 meses sin costo
                </Typography>
              </Box>
            </>
          )}
          {battery.brand === "Full Power" && (
            <>
              <Box display="flex" mt={2}>
                <RecommendOutlinedIcon fontSize="small" />
                <Typography variant="body2" ml={1}>
                  Garantía: 48 meses
                </Typography>
              </Box>
              <Box display="flex">
                <CurrencyExchangeOutlinedIcon fontSize="small" />
                <Typography variant="body2" ml={1}>
                  Reemplazo: 12 meses sin costo
                </Typography>
              </Box>
            </>
          )}

          <Box display="flex">
            <PaymentOutlinedIcon fontSize="small" />
            <Typography variant="body2" ml={1}>
              Paga a meses sin intereses
            </Typography>
          </Box>
          <Box display="flex">
            <BoltOutlinedIcon fontSize="small" />
            <Typography variant="body2" ml={1}>
              Capacidad de arranque de {battery.amps} amperes
            </Typography>
          </Box>
        </CardContent>
        {battery.brand === "LTH" && <LthModal />}
        {battery.brand === "AGM" && <AgmModal />}
        {battery.brand === "Full Power" && <FullPowerModal />}
      </Card>
    </Grid>
  );
};

export default CardSelectedBattery;
