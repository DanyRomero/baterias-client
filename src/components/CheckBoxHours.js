import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import moment from "moment";

const hours = ["10:30", "12:00", "13:30", "15:00", "16:30"];

function getAvailableHours() {
  const date = new Date();
  const now = date.toLocaleTimeString("es-MX");

  const lastHours = [];
  for (let i = 0; i < hours.length; i++) {
    if (hours[i] > now) {
      lastHours.push(hours[i]);
    }
  }
  return lastHours;
}

const CheckBoxHours = () => {
  const availableHrs = getAvailableHours();

  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryHour, setDeliveryHour] = useState("");

  const today = moment().format("ddd");
  const tomorrow = moment().add(1, "days").format("ddd");
  console.log(availableHrs);
  return (
    <Container>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          p: 2,
          borderRadius: "50%",
        }}
        onClick={() => setDeliveryDate(today)}
      >
        {today}
      </Button>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          p: 2,
          borderRadius: "50%",
          ml: 3,
        }}
        onClick={() => setDeliveryDate(tomorrow)}
      >
        {tomorrow}
      </Button>

      {deliveryDate === today && (
        
        <Box>
          <Stack spacing={3} mt={2}>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={deliveryHour}
              onChange={(e) => setDeliveryHour(e.target.value)}
            >
              {availableHrs.map((hour, index) => {
                return (
                  <FormControlLabel
                    sx={{
                      bgcolor: "#ECF2F7",
                      width: "100%",
                      p: 1,
                      borderRadius: "15px",
                      mt:1,
                    }}
                    key={index}
                    value={hour}
                    control={<Radio />}
                    label={`${hour} hrs`}
                  />
                );
              })}
            </RadioGroup>
            <Button
              variant="contained"
              fullWidth
              disabled={deliveryHour === ""}
            >
              Continuar
            </Button>
          </Stack>
        </Box>
      )}
      {deliveryDate === tomorrow && (
        
        <Box>
          <Stack spacing={3} mt={2}>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={deliveryHour}
              onChange={(e) => setDeliveryHour(e.target.value)}
            >
              {hours.map((hour, index) => {
                return (
                  <FormControlLabel
                    sx={{
                      bgcolor: "#ECF2F7",
                      width: "100%",
                      p: 1,
                      borderRadius: "15px",
                      mt:1,
                    }}
                    key={index}
                    value={hour}
                    control={<Radio />}
                    label={`${hour} hrs`}
                  />
                );
              })}
            </RadioGroup>
            <Button
              variant="contained"
              fullWidth
              disabled={deliveryHour === ""}
            >
              Continuar
            </Button>
          </Stack>
        </Box>
      )}
      {availableHrs === [] && <p>No hay horarios disponibles para hoy</p>}
    </Container>
  );
};

export default CheckBoxHours;
