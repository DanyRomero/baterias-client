import { Container, Typography } from "@mui/material";
import React from "react";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import CheckBoxDirection from "./CheckBoxDirection"

const PickForm = () => {
  return (
    <Container sx={{textAlign: "center"}}>
      <AnnouncementOutlinedIcon
        fontSize="large"
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          p: 1,
          borderRadius: "50%",
          mb: 3
        }}
      />
      <Typography variant="body1" textAlign="center" fontWeight="bold">
        De momento no contamos con entrega a domicilio para tu zona
      </Typography>
      <Typography variant="body1" textAlign="center" fontWeight="bold" mt={3}>
        Pero te ofrecemos un{" "}
        <span style={{ color: "#1976D2" }}>15% de descuento </span> al pasar por
        tu batería a nuestras sucursales
      </Typography>
      <CheckBoxDirection />
    </Container>
  );
};

export default PickForm;
