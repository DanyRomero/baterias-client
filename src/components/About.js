import { fontSize } from "@mui/joy/styles/styleFunctionSx";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const About = () => {
  const year = new Date().getFullYear() - 1990;
  return (
    <Box bgcolor="#ECF2F7" py={6}>
      <Container>
        <Typography variant="h4" align="center" my={3} color="primary">
          Baterías 911 <span style={{fontSize: '20px'}}>por Distelub</span>
        </Typography>
        <Typography variant="h5" align="center" my={3}>
          {year} años de experiencia
        </Typography>

        <Typography
          variant="body1"
          component="p"
          align="center"
          color="text.secondary"
        >
          Somos una empresa mexicana comprometida con el buen servicio.
          Ofrecemos la mejor atención y el mejor precio en los mejores productos
          que ofrece el mercado de lubricantes, acumuladores, bujías y filtros
          con la finalidad de ganarnos su fidelidad para que nos considere un
          proveedor confiable.
        </Typography>
        <br />
        <Typography
          variant="body1"
          component="p"
          align="center"
          color="text.secondary"
          mb={5}
        >
          Estamos seguros que podemos satisfacer las necesidades de nuestros
          clientes cubriendo sus expectativas de servicio, calidad y precio para
          así establecer relaciones comerciales duraderas.
        </Typography>
      </Container>
    </Box>
  );
};

export default About;
