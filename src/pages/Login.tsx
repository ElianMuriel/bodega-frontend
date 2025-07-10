import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useState } from "react";
import { loginApi } from "../services/api";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!user || !pass) {
      alert("⚠️ Por favor completa todos los campos");
      return;
    }

    try {
      const data = await loginApi(user, pass); // 👈 llama al backend
      localStorage.setItem("access_token", data.access_token); // 👈 guarda el token
      alert("🎉 Login exitoso");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error en login:", error.response?.data || error.message);
      alert(`❌ Error al iniciar sesión: ${error.response?.data?.message || "Error desconocido"}`);
    }
  };

  return (
    <Box sx={{ maxWidth: 300, mx: "auto", mt: 10 }}>
      <Typography variant="h5" gutterBottom>Iniciar sesión</Typography>
      <TextField
        label="Correo"
        fullWidth
        margin="normal"
        value={user}
        onChange={e => setUser(e.target.value)}
      />
      <TextField
        label="Contraseña"
        type="password"
        fullWidth
        margin="normal"
        value={pass}
        onChange={e => setPass(e.target.value)}
      />
      <Button variant="contained" fullWidth onClick={handleLogin}>Ingresar</Button>
    </Box>
  );
}
