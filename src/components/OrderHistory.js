import { Box, Typography, Paper, Stepper, StepContent } from "@mui/material";
import moment from "moment/moment";
import React from "react";

const OrderHistory = ({ order }) => {
  if (!order) {
    return;
  }

  return (
    <Box sx={{ m: 5 }} component={Paper}>
      <Typography>
        Historial del pedido - {order?.orderId ? order.orderId : "S/N"}
      </Typography>
      <Stepper orientation="vertical">
        <StepContent>
          {order.completedAt && (
            <Typography>
              Orden creada:{" "}
              {moment(`${order.completedAt}`).format("DD/MM/YYYY HH:mm a")}{" "}
            </Typography>
          )}
        </StepContent>
      </Stepper>
    </Box>
  );
};

export default OrderHistory;
