import { Typography, Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';

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
      <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
        Bodega Front End Elian Muriel
      </Box>
    </Container>
  );
}
