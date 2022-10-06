import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Fab } from "@mui/material";

const WhatsApp = () => {
  return (
    <Fab
      href="https://wa.me/5215554053974?text=Quisiera%20información%20sobre%20mi%20batería"
      color="success"
      aria-label="whatsapp"
      sx={{ position: "fixed", right: "40px", bottom: "40px" }}
    >
      <WhatsAppIcon fontSize="large" />
    </Fab>
  );
};

export default WhatsApp;
