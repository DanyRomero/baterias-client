import { Container, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { API_URL } from "../utils/consts";
import axios from "axios";
import OrdersTable from "../components/OrdersTable";
import OrderDetails from "../components/OrderDetails";


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);
  useEffect(() => {
    axios
      .get(`${API_URL}/ordenes`)
      .then((response) => {
        console.log("ordenes", response.data);
        setOrders(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const selectedOrder = (order) => { setOrder(order)};
  console.log("ORDEN",order)

  return (
    <Container>
      <Typography my={4} variant="h4" color="text.secondary">
        <strong>Listado de órdenes</strong>
      </Typography>
      <Grid container spacing={4}>
        <Grid item sm={3}>
          <OrdersTable orders={orders} selectedOrder={selectedOrder} />
        </Grid>
        <Grid item sm={9}>
          <OrderDetails order={order}/>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Orders;
