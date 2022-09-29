import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, TextField } from "@mui/material";

const BrandForm = (props) => {
  const { open, onClose, onSubmit } = props;
  const [brandInput, setBrandInput] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name: brandInput });
    setBrandInput("");
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Marca</DialogTitle>
      <form onSubmit={handleSubmit}>
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
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit">Agregar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BrandForm;
