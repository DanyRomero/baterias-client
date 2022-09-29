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
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Popover from "@mui/material/Popover";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { Link } from "react-router-dom";
import axios from "axios";


const API_URL = "http://localhost:5005";





const BrandsTable = (props) => {
  const { brands, onEdit } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
 

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const ID = open ? "simple-popover" : undefined;

  const deleteBrand = (id) => {
    axios
      .delete(`${API_URL}/marcas/${id}`)
      .then(() => {
        // Once the delete request is resolved successfully
        // navigate back to the list of projects.
        props.getBrands()
      })
      .catch((err) => console.log(err));
  };



  return (
    <TableContainer sx={{ mt: 3 }} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Nombre</strong>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {brands.map((brand) => (
            <TableRow key={brand._id}>
              <TableCell>{brand.name}</TableCell>
              <TableCell align="right">
                <div>
                  <Button aria-describedby={ID} onClick={handleClick}>
                    <MoreHorizIcon />
                  </Button>
                  <Popover
                    id={ID}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <Button onClick={()=>deleteBrand(brand._id)}>
                      <DeleteOutlineOutlinedIcon/>
                    </Button>
                    <Button onClick={() => onEdit(brand)}>
                      <ModeEditOutlineOutlinedIcon />
                    </Button>
                  </Popover>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BrandsTable;
