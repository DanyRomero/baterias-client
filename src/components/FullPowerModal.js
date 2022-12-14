import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Dialog, DialogContent, Grid, IconButton } from "@mui/material";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseIcon from "@mui/icons-material/Close";

const FullPowerModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button fullWidth onClick={handleOpen}>
        Detalles
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        scroll="body"
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <Box>
            <Box>
              <Box display="flex" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                  <img width="100vw" src="/images/FullPowerLogo.png" alt="" />
                  <Typography ml={2} fontWeight="bold">
                    Línea - Full Power
                  </Typography>
                </Box>
                <Box textAlign="right">
                  <IconButton onClick={handleClose}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>
              <Grid container mt={2} spacing={4}>
                <Grid item md={6} p={1}>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    FULL POWER reune la más alta tecnología en sus componentes.
                    Ofreciéndole al automóvil respuesta inmediata, fuerza
                    superior y un desempeño sobresaliente.
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Ideal para vehiculos de modelos recientes y equipados con
                    dispositivos eléctricos que incrementan su demanda de
                    energía.
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Typography fontWeight="bold" color="primary" mb={2}>
                      SERVICIO AUTOMOTRIZ
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <Typography
                        width="85px"
                        color="#FFD400"
                        bgcolor="black"
                        borderRadius="15px"
                        textAlign="center"
                        sx={{ typography: { md: 'h2', xs: 'h4' } }}
                        p={1}
                        mr={1}
                        mb={1}
                      >
                        48
                      </Typography>
                      <Typography variant="h4" sx={{ typography: { md: 'h4', xs: 'h6' } }} ><strong>Meses de garantía</strong></Typography>
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
                        Capacidades eléctricas superiores a los requerimientos
                        de equipo original.
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
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FullPowerModal;
