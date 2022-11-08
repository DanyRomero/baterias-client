import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import { Box, Container, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const testimonials = [
  {
    client: "Gerard M H Gerard Kc",
    description: `Es un servicio de primera calidad y una excelente atención.
  Tuve la necesidad de adquirir una batería y sus precios son muy muy buenos.
    Gran calidad, servicio y costos. De ante mano los recomiendo enorme mente.`,
  },
  {
    client: "maag Maag 1987",
    description: `Buena atención, variedad de precios y calidades; lo que no 
    ofrecen en todos los lugares. Aceptan tarjeta y promociones a meses`,
  },
  {
    client: "Gerardo Ríos Aguila",
    description: `Cambié mi batería hace poco y me orientaron y recomendaron la batería 
    más óptima para mi vehículo. Ampliamente recomendable`,
  },
  {
    client: "W wa",
    description: `De los pocos lugares que puden decirse con honestidad... Mi camioneta 
    tenía algunos detalles raros al arrancar, pensé que era algo mecánico con ellos revisaron 
    la batería y ya no cargaba correctamente, se tiene que sustitur. Me dieron mejor precio 
    que los de servicio de LTH los cuales quedaron de llegar a domicilio y no fue así.. 
    Excelente servicio en este lugar`,
  },
];

export default function Carousel() {
  return (
    <Container>
      <Typography variant="h4" align="center" my={3}>
        Testimonios de Compra
      </Typography>
      <Typography variant="h5" align="center" my={3}>
        Clientes que han confiado en nuestra experiencia y servicio
      </Typography>
      <Swiper
        style={{
          minHeight: "250px",
          backgroundColor: "#ECF2F7",
          padding: "40px 0",
          margin: "40px 0 90px 0",
          borderRadius: "15px",
        }}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
      >
        <Box display={{ xs: "none", md: "block" }}>
          <img
            style={{
              position: "absolute",
              maxWidth: "200px",
              bottom: 0,
              opacity: 0.2,
            }}
            src="/images/doted.png"
            alt=""
          />
        </Box>

        {testimonials.map((testimonial) => {
          const { client, description } = testimonial;
          return (
            <SwiperSlide key={client} style={{ alignSelf: "center" }}>
              
              <Typography
                variant="h6"
                color="text.secondary"
                fontWeight="bold"
                textAlign="center"
                maxWidth="60%"
                mx="auto"
                mb={2}
              >
                {description}
              </Typography>
              <Box display="flex" justifyContent="center" alignItems="center">
                <AccountCircleIcon color="primary" fontSize="large" />
                <Typography
                  variant="body1"
                  color="primary"
                  fontWeight="bold"
                  textAlign="center"
                >
                  {client} /
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight="bold"
                  textAlign="center"
                  ml={1}
                >
                  Cliente de Distelub
                </Typography>
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Container>
  );
}
