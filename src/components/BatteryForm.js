import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Stack, TextField } from "@mui/material";

const BatteryForm = (props) => {
  const { open, onClose, onSubmit, submitText, battery } = props;
  const [batteryGuaranteeInput, setBatteryNameInput] = useState(
    battery?.guarantee || ""
  );
  const [batteryAmpsInput, setBatteryAmpsInput] = useState(battery?.amps || "");
  const [batteryModelInput, setBatteryModelInput] = useState(
    battery?.model || ""
  );
  const [batteryBrandInput, setBatteryBrandInput] = useState(
    battery?.brand || ""
  );
  const [batteryPriceInput, setBatteryPriceInput] = useState(
    battery?.price || ""
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      guarantee: batteryGuaranteeInput,
      amps: batteryAmpsInput,
      model: batteryModelInput,
      brand: batteryBrandInput,
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
          <Stack spacing={3}>
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
              label="Marca"
              variant="standard"
              fullWidth
              name="brand"
              value={batteryBrandInput}
              onChange={(e) => setBatteryBrandInput(e.target.value)}
            />
      

            <TextField
              type="number"
              required
              margin="dense"
              label="Precio"
              variant="standard"
              fullWidth
              name="price"
              value={batteryPriceInput}
              onChange={(e) => setBatteryPriceInput(e.target.value)}
            />
            <TextField
              type="number"
              required
              margin="dense"
              label="Garantía"
              variant="standard"
              fullWidth
              name="guarantee"
              value={batteryGuaranteeInput}
              onChange={(e) => setBatteryNameInput(e.target.value)}
            />
            <TextField
              type="number"
              required
              margin="dense"
              label="Amperes"
              variant="standard"
              fullWidth
              name="amps"
              value={batteryAmpsInput}
              onChange={(e) => setBatteryAmpsInput(e.target.value)}
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
