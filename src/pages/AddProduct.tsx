import { useEffect, useState } from "react";
import { createProduct, updateProduct } from "../services/api";
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
  editProduct?: {
    id: string;
    name: string;
    price: number;
    description?: string;
    stock?: number;
  } | null;
}

export default function AddProductDialog({
  open,
  onClose,
  onSuccess,
  editProduct,
}: AddProductDialogProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [loading, setLoading] = useState(false);

  // Cargar datos si es edición
  useEffect(() => {
    if (editProduct) {
      setName(editProduct.name);
      setPrice(editProduct.price.toString());
      setDescription(editProduct.description || "");
      setStock(editProduct.stock?.toString() || "");
    } else {
      setName("");
      setPrice("");
      setDescription("");
      setStock("");
    }
  }, [editProduct, open]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        name,
        price: parseFloat(price),
        description,
        stock: parseInt(stock, 10),
      };

      if (editProduct) {
        // Editar producto existente
        await updateProduct(editProduct.id, payload);
      } else {
        // Crear producto nuevo
        await createProduct(payload);
      }

      if (onSuccess) onSuccess(); // recargar lista
      onClose();
    } catch (err) {
      console.error("Error al guardar producto:", err);
      alert("Error al guardar producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        {editProduct ? "✏️ Editar Producto" : "➕ Agregar Producto"}
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {editProduct
            ? "Actualiza los datos del producto seleccionado."
            : "Ingresa los detalles del nuevo producto."}
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
        <TextField
          label="Descripción"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Stock"
          fullWidth
          margin="normal"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          type="number"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!name || !price || loading}
        >
          {loading
            ? "Guardando..."
            : editProduct
            ? "Actualizar"
            : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
