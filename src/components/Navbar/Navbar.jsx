import React from "react";
import { Link } from "react-router-dom";

import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Button, Grid } from "@mui/material";

import PropTypes from "prop-types";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";

const drawerWidth = 240;
const navUser = [
  { to: "/ordenes", title: "Ordenes" },
  {to: "/marcas", title: "Marcas"},
  {to: "/baterias", title: "Baterías"},
  {to: "/usuarios", title: "Usuarios"},
]

const navItems = [
  { to: "/login", title: "Login" }
];

const Navbar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawerUser = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Baterías 911
      </Typography>
      <Divider />
      <List>
        {navUser.map((item) => (
          <ListItem key={item.to} disablePadding>
            <ListItemButton component={Link} to={item.to} sx={{ textAlign: "center" }}>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const drawerItems = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Baterías 911
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.to} disablePadding>
            <ListItemButton component={Link} to={item.to} sx={{ textAlign: "center" }}>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, alignItems: "center", display: { xs: "none", sm: "flex" } }}>
            <img height="30" src="/images/logo.png" />

            <Typography
              variant="h6"
              component="div"
            >
              Baterías 911
            </Typography>
          </Box>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {/* menu que se muestra cuando un usuario inicia sesión */}
            {props.user ? (
              <>
                
                  {navUser.map((item) => (
                    <Button
                      key={item.to}
                      sx={{ color: "#fff" }}
                      component={Link}
                      to={item.to}
                    >
                      {item.title}
                    </Button>                  
                  ))}
                  <Button
                    sx={{ color: "#fff" }}
                    onClick={props.handleLogout}
                  >
                 
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
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {props.user ? drawerUser : drawerItems}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;
