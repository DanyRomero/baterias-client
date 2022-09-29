import React from "react";
import { Link } from "react-router-dom";

import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Button, Grid } from "@mui/material";

const Navbar = (props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display:"flex", alignItems: "center"}}>
            <img height="30" src="/images/logo.png" />

            <Button sx={{ color: "#fff" }} component={Link} to="/">
              Distelub - Baterías a domicilio
            </Button>
          </Box>

          <Box>
            {/* menu que se muestra cuando un usuario inicia sesión */}
            {props.user ? (
              <>
                <Button sx={{ color: "#fff" }} component={Link} to="/pedidos">
                  Pedidos
                </Button>

                <Button sx={{ color: "#fff" }} component={Link} to="/marcas">
                  Marcas
                </Button>

                <Button sx={{ color: "#fff" }} component={Link} to="/usuarios">
                  Usuarios
                </Button>

                <Button sx={{ color: "#fff" }} onClick={props.handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button sx={{ color: "#fff" }} component={Link} to="/admin">
                  Login
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
