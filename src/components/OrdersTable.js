import {
  Box,
  Chip,
  Divider,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import moment from "moment/moment";
const OrdersTable = ({ orders, selectedOrder, printStatus }) => {
  const sendOrder = (order) => {
    selectedOrder(order);
  };

  return (
    <List>
      {orders.map((order) => (
        <Box key={order._id}>
          <ListItemButton key={order._id} onClick={() => sendOrder(order)}>
            <ListItemText
              primary={`${order.client.name} ${order.client.lastName}`}
              secondary={moment(`${order.completedAt}`).format(
                "DD/MM/YYYY HH:mm a"
              )}
            ></ListItemText>
            {order.printedAt && <Chip label="Impreso" variant="outlined" />}
          </ListItemButton>
          <Divider component="li" />
        </Box>
      ))}
    </List>
  );
};

export default OrdersTable;
