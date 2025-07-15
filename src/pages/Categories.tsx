import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Stack,
    Typography,
    IconButton,
    CssBaseline,
} from "@mui/material";
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Upload, Download } from "@mui/icons-material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import AppTheme from '../theme/AppTheme';
import { AppNavbar, Header, SideMenu } from '@/components/layout';

import {
    chartsCustomizations,
    dataGridCustomizations,
    datePickersCustomizations,
    treeViewCustomizations,
} from '../theme/customizations';
import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../services/api";

interface Category {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
}

const xThemeComponents = {
    ...chartsCustomizations,
    ...dataGridCustomizations,
    ...datePickersCustomizations,
    ...treeViewCustomizations,
};

export default function Categories(props: { disableCustomTheme?: boolean }) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const loadCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error("No se pudo cargar las categorías:", error);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const handleOpen = (category?: Category) => {
        if (category) {
            setSelectedCategory(category);
            setName(category.name);
            setDescription(category.description);
            setEditMode(true);
        } else {
            setSelectedCategory(null);
            setName("");
            setDescription("");
            setEditMode(false);
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setName("");
        setDescription("");
        setSelectedCategory(null);
        setEditMode(false);
    };

    const handleSave = async () => {
        try {
            if (editMode && selectedCategory) {
                await updateCategory(selectedCategory.id, name, description);
            } else {
                await createCategory(name, description);
            }
            loadCategories();
            handleClose();
        } catch (error: any) {
            console.error("Error al guardar categoría:", error.response?.data || error.message);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("¿Seguro que quieres eliminar esta categoría?")) {
            try {
                await deleteCategory(id);
                loadCategories();
            } catch (error) {
                console.error("No se pudo eliminar la categoría:", error);
            }
        }
    };

    const columns: GridColDef[] = [
        { field: "name", headerName: "Nombre", flex: 1 },
        { field: "description", headerName: "Descripción", flex: 1.5 },
        {
            field: "createdAt",
            headerName: "Creado",
            flex: 1,
            valueFormatter: (value: Date) => dayjs(value).format('DD/MM/YYYY'),
        },
        {
            field: "actions",
            headerName: "Acciones",
            flex: 1,
            renderCell: (params) => (
                <>
                    <IconButton color="primary" onClick={() => handleOpen(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>
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
                            : theme.palette.background.default,
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
                            <Typography variant="h4">Categorías</Typography>
                            <Stack direction="row" spacing={1}>
                                <Button
                                    color="inherit"
                                    startIcon={<Upload />}
                                    variant="outlined"
                                >
                                    Importar
                                </Button>
                                <Button
                                    color="inherit"
                                    startIcon={<Download />}
                                    variant="outlined"
                                >
                                    Exportar
                                </Button>
                                <Button
                                    startIcon={<AddIcon />}
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleOpen()}
                                >
                                    Nueva Categoría
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
                                rows={categories}
                                columns={columns}
                                getRowId={(row) => row.id}
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

                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>{editMode ? "Editar Categoría" : "Nueva Categoría"}</DialogTitle>
                        <DialogContent>
                            <TextField
                                label="Nombre"
                                fullWidth
                                margin="normal"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                label="Descripción"
                                fullWidth
                                margin="normal"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancelar</Button>
                            <Button variant="contained" onClick={handleSave}>
                                Guardar
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Box>
        </AppTheme>
    );
}
