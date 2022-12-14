import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Box, Button, Stack } from "@mui/material";
import axios from "axios";
import { API_URL } from "../utils/consts";
import { useNavigate } from "react-router-dom";

const addresses = [
  {
    name: "Azúcar",
    addressOne: "Av Azúcar 61",
    addressTwo: "Granjas México",
    zipCode: "08400",
    town: "Iztacalco",
    state: "Ciudad de México, CDMX",
  },
  {
    name: "La Viga",
    addressOne: "Calz. de la Viga 734B",
    addressTwo: "Barrio de Zapotla",
    zipCode: "08610",
    town: "Iztacalco",
    state: "Ciudad de México, CDMX",
  },
];

export default function CheckBoxDirection() {
  const [selectedAddress, setSelectedAddress] = React.useState("");
  const navigate = useNavigate();
  
  const handleChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const addressDetails = addresses.find((address) => address.name === selectedAddress)
    
    axios
    .post(`${API_URL}/ordenes/${localStorage.orderId}/direccion`, {
     address: addressDetails,
     deliveryType:"Pickup",
    })
    .then((response) => navigate("/orden"))
    .catch((error) => console.error(error));
  }
   

  return (
    <form onSubmit={handleSubmit}>
      <FormControl sx={{ textAlign: "left", my: 3}}>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={selectedAddress}
        onChange={handleChange}
      >
        <Stack spacing={3}>
          {addresses.map((address) => {
            const {name, addressOne, addressTwo, zipCode, town, state}= address
            return (
              <Box key={name}>
                <FormLabel
                  sx={{ mt: 3, fontWeight: "bold" }}
                  id="demo-controlled-radio-buttons-group"
                >
                  Sucursal {name}
                </FormLabel>
                <FormControlLabel
                  value={name}
                  control={<Radio />}
                  label={`${addressOne} ${addressTwo} ${town} ${zipCode} ${state}`}
                />
              </Box>
            );
          })}
          <Button fullWidth variant="contained" type="submit">Continuar</Button>
        </Stack>
      </RadioGroup>
    </FormControl>
    </form>
  );
}
