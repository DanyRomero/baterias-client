import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, TextField } from "@mui/material";

const ModelForm = (props) => {
  const { open, onClose, onSubmit, submitText, model, brandId } = props;
  const [modelInput, setModelInput] = useState(model?.name || "");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    if(modelInput.trim().length === 0){
      setErrors({ name: { message: "Ingresa el modelo" } });
      setModelInput("")
      return
    }
    onSubmit({ name: modelInput, brand: brandId })
      .then(() => setModelInput(""))
      .catch((error) => {
        if (error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          setErrors({ name: { message: "Algo salió mal" } });
        }
      });
  };

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>Modelo</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            error={errors.name !== undefined}
            margin="dense"
            label="Nombre"
            variant="standard"
            fullWidth
            name="name"
            value={modelInput}
            helperText={errors?.name?.message}
            onChange={(e) => setModelInput(e.target.value)}
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

export default ModelForm;
