import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useState } from "react";
import { registerApi } from "../services/api";

export default function Register() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await registerApi(email, pass, username);
            alert("🎉 Registro exitoso, ahora inicia sesión");
            navigate("/login");
        } catch (error: any) {
            console.error("Error en registro:", error.response?.data || error.message);
            alert(`❌ Error al registrar usuario: ${error.response?.data?.message || "Error desconocido"}`);
        }
    };

    return (
        <Box sx={{ maxWidth: 300, mx: "auto", mt: 10 }}>
            <Typography variant="h5" gutterBottom>Registrar usuario</Typography>
            <TextField
                label="Nombre de usuario"
                fullWidth
                margin="normal"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <TextField
                label="Correo"
                fullWidth
                margin="normal"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <TextField
                label="Contraseña"
                type="password"
                fullWidth
                margin="normal"
                value={pass}
                onChange={e => setPass(e.target.value)}
            />
            <Button variant="contained" fullWidth onClick={handleRegister}>Registrarse</Button>
        </Box>
    );
}
