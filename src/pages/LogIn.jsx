import React, { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import "./Signup";
import * as PATHS from "../utils/paths";
import * as USER_HELPERS from "../utils/userToken";

import { Avatar, Button, Grid, Paper, TextField } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

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
        return setError({ message: "Invalid credentials" });
      }
      USER_HELPERS.setUserToken(res.data.accessToken);
      authenticate(res.data.user);
      navigate(PATHS.HOMEPAGE);
    });
  }
  const paperStyle = {
    padding: 20,
    height: "50vh",
    width: 250,
    margin: "20px auto",
  };
  const avatarStyle = {
    backgroundColor: "rgb(0, 88, 155)",
  };
  return (
    <Grid>
      <Paper elevation={12} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Login</h2>
        </Grid>

      <form onSubmit={handleFormSubmission} className="signup__form">
        <TextField
          margin="dense"
          type="email"
          label="Correo"
          variant="standard"
          name="username"
          value={username}
          fullWidth
          helperText="Ingresa tu correo"
          onChange={handleInputChange}
          required
        />
        
        <TextField
          margin="dense"
          label="Contraseña"
          type="password"
          name="password"
          variant="standard"
          fullWidth
          helperText="Ingresa tu contraseña"
          value={password}
          onChange={handleInputChange}
          required
          minLength="8"
        />

        {error && (
          <div className="error-block">
            <p>Existe un error en el formulario:</p>
            <p>{error.message}</p>
          </div>
        )}

        <Button type="submit" fullWidth variant="contained" style={{marginTop:"25px"}}>
            Entrar
        </Button>
      </form>
      </Paper>
    </Grid>
  );
}
