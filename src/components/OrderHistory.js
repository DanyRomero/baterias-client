import {
  Box,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import moment from "moment/moment";
import React from "react";

const OrderHistory = ({ order }) => {
  const [activeStep, setActiveStep] = React.useState(4);

  const getActiveStep = () =>{
    if(order.onTheWayAt && !order.instaledAt){
      setActiveStep(2)
     }
     if(order.instaledAt){
      setActiveStep(3)
     }
  }
  
  if (!order) {
    return;
  }

  return (
    <Box sx={{ m: 5 }} component={Paper}>
      <Typography sx={{m:3, pt:3}}>
        <strong>Historial del pedido - {order?.orderId ? order.orderId : "S/N"}</strong>
      </Typography>
      <Stepper activeStep={activeStep} orientation="vertical" sx={{m:3}}>
        {order.completedAt && (
          <Step>
            <StepLabel>
              <Typography variant="subtitle2">
                Orden creada:
              </Typography>
              <Typography variant="overline">
                {moment(`${order.completedAt}`).format("DD/MM/YYYY HH:mm a")}{" "}
              </Typography>
            </StepLabel>
          </Step>
        )}
        {order.onTheWayAt && (
          <Step>
            <StepLabel>
              <Typography variant="subtitle2">
                Batería en ruta:{" "}
              </Typography>
              <Typography variant="overline">
                {moment(`${order.onTheWayAt}`).format("DD/MM/YYYY HH:mm a")}{" "}
              </Typography>
            </StepLabel>
          </Step>
        )}
        {order.instaledAt && (
          <Step>
            <StepLabel>
              <Typography variant= "subtitle2">
                Batería instalada:
              </Typography>
              <Typography variant="overline">
                {moment(`${order.instaledAt}`).format("DD/MM/YYYY HH:mm a")}{" "}
              </Typography>
            </StepLabel>
          </Step>
        )}
      </Stepper>
    </Box>
  );
};

export default OrderHistory;
