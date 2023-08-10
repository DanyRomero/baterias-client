import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { API_URL } from "../utils/consts";
import axios from "axios";
import OrdersTable from "../components/OrdersTable";
import OrderDetails from "../components/OrderDetails";
import OrderHistory from "../components/OrderHistory";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = () => {
    axios
      .get(`${API_URL}/ordenes`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => console.log(error));
  };
  const selectedOrder = (order) => {
    setOrder(order);
  };

  return (
    <Box sx={{ display: "flex", height: "calc(100vh - 64px)" }}>
      <Box
        flexShrink={0}
        width="360px"
        borderRight={1}
        borderColor={"divider"}
        height="100%"
        overflow="auto"
      >
        <OrdersTable orders={orders} selectedOrder={selectedOrder} />
      </Box>
      <Box flexGrow={1} overflow="auto" height="100%" px={5}>
        <Grid container>
          <Grid item sm={8}>
            <OrderDetails
              order={order}
              getOrders={getOrders}
              selectedOrder={selectedOrder}
            />
          </Grid>
          <Grid item sm={4}>
            <OrderHistory order={order} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );

  /* return (
    <Box>
      <Grid container>
        <Grid item sm={5}>
          <OrdersTable orders={orders} selectedOrder={selectedOrder} />
        </Grid>
        <Grid item container sm={7}>
          <Grid item sm={6}>
            <OrderDetails
              order={order}
              getOrders={getOrders}
              selectedOrder={selectedOrder}
            />
          </Grid>
          <Grid item sm={3}>
            <OrderHistory order={order} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  ); */
};

export default Orders;
