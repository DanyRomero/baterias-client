import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Box,
} from "@mui/material";
import moment from "moment/moment";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

const OrderDetails = (props) => {
  const { order } = props;

  if (!order) {
    return (
      <Typography color="primary" align="right">
        <strong>Selecciona una orden para ver los detalles</strong>
      </Typography>
    );
  }

  const selectedYear = order.model.years.find(
    (year) => year._id === order.year
  );
  const comaPrice = order.battery.price.toLocaleString("en-US", {
    maximumFractionDigits: 2,
  });
  const cuponPrice = order.battery.price - 200;
  const comaCuponPrice = cuponPrice.toLocaleString("en-US", {
    maximumFractionDigits: 2,
  });

  const componentRef = useRef();

  return (
    <>
      <TableContainer ref={componentRef} sx={{ my: 3 }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Detalle de la Orden</strong>
              </TableCell>
              <TableCell>
                <ReactToPrint
                  trigger={() => {
                    return <Button variant="outlined">Imprimir</Button>;
                  }}
                  content={() => componentRef.current}
                  documentTitle="Nueva orden"
                  pageStyle="print"
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Fecha y hora de la orden</TableCell>
              <TableCell>
                {moment(`${order?.completedAt}`).format("DD/MM/YYYY HH:mm a")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tipo de entrega</TableCell>
              <TableCell>{order?.deliveryType} </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Nombre del cliente</TableCell>
              <TableCell>
                {order?.client?.name} {order?.client?.lastName}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Teléfono del cliente</TableCell>
              <TableCell>{order?.client?.phone}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Dirección de entrega</TableCell>
              <TableCell>
                {order?.address?.addressOne} {order?.address?.addressTwo},{" "}
                {order?.address?.town}, CP {order?.address?.zipCode},{" "}
                {order?.address?.state}{" "}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Día y hora de entrega</TableCell>
              <TableCell>
                {moment(order?.deliveryHour).format("DD/MM/YYYY HH:mm a")}{" "}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Vehículo </TableCell>
              <TableCell>
                {order?.brand?.name}, {order?.model?.name}, {selectedYear.from}{" "}
                - {selectedYear.to}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Batería</TableCell>
              <TableCell>Modelo {order?.battery?.model}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Marca {order?.battery?.brand}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Precio $ {comaPrice}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cupón </TableCell>
              <TableCell>-$ 200</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Entrega batería usada</TableCell>
              <TableCell>{order?.deliverBattery}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>TOTAL</strong>
              </TableCell>
              <TableCell>
                <strong>MXN $ {comaCuponPrice}</strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default OrderDetails;
