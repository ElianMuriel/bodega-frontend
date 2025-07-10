import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// 📝 Tipado del producto según backend (MongoDB usa _id)
interface Product {
  _id: string;
  name: string;
  price: number;
  createdBy?: string; // opcional
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error cargando productos:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Cargando productos...
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        📦 Productos disponibles
      </Typography>

      {isLoggedIn && (
        <Button
          variant="contained"
          sx={{ mb: 2 }}
          onClick={() => navigate("/add-product")}
        >
          ➕ Agregar Producto
        </Button>
      )}

      <Grid container spacing={3}>
        {products.map((p) => (
          // @ts-ignore
          <Grid item xs={12} sm={6} md={4} key={p._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {p.name}
                </Typography>
                <Typography variant="body2">💲 ${p.price}</Typography>
                {p.createdBy && (
                  <Typography variant="caption">
                    Creado por: {p.createdBy}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
