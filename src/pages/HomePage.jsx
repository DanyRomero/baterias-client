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
import WhatsApp from "../components/WhatsApp";
import Benefits from "../components/Benefits";
import About from "../components/About";
import CheckoutStepper from "../components/CheckoutStepper";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";

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
    <>
      <Grid container sx={{ minHeight: "100vh" }}>
        <Grid item md={8} sx={{ position: "relative" }}>
          <Stack height="100%">
            <Box
              sx={{
                position: "absolute",
                display: "flex",
                alignItems: "center",
                width: "100%",
                background:
                  "linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(2,0,36,0) 100%)",
                pt: 1,
              }}
            >
              <img src="/images/logoD.png" alt="" width="80px" />
              <Typography variant="h5" component="h1" sx={{ color: "white" }}>
                Distelub
              </Typography>
            </Box>
            <img
              width="100%"
              src="/images/carr.png"
              style={{ flexGrow: 1, objectFit: "cover" }}
            />
          </Stack>
          <WhatsApp />
        </Grid>
        <Grid item md={4}>
          <Box p={4}>
            <Typography variant="h3" component="h1" mb={4}>
              Bater??as <span><img src="/images/lthLogo.png" width="120px" alt="" /></span>a domicilio
            </Typography>

            <Typography variant="body1" component="p" mb={3}>
              Al ingresar tus datos, te ayudamos a encontrar la bater??a ideal
              para tu veh??culo y te la llevamos hasta la puerta de tu casa en 3
              sencillos pasos.
            </Typography>
            <CheckoutStepper />
            <Typography
              variant="body1"
              component="p"
              mt={3}
              sx={{
                textAlign: "center",
              }}
            >
              <strong>Inicia aqu?? y obt??n un cup??n de $200 pesos.</strong>
            </Typography>
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
                    A??o
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={year}
                    label="A??o"
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

      <Benefits />
      <Carousel />
      <About />
      <Footer />
    </>
  );
}

export default HomePage;
