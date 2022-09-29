import * as React from "react";
import { TextField, Grid, Button, TableContainer, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useState, useEffect } from "react";
import BrandsTable from "../components/BrandsTable";

const API_URL = "http://localhost:5005";

export default function Brands() {
  const [open, setOpen] = React.useState(false);
  const [brandInput, setBrandInput] = React.useState("");
  const [brands, setBrands] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getBrands = () => {
    axios
      .get(`${API_URL}/marcas`)
      .then((response) => setBrands(response.data))
      .catch((error) => console.log(error));
  };
  
  useEffect(() => {
    getBrands();
  }, [] );

  const handleNewBrand = (e) => {
    e.preventDefault();
    const requestBody = { name: brandInput };
    axios
      .post(`${API_URL}/marcas`, requestBody)
      .then((response) => {
        // Reset the state to clear the inputs
        setBrandInput("");
        getBrands();
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      <h3>Listado de marcas</h3>
      <Grid container spacing={2}>
        <Grid item md={9} xs>
          <form>
            <Grid container>
              <Grid item xs>
                <TextField
                  size="small"
                  label="Buscar por Nombre"
                  value={""}
                  fullWidth
                  onChange={(e) => e.target.value}
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
            <AddIcon /> Marca
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Marca</DialogTitle>
            <form onSubmit={handleNewBrand}>
              <DialogContent>
                <DialogContentText>
                  Ingrese el nombre de la nueva marca
                </DialogContentText>
                <TextField
                  required
                  margin="dense"
                  label="Nombre"
                  variant="standard"
                  fullWidth
                  name="name"
                  value={brandInput}
                  onChange={(e) => setBrandInput(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button type="submit" onClick={handleClose}>
                  Agregar
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </Grid>
      </Grid>
      <BrandsTable brands={brands} getBrands={getBrands} onEdit={(brand) => setOpen(true)}/>
    </Container>
  );
}
