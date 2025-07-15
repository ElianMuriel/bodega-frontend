import AppTheme from '../theme/AppTheme';
import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";

import {
  alpha
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import { AppNavbar, Header, SideMenu } from '@/components/layout';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from '../theme/customizations';
import CircularProgress from '@mui/material/CircularProgress';
import AddProductDialog from './AddProduct';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

// 📝 Tipado del producto según backend (MongoDB usa _id)
interface Product {
  _id: string;
  name: string;
  price: number;
  createdBy?: string; // opcional
  createdAt?: Date;   // opcional
}

export default function Products(props: { disableCustomTheme?: boolean }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [openAdd, setOpenAdd] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error("Error cargando productos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nombre', flex: 1 },
    { field: 'price', headerName: 'Precio', flex: 0.8, 
      valueFormatter: (value: number) => `$${value.toFixed(2)}` },
    {
      field: 'createdBy',
      headerName: 'Creado Por',
      flex: 1,
      valueFormatter: (value?: string) => value ?? "N/A",
    },
    {
      field: 'createdAt',
      headerName: 'Fecha de Creación',
      flex: 1,
      valueFormatter: (value?: Date) =>
        value ? dayjs(value).format('DD/MM/YYYY') : "N/A",
    },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Cargando productos...
        </Typography>
      </Box>
    );
  }

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'stretch', sm: 'center' }}
              spacing={2}
              sx={{ width: '100%' }}
            >
              <Typography variant="h4">📦 Productos</Typography>
              <Stack direction="row" spacing={1}>
                <Button
                  color="inherit"
                  startIcon={<UploadIcon />}
                  variant="outlined"
                >
                  Importar
                </Button>
                <Button
                  color="inherit"
                  startIcon={<DownloadIcon />}
                  variant="outlined"
                >
                  Exportar
                </Button>
                <Button
                  startIcon={<AddIcon />}
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenAdd(true)}
                >
                  Agregar
                </Button>
              </Stack>
            </Stack>
            <Box
              sx={{
                height: { xs: 400, md: 500 },
                width: '100%',
                bgcolor: 'background.paper',
                borderRadius: 2,
              }}
            >
              <DataGrid
                rows={products}
                columns={columns}
                getRowId={(row) => row._id}
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 5, page: 0 },
                  },
                }}
                pageSizeOptions={[5, 10, 25]}
                disableRowSelectionOnClick
              />
            </Box>
          </Stack>
        </Box>
      </Box>

      {/* Modal para agregar producto */}
      <AddProductDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSuccess={loadProducts}
      />
    </AppTheme>
  );
}
