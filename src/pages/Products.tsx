import AppTheme from '../theme/AppTheme';
import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../services/api";
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppNavbar, Header, SideMenu } from '@/components/layout';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from '../theme/customizations';
import AddProductDialog from './AddProduct';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  stock?: number;
  created_at?: Date;
  updated_at?: Date;
}

export default function Products(props: { disableCustomTheme?: boolean }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error("Error cargando productos:", err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("¿Seguro que deseas eliminar este producto?")) {
      try {
        await deleteProduct(id);
        loadProducts();
      } catch (err) {
        console.error("Error eliminando producto:", err);
        alert("Error al eliminar producto");
      }
    }
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setOpenAdd(true);
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nombre', flex: 1 },
    { field: 'price', headerName: 'Precio', flex: 0.8,
      valueFormatter: (value: any) => {
        const num = parseFloat(value);
        return !isNaN(num) ? `$${num.toFixed(2)}` : "$0.00";
      },
    },
    {
      field: 'description',
      headerName: 'Descripción',
      flex: 1.5,
      valueFormatter: (value?: string) => value ?? "N/A",
    },
    {
      field: 'stock',
      headerName: 'Stock',
      flex: 0.5,
      valueFormatter: (value?: number) => value ?? 0,
    },
    {
      field: 'created_at',
      headerName: 'Fecha de Creación',
      flex: 1,
      valueFormatter: (value?: Date) =>
        value ? dayjs(value).format('DD/MM/YYYY') : "N/A",
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      flex: 1,
      renderCell: (params) => (
        <>
          <Button
            size="small"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => handleEdit(params.row)}
            sx={{ mr: 1 }}
          >
            Editar
          </Button>
          <Button
            size="small"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(params.row.id)}
          >
            Eliminar
          </Button>
        </>
      ),
    },
  ];

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
                  onClick={() => {
                    setEditProduct(null);
                    setOpenAdd(true);
                  }}
                >
                  Agregar Productos
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
                getRowId={(row) => row.id}
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 5, page: 0 },
                  },
                }}
                pageSizeOptions={[5, 10, 25]}
                disableRowSelectionOnClick
                sx={{ borderRadius: 2 }}
                localeText={{
                  noRowsLabel: "🚨 No hay productos. Haz clic en 'Agregar' para crear uno.",
                }}
              />
            </Box>
          </Stack>
        </Box>
      </Box>

      {/* Modal para agregar / editar producto */}
      <AddProductDialog
        open={openAdd}
        onClose={() => {
          setOpenAdd(false);
          setEditProduct(null);
        }}
        onSuccess={loadProducts}
        editProduct={editProduct}
      />
    </AppTheme>
  );
}
