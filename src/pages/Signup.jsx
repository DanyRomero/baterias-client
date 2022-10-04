import React, { useEffect, useState } from "react";
import { signup } from "../services/auth";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import * as PATHS from "../utils/paths";
import * as USER_HELPERS from "../utils/userToken";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { API_URL } from "../utils/consts";


export default function Signup({ authenticate }) {
  
  const[users, setUsers]= useState([])
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
    signup(credentials).then((res) => {
      if (!res.status) {
        // unsuccessful signup
        console.error("Signup was unsuccessful: ", res);
        return setError({
          message: "Signup was unsuccessful! Please check the console.",
        });
      }
      // successful signup
      USER_HELPERS.setUserToken(res.data.accessToken);
      authenticate(res.data.user);
      navigate(PATHS.HOMEPAGE);
    });
  }

    useEffect(()=>{
      axios
      .get(`${API_URL}/usuarios`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
    }, [])

  return (
    <Container>
      <Typography my={4} variant="h4" color="text.secondary">
        <strong>Crear un usuario</strong>
      </Typography>
      <form onSubmit={handleFormSubmission}>
        <Grid container spacing={2}>
          <Grid item>
            <TextField
              size="small"
              fullWidth
              id="input-username"
              label="Correo"
              value={username}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item>
            <TextField
              size="small"
              fullWidth
              id="input-password"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleInputChange}
              required
              minLength="8"
            />
          </Grid>

          {error && (
            <div className="error-block">
              <p>There was an error submiting the form:</p>
              <p>{error.message}</p>
            </div>
          )}

          <Grid item>
            <Button variant="contained" type="submit">
              Crear
            </Button>
          </Grid>
        </Grid>
      </form>
      {users.map((user)=>{
        <Box key={user._id}>
          
        </Box>
      })}
    </Container>
  );
}
