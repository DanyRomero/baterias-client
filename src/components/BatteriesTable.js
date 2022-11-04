import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import React from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { API_URL } from "../utils/consts";
import axios from "axios";




const BatteriesTable = (props) => {
  const { batteries, filter, onEdit } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const ID = open ? "simple-popover" : undefined;

  const deleteBattery = (id) => {
    axios
      .delete(`${API_URL}/baterias/${id}`)
      .then(() => {
        // Once the delete request is resolved successfully
        // navigate back to the list of projects.
        props.getBatteries();
      })
      .catch((err) => console.log(err));
  };

  let filteredBatteries = batteries;

  if (filter) {
    filteredBatteries = batteries.filter((battery) =>
      battery.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
  

  return (
    <TableContainer sx={{ mt: 3 }} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
         
            <TableCell>
              <strong>Modelo</strong>
            </TableCell>
            <TableCell>
              <strong>Marca</strong>
            </TableCell>
            <TableCell>
              <strong>Precio</strong>
            </TableCell>
            <TableCell>
              <strong>Amperes</strong>
            </TableCell>
            <TableCell>
              <strong>Garantía
              </strong>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredBatteries.map((battery) => (
            <TableRow key={battery._id}>
              
              <TableCell>{battery.model}</TableCell>
              <TableCell>{battery.brand}</TableCell>
              <TableCell>$ {battery.price}</TableCell>
              <TableCell> {battery.amps} amperes</TableCell>
              <TableCell>{battery.guarantee} meses</TableCell>
              <TableCell align="right">
                <div>
                  <Button onClick={() => deleteBattery(battery._id)}>
                    <DeleteOutlineOutlinedIcon />
                  </Button>
                  <Button onClick={() => onEdit(battery)}>
                    <ModeEditOutlineOutlinedIcon />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BatteriesTable