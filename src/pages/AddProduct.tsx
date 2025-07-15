import { useState } from "react";
import { addProduct } from "../services/api";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from "@mui/material";

interface AddProductDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void; // callback para recargar productos después
}

export default function AddProductDialog({ open, onClose, onSuccess }: AddProductDialogProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    setLoading(true);
    try {
      await addProduct({ name, price: parseFloat(price) });
      if (onSuccess) onSuccess(); // recargar lista de productos
      onClose();
    } catch (err) {
      console.error("Error al agregar producto:", err);
      alert("Error al agregar producto");
    } finally {
      setLoading(false);
      setName("");
      setPrice("");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>➕ Agregar Producto</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Ingresa los detalles del nuevo producto.
        </Typography>
        <TextField
          label="Nombre"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Precio"
          fullWidth
          margin="normal"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancelar</Button>
        <Button
          variant="contained"
          onClick={handleAdd}
          disabled={!name || !price || loading}
        >
          {loading ? "Guardando..." : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
