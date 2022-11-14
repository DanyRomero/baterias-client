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
import axios from "axios";
import { API_URL } from "../utils/consts";
import { useNavigate } from "react-router-dom";
import 'moment/locale/es'

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
  const navigate = useNavigate();
  
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryHour, setDeliveryHour] = useState("");
  
  moment.locale('es');
  let today = moment().format("YYYY-MM-DD");
  let tomorrow = moment().add(1, "days").format("YYYY-MM-DD");

  const handleSchedule = () => {
    const [hour, minutes] = deliveryHour.split(":")
    const deliveryDatetime = moment(deliveryDate).hour(hour).minutes(minutes)
    const schedule = deliveryDatetime.toISOString()

    axios
      .post(`${API_URL}/ordenes/${localStorage.orderId}/horario`, {
        deliveryHour: schedule,
      })
      .then((response) => navigate("/orden"))
      .catch((error) => console.error(error));
  };
  
  if(moment(today).day() === 0){
    today = moment(today).add(1, "days").format("YYYY-MM-DD")
  }

  if(moment(tomorrow).day() === 1){
    tomorrow = moment(tomorrow).add(1, "days").format("YYYY-MM-DD")
  }
  if(moment(tomorrow).day() === 0){
    tomorrow = moment(tomorrow).add(1, "days").format("YYYY-MM-DD")
  }
 

  return (
    <Container>
      <Button
        disabled={availableHrs.length === 0}
        variant="contained"
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          p: 2,
          borderRadius: "50%",
        }}
        onClick={() => setDeliveryDate(today)}
      >
        {moment(today).format("ddd")}
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
        {moment(tomorrow).format("ddd")}
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
                      mt: 1,
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
              onClick={handleSchedule}
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
                      mt: 1,
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
              onClick={handleSchedule}
            >
              Continuar
            </Button>
          </Stack>
        </Box>
      )}
    </Container>
  );
};

export default CheckBoxHours;
