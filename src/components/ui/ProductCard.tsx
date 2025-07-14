import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";

interface Props {
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

export default function ProductCard({ name, description, price, stock, image }: Props) {
  return (
    <Card sx={{ width: 250 }}>
      <CardMedia component="img" height="140" image={image} alt={name} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">{description}</Typography>
        <Typography variant="body2">Precio: ${price.toFixed(2)}</Typography>
        <Typography variant="body2">Stock: {stock}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Editar</Button>
        <Button size="small">Eliminar</Button>
      </CardActions>
    </Card>
  );
}
