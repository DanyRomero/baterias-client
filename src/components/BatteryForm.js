import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Stack, TextField } from "@mui/material";

const BatteryForm = (props) => {
  const { open, onClose, onSubmit, submitText, battery } = props;
  const [batteryNameInput, setBatteryNameInput] = useState(battery?.name || "");
  const [batteryModelInput, setBatteryModelInput] = useState(
    battery?.model || ""
  );
  const [batteryPriceInput, setBatteryPriceInput] = useState(
    battery?.price || ""
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: batteryNameInput,
      model: batteryModelInput,
      price: batteryPriceInput,
    });
    setBatteryNameInput("");
    setBatteryModelInput("");
    setBatteryPriceInput("");
  };
  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>Batería</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={3} >
            <TextField
              required
              margin="dense"
              label="Nombre"
              variant="standard"
              fullWidth
              name="name"
              value={batteryNameInput}
              onChange={(e) => setBatteryNameInput(e.target.value)}
            />
            <TextField
              required
              margin="dense"
              label="Modelo"
              variant="standard"
              fullWidth
              name="model"
              value={batteryModelInput}
              onChange={(e) => setBatteryModelInput(e.target.value)}
            />
            <TextField
              required
              margin="dense"
              label="Precio"
              variant="standard"
              fullWidth
              name="price"
              value={batteryPriceInput}
              onChange={(e) => setBatteryPriceInput(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit">{submitText}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BatteryForm;
