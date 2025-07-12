import { Typography, Stack } from "@mui/material";
import WarehouseIcon from '@mui/icons-material/Warehouse';// 📦 Icono de caja
import { useColorScheme } from "@mui/material/styles";

export function SitemarkIcon() {
  const { mode } = useColorScheme();

  // Colores dinámicos según el modo
  const iconColor = mode === "dark" ? "rgba(255,255,255,0.9)" : "primary.main";
  const textColor = mode === "dark" ? "rgba(255,255,255,0.9)" : "primary.main";
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <WarehouseIcon sx={{ fontSize: 'medium', color: iconColor }} />
      <Typography
        
        sx={{ fontWeight: 'bold', color: textColor }}
      >
        Bodega Cintas de Elian
      </Typography>
    </Stack>
  );
}
