import { Button, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../utils/consts";
import axios from "axios";

const AddressForm = ({zip}) => {

  const [addressOne, setAddressOne] = useState("");
  const [addressTwo, setAddressTwo] = useState("");
  const [zipCode, setZipCode] = useState(zip);
  const [town, setTown] = useState("");
  const [state, setState] = useState("");

  const navigate = useNavigate();

  const handleAddressOneChange = (e) => {
    setAddressOne(e.target.value);
  };
  const handleAddressTwoChange = (e) => {
    setAddressTwo(e.target.value);
  };
  const handleZipCode = (e) => {
    setZipCode(e.target.value);
  };
  const handleTown = (e) => {
    setTown(e.target.value);
  };
  const handleState = (e) => {
    setState(e.target.value);
  };

  const sendData = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/ordenes/${localStorage.orderId}/direccion`, {
       address: { addressOne,
        addressTwo,
        zipCode,
        town,
        state},
        deliveryType: "A domicilio",
      })
      .then((response) => navigate("/horario"))
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={sendData}>
      <Stack p={5} spacing={3}>
        <Typography variant="h4" color="primary" fontWeight="bold">
          Dirección de envío
        </Typography>
        <Typography variant="subtitle2"  fontWeight="bold">
          Recuerda que nuestro envío es gratuito
        </Typography>
        <TextField
          fullWidth
          label="Calle y número exterior"
          id="addressOne"
          value={addressOne}
          onChange={handleAddressOneChange}
        />
        <TextField
          fullWidth
          label="Número interior (si aplica)"
          id="addressTwo"
          value={addressTwo}
          onChange={handleAddressTwoChange}
        />

        <TextField
          type="number"
          fullWidth
          label="Código postal"
          id="addressTwo"
          value={zipCode}
          onChange={handleZipCode}
        />
        <TextField
          fullWidth
          label="Colonia"
          id="town"
          value={town}
          onChange={handleTown}
        />
        <TextField
          fullWidth
          label="Estado"
          id="state"
          value={state}
          onChange={handleState}
        />
        <Button
          type="submit"
          disabled={
            addressOne === "" || zipCode === "" || town === "" || state === ""
          }
          variant="contained"
        >
          Continuar
        </Button>
      </Stack>
    </form>
  );
};

export default AddressForm;
