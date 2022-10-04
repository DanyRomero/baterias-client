import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'

const OrderDetails = (props) => {
  const{ order }= props;
  
  if (!order) {
    return <Typography color="primary" align='right'><strong>Selecciona una orden para ver los detalles</strong></Typography>
  }

  const selectedYear = order.model.years.find((year) =>year._id === order.year);
 
  return (
    <div>
      <TableContainer sx={{ my: 3 }} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Detalle de la Orden</strong></TableCell>
            <TableCell></TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Nombre del cliente</TableCell>
            <TableCell>{order?.client?.name} {order?.client?.lastName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Dirección de entrega</TableCell>
            <TableCell>{order?.address?.addressOne}  {order?.address?.addressTwo}, {order?.address?.town}, CP {order?.address?.zipCode},  {order?.address?.state} </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Vehículo </TableCell>
            <TableCell>{order?.brand?.name}, {order?.model?.name}, {selectedYear.from} - {selectedYear.to}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Batería</TableCell>
            <TableCell>{order?.battery?.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Modelo {order?.battery?.model}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>$ {order?.battery?.price}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>TOTAL</strong></TableCell>
            <TableCell><strong>MXN $ {order?.battery?.price}</strong></TableCell>
          </TableRow>
        </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default OrderDetails