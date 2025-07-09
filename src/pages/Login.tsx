import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useState } from "react";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Lógica falsa de login por ahora
    if (user === "admin" && pass === "123") {
      navigate("/dashboard");
    } else {
      alert("Credenciales inválidas");
    }
  };

  return (
    <Box sx={{ maxWidth: 300, mx: "auto", mt: 10 }}>
      <Typography variant="h5" gutterBottom>Iniciar sesión</Typography>
      <TextField label="Usuario" fullWidth margin="normal" value={user} onChange={e => setUser(e.target.value)} />
      <TextField label="Contraseña" type="password" fullWidth margin="normal" value={pass} onChange={e => setPass(e.target.value)} />
      <Button variant="contained" fullWidth onClick={handleLogin}>Ingresar</Button>
    </Box>
  );
}
