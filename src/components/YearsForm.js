import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { API_URL } from "../utils/consts";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Button,
  Chip,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Box,
  Stack,
} from "@mui/material";
import axios from "axios";

const YearsForm = (props) => {
  const { open, onClose, onSubmit, submitText, year } = props;
  const [fromInput, setFromInput] = useState(year?.from || "");
  const [toInput, setToInput] = useState(year?.to || "");
  const [batteriesInput, setBatteriesInput] = useState(year?.batteries || []);
  const [batteries, setBatteries] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get(`${API_URL}/baterias`)
      .then((response) => setBatteries(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    onSubmit({ from: fromInput, to: toInput, batteries: batteriesInput })
      .then(() => setFromInput(""))
      .catch((error) => {
        if (error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          setErrors({ from: { message: "Información incorrecta" } });
        }
      });
  };

  const handleChangeBatteries = (e) => {
    setBatteriesInput(e.target.value);
  };

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>Años</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={3}>
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
            <FormControl fullWidth>
              <InputLabel id="demo-multiple-chip-label" variant="standard">
                Baterías
              </InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={batteriesInput}
                onChange={handleChangeBatteries}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => {
                      const selectedBattery = batteries.find(
                        (battery) => value === battery._id
                      );
                      return <Chip key={value} label={selectedBattery?.name} />;
                    })}
                  </Box>
                )}
              >
                {batteries.map((battery) => (
                  <MenuItem key={battery._id} value={battery._id}>
                    {battery.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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

export default YearsForm;
