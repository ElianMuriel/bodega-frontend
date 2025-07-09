import { Typography, Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Bienvenido a la Bodega de Cintas
      </Typography>
      <Typography>
        Aquí puedes ver nuestros productos y conocer más sobre nosotros.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/login")} sx={{ mt: 2 }}>
        Iniciar sesión
      </Button>
    </Container>
  );
}
