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
import axios from "axios";
import { API_URL } from "../utils/consts";
import moment from "moment/moment";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

function transformString(inputString) {
  const words = inputString.split("_");

  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  const transformedString = capitalizedWords.join(" ");

  return transformedString;
}

const OrderDetails = ({ order, getOrders, selectedOrder }) => {
  const fetchOrder = () => {
    axios
      .get(`${API_URL}/ordenes/${order._id}`)
      .then((order) => selectedOrder(order.data));
  };

  const updateOrder = (attributes) => {
    axios
      .put(`${API_URL}/ordenes/${order._id}`, attributes)
      .then(() => {
        getOrders();
        fetchOrder();
      })
      .catch((error) => console.error(error));
  };

  const printStatus = () => {
    let today = new Date();
    updateOrder({ printedAt: today.toISOString() });
  };

  const resetPrintStatus = () => {
    updateOrder({ printedAt: null });
  };

  const handleClick = (status) => {
    const now = new Date();
    if (status === "en_ruta") {
      updateOrder({ status: status, onTheWayAt: now });
    } else if (status === "instalada") {
      updateOrder({ status: status, instaledAt: now });
    }
    console.info("You clicked the Chip.");
  };

  if (!order) {
    return (
      <Typography color="primary" align="right" sx={{ my:5 }}>
        <strong>Selecciona una orden para ver los detalles</strong>
      </Typography>
    );
  }

  const selectedYear = order.model?.years?.find(
    (year) => year._id === order.year
  );
  const comaPrice = order.battery?.price?.toLocaleString("en-US", {
    maximumFractionDigits: 2,
  });
  const cuponPrice = order.battery?.price - 200;
  const comaCuponPrice = cuponPrice.toLocaleString("en-US", {
    maximumFractionDigits: 2,
  });

  const componentRef = useRef();

  return (
    <Box>
      <TableContainer ref={componentRef} sx={{ my:5 }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>
                  Detalle de la Orden - {order?.orderId ? order.orderId : "S/N"}
                </strong>
              </TableCell>
              <TableCell align="right">
                <ReactToPrint
                  trigger={() => {
                    return <Button variant="outlined">Imprimir</Button>;
                  }}
                  content={() => componentRef.current}
                  documentTitle="Baterías 911- Nueva orden"
                  pageStyle="print"
                  onAfterPrint={() => printStatus()}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Estatus de impresión</TableCell>
              {order.printedAt ? (
                <TableCell
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  {moment(`${order?.printedAt}`).format("DD/MM/YYYY HH:mm a")}
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => resetPrintStatus()}
                  >
                    Marcar como no impreso
                  </Button>
                </TableCell>
              ) : (
                <TableCell>No impreso</TableCell>
              )}
            </TableRow>
            <TableRow>
              <TableCell>Estatus</TableCell>
              <TableCell
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                {order?.status ? transformString(order.status) : "Sin estatus"}
                {order.status === "recibida" && (
                  <Button
                    color="primary"
                    size="small"
                    onClick={() => handleClick("en_ruta")}
                  >
                    Actualizar a ruta
                  </Button>
                )}
                {order.status === "en_ruta" && (
                  <Button
                    color="primary"
                    size="small"
                    onClick={() => handleClick("instalada")}
                  >
                    Actualizar a instalada
                  </Button>
                )}
              </TableCell>
            </TableRow>
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
                {order?.brand?.name}, {order?.model?.name}, {selectedYear?.from}{" "}
                - {selectedYear?.to}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Batería</TableCell>
              <TableCell>
                Modelo {order?.battery?.model ? order?.battery?.model : "-"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                Marca {order?.battery?.brand ? order?.battery?.brand : "-"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Precio $ {comaPrice ? comaPrice : "-"}</TableCell>
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
                <strong>MXN $ {comaCuponPrice ? comaCuponPrice : "-"}</strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderDetails;
