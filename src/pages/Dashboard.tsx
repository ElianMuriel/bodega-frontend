import DashboardLayout from "../components/DashboardLayout";
import { products } from "../mock/products";
import ProductCard from "../components/ProductCard";
import Grid from "@mui/material/Grid";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Grid container spacing={2}>
        {products.map((product) => (
          // @ts-expect-error - Prop `item` causa error pero funciona en tiempo de ejecución
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </DashboardLayout>
  );
}
