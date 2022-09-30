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
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5005";

const BrandsTable = (props) => {
  const { brands, onEdit, filter } = props;
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
        props.getBrands();
      })
      .catch((err) => console.log(err));
  };

  let filteredBrands = brands;
  
  if (filter) {
    filteredBrands = brands.filter((brand) =>
      brand.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
  

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
          {filteredBrands.map((brand) => (
            <TableRow key={brand._id}>
              <TableCell><Link to="/modelos">{brand.name}</Link></TableCell>
              <TableCell align="right">
                <div>
                  <Button onClick={() => deleteBrand(brand._id)}>
                    <DeleteOutlineOutlinedIcon />
                  </Button>
                  <Button onClick={() => onEdit(brand)}>
                    <ModeEditOutlineOutlinedIcon />
                  </Button>
                 
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
