import React from "react";
import { TextField, Grid, Button, Container, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useState, useEffect } from "react";
import BatteriesTable from "../components/BatteriesTable";
import BatteryForm from "../components/BatteryForm";

const API_URL = "http://localhost:5005";

const Batteries = () => {
  const [open, setOpen] = React.useState(false);
  const [batteries, setBatteries] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingBattery, setEditingBattery] = useState(null);
  const [filter, setFilter] = useState("");

  const handleInput = (e) => {
    setFilter(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getBatteries = () => {
    axios
      .get(`${API_URL}/baterias`)
      .then((response) => setBatteries(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getBatteries();
  }, []);

  const handleNewBattery = (formData) => {
    axios
      .post(`${API_URL}/baterias`, formData)
      .then((response) => {
        getBatteries();
        setOpen(false);
      })
      .catch((error) => console.log(error));
  };

  const handleEditBattery = (formData) => {
    axios
      .put(`${API_URL}/baterias/${editingBattery._id}`, formData)
      .then((response) => {
        console.log(response)
        getBatteries();
        setOpenEdit(false);
      })
      .catch((error) => console.log(error));
  };
  const editBattery = (battery) => {
    setEditingBattery(battery);
    setOpenEdit(true);
  };

  return (
    <Container>
      <Typography my={4} variant="h4" color="text.secondary">
        <strong>Listado de baterías</strong>
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={9} xs>
          <form>
            <Grid container>
              <Grid item xs>
                <TextField
                  size="small"
                  label="Buscar por Nombre"
                  value={filter}
                  fullWidth
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs="auto">
                <Button type="submit">
                  <SearchIcon />
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs="auto">
          <Button variant="outlined" onClick={handleClickOpen}>
            <AddIcon /> Batería
          </Button>
          <BatteryForm
            open={open}
            onClose={handleClose}
            onSubmit={handleNewBattery}
            submitText="Agregar"
          />
        </Grid>
      </Grid>
      <BatteriesTable
        filter={filter}
        batteries={batteries}
        getBatteries={getBatteries}
        onEdit={editBattery}
      />
      {openEdit && (
        <BatteryForm
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          onSubmit={handleEditBattery}
          submitText="Editar"
          battery={editingBattery}
        />
      )}
    </Container>
  );
};

export default Batteries;
