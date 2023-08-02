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
import { API_URL } from "../utils/consts";

const YearsTable = (props) => {
  const { years, onEdit, filter, modelId } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const ID = open ? "simple-popover" : undefined;

  const deleteYear = (id) => {
    axios
      .delete(`${API_URL}/modelos/${modelId}/rangos/${id}`)
      .then((response) => {
        props.setModel(response.data);
      })
      .catch((err) => console.log(err));
  };

  let filteredYears = years;
  
  if (filter) {
    filteredYears = years.filter((year) =>
      year.from.toLowerCase().includes(filter.toLowerCase())
    );
  }

  const sortedYears = filteredYears.sort((a, b) => a.from - b.from)
  return (
    <TableContainer sx={{ mt: 3 }} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Año</strong>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedYears.map((year) => (
            <TableRow key={year._id}>
              <TableCell>
                <div
                  style={{ color: "#1976D2", textDecoration: "none" }}
                  to={`/modelos/${year._id}`}
                >
                  {year.from} - {year.to}
                </div>
              </TableCell>
              <TableCell align="right">
                <div>
                  <Button onClick={() => deleteYear(year._id)}>
                    <DeleteOutlineOutlinedIcon />
                  </Button>
                  <Button onClick={() => onEdit(year)}>
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

export default YearsTable;
