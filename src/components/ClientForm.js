import React, { useState } from "react";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import EnergySavingsLeafOutlinedIcon from "@mui/icons-material/EnergySavingsLeafOutlined";

import {
  Container,
  Stack,
  Button,
  InputAdornment,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from "@mui/material";
import axios from "axios";
import { API_URL } from "../utils/consts";
import { Navigate, useNavigate } from "react-router-dom";

const ClientForm = () => {
  const [nameClient, setNameClient] = useState("");
  const [lastNameClient, setLastNameClient] = useState("");
  const [phoneClient, setPhoneClient] = useState("");
  const [emailClient, setEmailClient] = useState("");
  const [deliverBattery, setDeliverBattery] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    setDeliverBattery(event.target.value);
  };
  const handleNameChange = (e) => {
    setNameClient(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastNameClient(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhoneClient(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmailClient(e.target.value);
  };

  const sendData = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/ordenes/${localStorage.orderId}/cliente`, {
        client: {
          name: nameClient,
          lastName: lastNameClient,
          phone: phoneClient,
          email: emailClient,
        },
        deliverBattery,
      })
      .then((response) => navigate("/confirmacion"))
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={sendData}>
      <Stack pb={5} px={5} spacing={3}>
        <Typography variant="h4" color="primary">
          <strong>Datos de contacto</strong>
        </Typography>

        <TextField
          fullWidth
          label="Nombre"
          id="name"
          value={nameClient}
          onChange={handleNameChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Apellido"
          id="lastName"
          value={lastNameClient}
          onChange={handleLastNameChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Celular"
          id="phone"
          type="number"
          value={phoneClient}
          onChange={handlePhoneChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocalPhoneOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Correo"
          id="email"
          type="email"
          value={emailClient}
          onChange={handleEmailChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
        <Typography color="primary" fontWeight="bold" variant="h5">
          Deseo un descuento adicional
        </Typography>
        <Box bgcolor="#ECF2F7" p={3} borderRadius="15px">
          <Typography color="primary" fontWeight="bold" variant="body1">
            Deseo entregar mi batería usada
          </Typography>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={deliverBattery}
              onChange={handleChange}
            >
              <FormControlLabel value="Si" control={<Radio />} label="Si" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <Box display="flex" my={4}>
            <EnergySavingsLeafOutlinedIcon
              fontSize="small"
              sx={{
                backgroundColor: "success.main",
                color: "white",
                p: 1,
                mr: 2,
                borderRadius: "50%",
              }}
            />

            <Typography variant="subtitle2">
              Recuerda que al entregar tu batería usada pudes recibir un
              <span style={{ fontWeight: "bold", color: "#1976D2" }}>
                {" "}
                descuento adicional
              </span>{" "}
              de $200 a $400 pesos dependiendo del tipo y tamaño de tu
              batería
            </Typography>
          </Box>
        </Box>

        <Button
          type="submit"
          disabled={
            nameClient === "" ||
            lastNameClient === "" ||
            phoneClient === "" ||
            emailClient === "" ||
            deliverBattery === ""
          }
          variant="contained"
        >
          Finalizar
        </Button>
      </Stack>
    </form>
  );
};

export default ClientForm;
