import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';

export default function FAQ() {
  const [expanded, setExpanded] = React.useState<string[]>(['panel1']); // Primera pregunta abierta

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(
        isExpanded
          ? [...expanded, panel]
          : expanded.filter((item) => item !== panel),
      );
    };

  return (
    <Container
      id="faq"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        sx={{
          color: 'text.primary',
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        Preguntas frecuentes
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Accordion
          expanded={expanded.includes('panel1')}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <Typography component="span" variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocalShippingRoundedIcon color="primary" /> ¿Hacen entregas a todo el país?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
              Sí, realizamos envíos a cualquier parte del país. Nuestra logística asegura que tus cintas y productos de embalaje lleguen a tiempo y en perfectas condiciones.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded.includes('panel2')}
          onChange={handleChange('panel2')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2d-content"
            id="panel2d-header"
          >
            <Typography component="span" variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PersonRoundedIcon color="primary" /> ¿Puedo comprar sin registrarme?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
              Puedes explorar nuestros productos, pero para acceder a los precios y realizar pedidos es necesario iniciar sesión o crear una cuenta.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded.includes('panel3')}
          onChange={handleChange('panel3')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3d-content"
            id="panel3d-header"
          >
            <Typography component="span" variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BuildRoundedIcon color="primary" /> ¿Ofrecen asesoría para elegir maquinaria?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
              Claro que sí. Nuestro equipo puede orientarte para elegir la maquinaria, stretch o cintas más adecuadas según las necesidades de tu negocio.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded.includes('panel4')}
          onChange={handleChange('panel4')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4d-content"
            id="panel4d-header"
          >
            <Typography component="span" variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <InventoryRoundedIcon color="primary" /> ¿Qué tipos de cintas manejan?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
              Tenemos cintas para embalaje industrial, agrícola y alimentario, stretch film, dispensadores manuales e industriales, y más. Consulta nuestro catálogo para conocer todas las opciones.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
}
