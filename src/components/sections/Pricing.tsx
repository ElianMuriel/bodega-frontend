import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import SignIn from '../../pages/Login'; // Aquí importamos tu login

const isLoggedIn = false;

const tiers = [
  {
    title: 'Cintas y Stretch',
    price: '—',
    description: [
      'Cintas adhesivas para embalaje industrial y agrícola',
      'Stretch film en diferentes calibres y medidas',
      'Alta resistencia para asegurar tus productos',
      'Disponibles para entrega inmediata',
    ],
    buttonText: 'Iniciar sesión',
    buttonVariant: 'outlined',
    buttonColor: 'primary',
  },
  {
    title: 'Dispensadores y accesorios',
    subheader: 'Más populares',
    price: '—',
    description: [
      'Dispensadores manuales y automáticos para cintas',
      'Accesorios para optimizar el proceso de embalaje',
      'Diseñados para alto rendimiento y durabilidad',
      'Disponibles para todo tipo de cintas',
    ],
    buttonText: 'Iniciar sesión',
    buttonVariant: 'contained',
    buttonColor: 'secondary',
  },
  {
    title: 'Maquinaria de embalaje',
    price: '—',
    description: [
      'Máquinas automáticas para sellado y embalaje',
      'Soluciones industriales para líneas de producción',
      'Soporte técnico y mantenimiento garantizado',
      'Perfectas para grandes volúmenes',
    ],
    buttonText: 'Iniciar sesión',
    buttonVariant: 'outlined',
    buttonColor: 'primary',
  },
];


export default function Pricing() {
  const [openLogin, setOpenLogin] = React.useState(false);

  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);

  return (
    <>
      <Container
        id="pricing"
        sx={{
          pt: { xs: 4, sm: 12 },
          pb: { xs: 8, sm: 16 },
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
          transition: 'filter 0.3s ease',
          filter: openLogin ? 'blur(6px)' : 'none',
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography
            component="h2"
            variant="h4"
            gutterBottom
            sx={{ color: 'text.primary' }}
          >
            Precios y contratos
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Descubre los mejores precios para tu negocio. Inicia sesión para ver las ofertas y hacer pedidos.
          </Typography>
        </Box>
        <Grid
          container
          spacing={3}
          sx={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}
        >
          {tiers.map((tier) => (
            // @ts-ignore
            <Grid
              item
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
              key={tier.title}
              sx={{ position: 'relative' }}
            >
              <Card
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {!isLoggedIn && (
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      bgcolor: 'rgba(0, 0, 0, 0.5)',
                      backdropFilter: 'blur(4px)',
                      zIndex: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: 'white',
                      textAlign: 'center',
                      p: 2,
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                      Inicia sesión para ver precios y hacer pedidos
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleOpenLogin}>
                      Iniciar sesión
                    </Button>
                  </Box>
                )}

                <CardContent>
                  <Box
                    sx={{
                      mb: 1,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 2,
                      color:
                        tier.title === 'Professional' ? 'grey.100' : 'text.primary',
                    }}
                  >
                    <Typography component="h3" variant="h6">
                      {tier.title}
                    </Typography>
                    {tier.title === 'Professional' && (
                      <Chip
                        icon={<AutoAwesomeIcon />}
                        label={tier.subheader}
                        color="secondary"
                      />
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'baseline',
                      filter: !isLoggedIn ? 'blur(5px)' : 'none',
                    }}
                  >
                    <Typography component="h3" variant="h2">
                      ${tier.price}
                    </Typography>
                    <Typography component="h3" variant="h6">
                      &nbsp; al mes
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 2, opacity: 0.8, borderColor: 'divider' }} />
                  {tier.description.map((line) => (
                    <Box
                      key={line}
                      sx={{ py: 1, display: 'flex', gap: 1.5, alignItems: 'center' }}
                    >
                      <CheckCircleRoundedIcon sx={{ width: 20, color: 'primary.main' }} />
                      <Typography variant="subtitle2" component="span">
                        {line}
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant as 'outlined' | 'contained'}
                    color={tier.buttonColor as 'primary' | 'secondary'}
                    disabled={!isLoggedIn}
                  >
                    {isLoggedIn ? tier.buttonText : 'Inicia sesión'}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Modal de login */}
      <Modal
        open={openLogin}
        onClose={handleCloseLogin}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backdropFilter: 'blur(6px)',
        }}
      >
        <Box>
          <SignIn onClose={handleCloseLogin} />
        </Box>
      </Modal>
    </>
  );
}
