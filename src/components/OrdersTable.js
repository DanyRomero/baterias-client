import {
  Box,
  Chip,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import moment from "moment/moment";

const OrdersTable = ({ orders, selectedOrder }) => {
  console.log({ orders });
  const sendOrder = (order) => {
    selectedOrder(order);
  };

  return (
    <Box>
      <Typography py={4} pl={2} variant="h4" color="text.secondary">
        <strong>Listado de órdenes</strong>
      </Typography>
      <List>
        {orders.map((order) => (
          <Box key={order._id}>
            <ListItemButton key={order._id} onClick={() => sendOrder(order)}>
              <ListItemText
                primary={` Orden ${order?.orderId ? order.orderId : "S/N"} - ${
                  order.client.name
                } ${order.client.lastName}`}
                secondary={moment(`${order.completedAt}`).format(
                  "DD/MM/YYYY HH:mm a"
                )}
              ></ListItemText>

              {order.printedAt && (
                <Chip label="Impreso" variant="outlined" size="small" />
              )}
            </ListItemButton>
            <Divider component="li" />
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default OrdersTable;
