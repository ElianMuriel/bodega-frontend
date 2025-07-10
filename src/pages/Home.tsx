import { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Container, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("access_token");
  });

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(!!localStorage.getItem("access_token"));
    };

    window.addEventListener("storage", checkLogin);
    const interval = setInterval(checkLogin, 500);

    return () => {
      window.removeEventListener("storage", checkLogin);
      clearInterval(interval);
    };
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
  };

  return (
    <>
      {/* Navbar */}
      <AppBar position="static" sx={{ bgcolor: "#D69A5C" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Bodega
          </Typography>
          {isLoggedIn ? (
            <Button color="inherit" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          ) : (
            <>
              <Button color="inherit" onClick={handleLogin}>
                Iniciar sesión
              </Button>
              <Button color="inherit" onClick={handleRegister}>
                Registrarse
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Contenido */}
      <Container sx={{ mt: 4 }}>
        {isLoggedIn ? (
          <>
            <Typography variant="h3" gutterBottom>
              Bienvenido de nuevo 👋
            </Typography>
            <Typography>
              Gestiona tu inventario de cintas adhesivas aquí.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => navigate("/dashboard")}
            >
              Ir al Panel
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h3" gutterBottom>
              Bienvenido a la Bodega de Cintas
            </Typography>
            <Typography>
              Aquí puedes ver nuestros productos y conocer más sobre nosotros.
            </Typography>
            <Button
              variant="contained"
              onClick={handleLogin}
              sx={{ mt: 2 }}
            >
              Iniciar sesión
            </Button>
          </>
        )}
        <Box
          component="section"
          sx={{ p: 2, border: "1px dashed grey", mt: 4 }}
        >
          Bodega Front End Elian Muriel
        </Box>
      </Container>
    </>
  );
}
