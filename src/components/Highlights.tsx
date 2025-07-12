import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const categories = [
  {
    image: '/images/categories/cintas_embalaje.png',
    title: 'Cintas de embalaje',
    description:
      'Cintas adhesivas para uso industrial, agrícola y comercial. Alta resistencia y calidad garantizada.',
  },
  {
    image: '/images/categories/cintas_invernaderos.png',
    title: 'Cintas para invernaderos',
    description:
      'Especiales para aplicaciones agrícolas, resistentes a la humedad y al sol.',
  },
  {
    image: '/images/categories/stretch_film.png',
    title: 'Stretch film',
    description:
      'Películas plásticas para paletizado y protección de productos en tránsito.',
  },
  {
    image: '/images/categories/dispensadores_manuales.png',
    title: 'Dispensadores manuales',
    description:
      'Herramientas prácticas para aplicar cintas y films de forma rápida y segura.',
  },
  {
    image: '/images/categories/dispensadores_industriales.png',
    title: 'Dispensadores industriales',
    description:
      'Equipos automáticos y semiautomáticos para líneas de producción de alto volumen.',
  },
  {
    image: '/images/categories/maquinaria_embalaje.png',
    title: 'Maquinaria para embalaje',
    description:
      'Soluciones completas para automatizar procesos de embalaje en cadena.',
  },
];

export default function ProductCategories() {
  return (
    <Box
      id="products"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
            Conoce nuestras categorías
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            Desde cintas para embalaje hasta maquinaria industrial, tenemos todo lo que tu negocio necesita.
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {categories.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 2,
                  height: 300,
                  cursor: 'default',
                  '&:hover .overlay': {
                    opacity: 1,
                  },
                  '&:hover img': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.title}
                  sx={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                />
                <Box
                  className="overlay"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    bgcolor: 'rgba(0,0,0,0.6)',
                    color: 'white',
                    p: 2,
                    transition: 'opacity 0.4s ease',
                    opacity: 0,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.300' }}>
                    {item.description}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
