import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";

const OrdersTable = (props) => {
  const { orders, selectedOrder } = props;

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
              secondary={order.completedAt}
            ></ListItemText>
          </ListItemButton>
          <Divider component="li" />
        </Box>
      ))}
    </List>
  );
};

export default OrdersTable;
