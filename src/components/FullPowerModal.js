import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider, Grid } from "@mui/material";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

const modalWrapper = {
  overflow: "auto",
  maxHeight: "85vh",
  display: "flex",
};

const modalBlock = {
  position: "relative",
  zIndex: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "auto",
};

const modalContentStyle = {
  position: "relative",
  background: "#fff",
  boxShadow: 24,
  width: "60%",
  margin: "70px",
  borderRadius: "10px",
  bgcolor: "background.paper",
  borderRadius: "15px",
  boxShadow: 24,
  color: "#364A63",
  padding: "25px",
};

const FullPowerModal = () => {
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
            <Grid container display="flex" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <img width="100vw" src="/images/FullPowerLogo.png" alt="" />
                <Typography ml={2} fontWeight="bold">
                  Línea - Full Power
                </Typography>
              </Box>
              <Typography variant="h6" fontWeight="bold">
                Poder total
              </Typography>
            </Grid>
            <Grid container mt={2} spacing={4}>
              <Grid item md={6} p={1}>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  FULL POWER reune la más alta tecnología en sus componentes.
                  Ofreciéndole al automóvil respuesta inmediata, fuerza superior
                  y un desempeño sobresaliente.
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Ideal para vehiculos de modelos recientes y equipados con
                  dispositivos eléctricos que incrementan su demanda de energía.
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Typography fontWeight="bold" color="primary">
                    SERVICIO AUTOMOTRIZ
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography
                      width="85px"
                      variant="h2"
                      color="#FFD400"
                      bgcolor="black"
                      borderRadius="15px"
                      p={1}
                      mr={1}
                      mb={1}
                    >
                      48
                    </Typography>
                    <Typography variant="h4">Meses de garantía</Typography>
                  </Box>
                  <Typography mt={2} mb={5}>
                    PRIMEROS 12 MESES DE REEMPLAZO SIN COSTO
                  </Typography>
                </Box>
               
              </Grid>
            </Grid>
            <Typography variant="h6" fontWeight="bold" my={2}>
              Características
            </Typography>
            <Box
              bgcolor="#ECF2F7"
              borderRadius="15px"
              p={3}
              position="relative"
            >
              <Grid container>
                <Grid item md={7}>
                  <Box display="flex">
                    <CheckOutlinedIcon fontSize="small" />
                    <Typography ml={1}>
                      Desempeño premium que satisface las necesidades de los
                      consuidores más exigentes.
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <CheckOutlinedIcon fontSize="small" />
                    <Typography ml={1}>
                      Garantía respaldada por procesos de fabricación
                      certificados en ISO/TS16949.
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <CheckOutlinedIcon fontSize="small" />
                    <Typography ml={1}>
                      Capacidades eléctricas superiores a los requerimientos de
                      equipo original.
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <CheckOutlinedIcon fontSize="small" />
                    <Typography ml={1}>
                      15% más útil que una batería convencional estándar.
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <CheckOutlinedIcon fontSize="small" />
                    <Typography ml={1}>
                      Más de 20 años en el mercado.
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <CheckOutlinedIcon fontSize="small" />
                    <Typography ml={1}>Libre de mantenimiento.</Typography>
                  </Box>
                </Grid>
                <Grid item md={5}>
                  <img width="100%" src="/images/FullBattery.png" alt="" />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default FullPowerModal;
