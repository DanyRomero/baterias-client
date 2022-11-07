import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid } from "@mui/material";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

const modalWrapper = {
  overflow:"auto",
  maxHeight:"85vh",
  display:"flex",
};

const modalBlock = {
  position:"relative",
  zIndex:0,
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  margin:"auto",
}

const modalContentStyle ={
  position:"relative",
  background:"#fff",
  boxShadow:24,
  mt:3,
  width:"60%",
  mb:3,
  borderRadius:"10px",
  bgcolor: "background.paper",
  borderRadius: "15px",
  boxShadow: 24,
  color: "#364A63",
  p: 4,
};


const LthModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  

  return (
    <div>
      <Button fullWidth onClick={handleOpen}>
        Detalles
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={modalWrapper}
      >
      <Box sx={modalBlock}>
        <Box sx={modalContentStyle}>
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <img width="100vw" src="/images/lthLogo.png" alt="" />
              <Typography ml={2} fontWeight="bold">Línea - LTH</Typography>
            </Box>
            <Typography variant="h6" fontWeight="bold">
              Energía que no se detiene
            </Typography>
          </Box>
          <Grid container mt={2} spacing={4}>
            <Grid item md={6} p={1}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                fontWeight="bold"
              >
                El alma de tu automóvil
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                LTH cuenta con más de 85 años siendo la marca líder en la
                industria automotriz, la más recomendada por los consumidores y
                la preferida de los automovilistas. Por ellos es capaz de
                ofrecer el respaldo que ninguna otra puede.
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                LTH es calidad, tecnología de vanguardia, seguridad, confianza y
                experiencia.
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                La batería que requieren la mayoría de los vehículos en México,
                pues cubre las necesidades eléctricas de vehículos con
                equipamiento estandar.
              </Typography>
            </Grid>
            <Grid item md={6}>
              <Box display="flex" alignItems="center">
                <Typography
                  width="85px"
                  variant="h2"
                  color="white"
                  bgcolor="red"
                  borderRadius="15px"
                  m={1}
                >
                  48
                </Typography>
                <Typography variant="h4">Meses de garantía</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Typography
                  width="85px"
                  variant="h2"
                  color="white"
                  bgcolor="blue"
                  borderRadius="15px"
                  p={1}
                  m={1}
                >
                  12
                </Typography>
                <Typography variant="h4">
                  Meses de reemplazo sin costo
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Typography variant="h6" fontWeight="bold" my={2}>
            Características
          </Typography>
          <Box bgcolor="#ECF2F7" borderRadius="15px" p={3} position="relative">
            <Box display="flex">
              <CheckOutlinedIcon fontSize="small" />
              <Typography ml={1}>
                Tecnología patentada POWERFRAME® en rejilla positiva.
              </Typography>
            </Box>
            <Box display="flex">
              <CheckOutlinedIcon fontSize="small" />
              <Typography ml={1}>
                Cumple con los requerimientos y capacidades electricas.
              </Typography>
            </Box>
            <Box display="flex">
              <CheckOutlinedIcon fontSize="small" />
              <Typography ml={1}>
                Cubre el 99% de las aplicaciones vehiculares en México.
              </Typography>
            </Box>
            <Box display="flex">
              <CheckOutlinedIcon fontSize="small" />
              <Typography ml={1}>Libre de mantenimiento.</Typography>
            </Box>
            <Typography ml={1} fontWeight="bold" mt={1}>
              LTH® es el acumulador #1 en ventas en México.
            </Typography>
          </Box>
          <img style={{position:"absolute", right:"30px", maxWidth:"300px", bottom:0}} src="/images/lthBattery.png" alt="" />
        </Box>
      </Box>
      </Modal>
    </div>
  );
};

export default LthModal;
