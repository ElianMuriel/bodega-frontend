import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    IconButton,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
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
}

export default function Categories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const loadCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error("No se pudo cargar la categoria:", error);
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
                console.error("No se pudo eliminar la categoria:", error);
            }
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Categorías
            </Typography>
            <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>
                Nueva Categoría
            </Button>
            <Table sx={{ mt: 2 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Descripción</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map((cat) => (
                        <TableRow key={cat.id}>
                            <TableCell>{cat.name}</TableCell>
                            <TableCell>{cat.description}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleOpen(cat)}>
                                    <Edit />
                                </IconButton>
                                <IconButton color="error" onClick={() => handleDelete(cat.id)}>
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={open} onClose={handleClose} disableEnforceFocus>
                <DialogTitle>{editMode ? "Editar Categoría" : "Nueva Categoría"}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Nombre"
                        fullWidth
                        margin="normal"
                        value={name||""}
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
    );
}
