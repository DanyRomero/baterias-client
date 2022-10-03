import React, { useState } from "react";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import {
  Container,
  Stack,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { API_URL } from "../utils/consts";

const ClientForm = () => {
  const [nameClient, setNameClient] = useState("");
  const [lastNameClient, setLastNameClient] = useState("");
  const [phoneClient, setPhoneClient] = useState("");
  const [emailClient, setEmailClient] = useState("");

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
        name: nameClient,
        lastName: lastNameClient,
        phone: phoneClient,
        email: emailClient,
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
  };

  return (
    <Container sx={{ display: "flex" }}>
      <form onSubmit={sendData}>
        <Stack py={5} spacing={3}>
          <Typography color="primary">
            <strong>Datos de contacto</strong>
          </Typography>

          <TextField
            fullWidth
            label="Nombre"
            id="name"
            sx={{ m: 1, width: "25ch" }}
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
            sx={{ m: 1, width: "25ch" }}
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
            sx={{ m: 1, width: "25ch" }}
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
            sx={{ m: 1, width: "25ch" }}
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
          <Button
            type="submit"
            disabled={
              nameClient === "" &&
              lastNameClient === "" &&
              phoneClient === null &&
              emailClient === ""
            }
            variant="contained"
          >
            Finalizar
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default ClientForm;
