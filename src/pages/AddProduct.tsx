import { useState } from "react";
import { addProduct } from "../services/api";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const handleAdd = async () => {
    await addProduct({ name, price: parseFloat(price) });
    alert("Producto agregado");
    navigate("/products");
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
      <Typography variant="h5" gutterBottom>Agregar Producto</Typography>
      <TextField label="Nombre" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
      <TextField label="Precio" fullWidth margin="normal" value={price} onChange={(e) => setPrice(e.target.value)} />
      <Button variant="contained" fullWidth onClick={handleAdd}>Guardar</Button>
    </Box>
  );
}
