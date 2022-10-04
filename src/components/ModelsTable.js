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

const ModelsTable = (props) => {
  const { models, onEdit, filter } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const ID = open ? "simple-popover" : undefined;

  const deleteModel = (id) => {
    axios
      .delete(`${API_URL}/modelos/${id}`)
      .then(() => {
        props.getModels();
      })
      .catch((err) => console.log(err));
  };

  let filteredModels = models;

  if (filter) {
    filteredModels = models.filter((model) =>
      model.name.toLowerCase().includes(filter.toLowerCase())
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
          {filteredModels.map((model) => (
            <TableRow key={model._id}>
              <TableCell>
                <Link
                  style={{ color: "#1976D2", textDecoration: "none" }}
                  to={`/modelos/${model._id}`}
                >
                  {model.name}
                </Link>
              </TableCell>
              <TableCell align="right">
                <div>
                  <Button onClick={() => deleteModel(model._id)}>
                    <DeleteOutlineOutlinedIcon />
                  </Button>
                  <Button onClick={() => onEdit(model)}>
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

export default ModelsTable;
