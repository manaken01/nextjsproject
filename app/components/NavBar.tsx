"use client";

import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";

export const NavBar = () => {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <PeopleIcon sx={{ mr: 2 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            Buscador de Usuarios
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
