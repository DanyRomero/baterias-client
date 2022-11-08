import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const ZipCodeForm = ({handleZipCode}) => {
  const [zipCode, setZipCode] = useState("");
  
  return (
    <Container>
      <form onSubmit={()=> handleZipCode(zipCode)}>
        <Stack p={5} spacing={3}>
          <Typography variant="h4" color="primary" fontWeight="bold">
            Ingresa el CP de envío
          </Typography>
          <TextField
            type="number"
            fullWidth
            label="Código postal"
            id="addressTwo"
            value={zipCode}
            onChange={(e)=>setZipCode(e.target.value)}
          />
          <Button type="submit" disabled={zipCode === ""} variant="contained">
            Continuar
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default ZipCodeForm;
