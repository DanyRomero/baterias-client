import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, TextField } from "@mui/material";

const BrandForm = (props) => {
  const { open, onClose, onSubmit, submitText, brand } = props;
  const [brandInput, setBrandInput] = useState(brand?.name || "");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    if(brandInput.trim().length === 0){
      setErrors({ name: { message: "Ingresa la marca" } });
      setBrandInput("")
      return
    }
    onSubmit({ name: brandInput })
      .then(() => setBrandInput(""))
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
      <DialogTitle>Marca</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            error={errors.name !== undefined}
            margin="dense"
            label="Nombre"
            variant="standard"
            fullWidth
            name="name"
            value={brandInput}
            helperText={errors?.name?.message}
            onChange={(e) => setBrandInput(e.target.value)}
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

export default BrandForm;
