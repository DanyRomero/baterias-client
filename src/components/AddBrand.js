import { Grid, TextField, Paper, Button } from "@mui/material";
import React from "react";
import NavBar from "../components/NavBar";

const AddBrand = () => {
  const paperStyle = {
    padding: 20,
    height: "30vh",
    width: 820,
    margin: "20px auto",
  };
  return (
    <div>
      <NavBar />
      <Grid>
        <Paper elevation={12} style={paperStyle}>
          <h2 >Marca</h2>
          
          <form>
            <TextField
              required
              margin="dense"
              label="Nombre"
              variant="standard"
              fullWidth
              helperText="Ingresa el nombre de la marca"
              value={""}
              onChange={(e) => e.target.value}
            />
            <Grid align="center"><Button type="submit" variant="contained" style={{marginTop:"25px"}}>Enviar</Button></Grid>
          </form>
        </Paper>
      </Grid>
    </div>
  );
};

export default AddBrand;
