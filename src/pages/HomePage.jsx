import "../App.css";
import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { API_URL } from "../utils/consts";
import axios from "axios";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import WhatsApp from "../components/WhatsApp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function HomePage() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const navigate = useNavigate();

  const selectedModel = models.find((modelMap) => modelMap._id === model);

  const handleBrandChange = (event) => {
    setBrand(event.target.value);
    axios
      .get(`${API_URL}/modelos`, { params: { id: event.target.value } })
      .then((response) => {
        setModels(response.data);
      })
      .catch((error) => console.log(error));

    setModel("");
    setYear("");
  };

  const handleModelChange = (event) => {
    setModel(event.target.value);
    setYear("");
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`${API_URL}/ordenes`, { brand, model, year })
      .then((response) => {
        localStorage.setItem("orderId", response.data._id);
        navigate("/bateria");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/marcas`)
      .then((response) => {
        setBrands(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      <Grid item md={8}>
        <Stack height="100%">
          <img
            width="100%"
            src="/images/car.png"
            style={{ flexGrow: 1, objectFit: "cover" }}
          />
          <marquee
            style={{
              marginTop: "-4px",
              color: "white",
              backgroundColor: "rgb(239, 21, 36)",
              height: "40px",
              fontSize: "20px",
            }}
            behavior="loop"
            speed="normal"
            direction="right"
            scrollamount="6"
          >
            Diagnóstico e instalación sin costo.* En la compra de la batería
          </marquee>
        </Stack>
        <WhatsApp />
      </Grid>
      <Grid item md={4}>
        <Box p={4}>
          <Typography variant="h3" component="h1">
            Baterías <span style={{ color: "red" }}>LTH</span> a domicilio
          </Typography>

          <Grid
            container
            align="center"
            justifyContent="center"
            spacing={2}
            my={2}
          >
            <Grid item sm={4} color="text.secondary">
              <PaidOutlinedIcon fontSize="large" color="primary" />
              <Typography mt={1} variant="body2">
                Paga en efectivo o tarjeta a la entrega
              </Typography>
            </Grid>
            <Grid item sm={4} color="text.secondary">
              <LocalOfferOutlinedIcon fontSize="large" color="primary" />
              <Typography mt={1} variant="body2">
                Descuento por tu batería usada
              </Typography>
            </Grid>
            <Grid item sm={4} color="text.secondary">
              <AccessTimeIcon fontSize="large" color="primary" />
              <Typography mt={1} variant="body2">
                Recíbela en menos de 24 horas
              </Typography>
            </Grid>
          </Grid>

          <form onSubmit={handleSubmit}>
            <Stack py={5} spacing={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Marca</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={brand}
                  label="Marca"
                  onChange={handleBrandChange}
                >
                  {brands.map((brand) => {
                    return (
                      <MenuItem key={brand._id} value={brand._id}>
                        {brand.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  disabled={brand === ""}
                >
                  Modelo
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={model}
                  label="Modelo"
                  disabled={brand === ""}
                  onChange={handleModelChange}
                >
                  {models.map((model) => {
                    return (
                      <MenuItem key={model._id} value={model._id}>
                        {model.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  disabled={selectedModel === undefined}
                >
                  Año
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={year}
                  label="Año"
                  onChange={handleYearChange}
                  disabled={selectedModel === undefined}
                >
                  {selectedModel?.years?.map((year) => {
                    return (
                      <MenuItem key={year._id} value={year._id}>
                        {year.from} - {year.to}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={year === ""}
              >
                Continuar
              </Button>
            </Stack>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}

export default HomePage;
