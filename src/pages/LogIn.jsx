import React, { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import "./Signup";
import * as PATHS from "../utils/paths";
import * as USER_HELPERS from "../utils/userToken";

import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';

export default function LogIn({ authenticate }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const { username, password } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    const credentials = {
      username,
      password,
    };
    login(credentials).then((res) => {
      if (!res.status) {
        return setError({
          message: "Error en el correo o contraseña",
        });
      }
      USER_HELPERS.setUserToken(res.data.accessToken);
      authenticate(res.data.user);
      navigate(PATHS.HOMEPAGE);
    });
  }
  const paperStyle = {
    padding: 20,

    width: 250,
    margin: "20px auto",
  };
  const avatarStyle = {
    backgroundColor: "rgb(0, 88, 155)",
  };
  return (
    <Box>
      <Paper elevation={12} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <DirectionsCarFilledOutlinedIcon />
          </Avatar>
          <h2>Login</h2>
        </Grid>

        <form onSubmit={handleFormSubmission} className="signup__form">
          <Stack spacing={3}>
            <TextField
              margin="dense"
              type="email"
              label="Correo"
              size="small"
              name="username"
              value={username}
              fullWidth
              variant="standard"
              onChange={handleInputChange}
              required
            />

            <TextField
              margin="dense"
              label="Contraseña"
              type="password"
              name="password"
              size="small"
              fullWidth
              variant="standard"
              value={password}
              onChange={handleInputChange}
              required
              minLength="8"
            />

            {error && (
              <Typography color="red" align="center">
                {error.message}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ marginTop: "25px" }}
            >
              Entrar
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
