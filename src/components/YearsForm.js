import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, TextField } from "@mui/material";

const YearsForm = (props) => {
  const { open, onClose, onSubmit, submitText, year } = props;
  const [fromInput, setFromInput] = useState(year?.from || "");
  const [toInput, setToInput] = useState(year?.to || "");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    
    onSubmit({ from: fromInput, to: toInput })
      .then(() => setFromInput(""))
      .catch((error) => {
        if (error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          setErrors({ from: { message: "Información incorrecta" } });
        }
      });
  };

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>Años</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            error={errors.from !== undefined}
            type="number"
            margin="dense"
            label="Año inicio"
            variant="standard"
            fullWidth
            name="from"
            value={fromInput}
            helperText={errors?.from?.message}
            onChange={(e) => setFromInput(e.target.value)}
          />
          <TextField
            error={errors.from !== undefined}
            type="number"
            margin="dense"
            label="Año Final"
            variant="standard"
            fullWidth
            name="to"
            value={toInput}
            helperText={errors?.to?.message}
            onChange={(e) => setToInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit">{submitText}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default YearsForm;
