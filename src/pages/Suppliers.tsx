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
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Upload,
    Download,
} from "@mui/icons-material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import AppTheme from "../theme/AppTheme";
import { AppNavbar, Header, SideMenu } from "@/components/layout";

import {
    chartsCustomizations,
    dataGridCustomizations,
    datePickersCustomizations,
    treeViewCustomizations,
} from "../theme/customizations";
import {
    getSuppliers,
    createSupplier,
    updateSupplier,
    deleteSupplier,
} from "../services/api";

interface Supplier {
    id: string;
    name: string;
    contact_person?: string;
    phone?: string;
    email?: string;
    address?: string;
    created_at: Date;
}

const xThemeComponents = {
    ...chartsCustomizations,
    ...dataGridCustomizations,
    ...datePickersCustomizations,
    ...treeViewCustomizations,
};

export default function SuppliersPage(props: { disableCustomTheme?: boolean }) {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
    const [name, setName] = useState("");
    const [contactPerson, setContactPerson] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    const loadSuppliers = async () => {
        try {
            const data = await getSuppliers();
            setSuppliers(data);
        } catch (error) {
            console.error("No se pudo cargar los proveedores:", error);
        }
    };

    useEffect(() => {
        loadSuppliers();
    }, []);

    const handleOpen = (supplier?: Supplier) => {
        if (supplier) {
            setSelectedSupplier(supplier);
            setName(supplier.name);
            setContactPerson(supplier.contact_person || "");
            setPhone(supplier.phone || "");
            setEmail(supplier.email || "");
            setAddress(supplier.address || "");
            setEditMode(true);
        } else {
            setSelectedSupplier(null);
            setName("");
            setContactPerson("");
            setPhone("");
            setEmail("");
            setAddress("");
            setEditMode(false);
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setName("");
        setContactPerson("");
        setPhone("");
        setEmail("");
        setAddress("");
        setSelectedSupplier(null);
        setEditMode(false);
    };

    const handleSave = async () => {
        try {
            const payload = {
                name,
                contact_person: contactPerson,
                phone,
                email,
                address,
            };

            if (editMode && selectedSupplier) {
                await updateSupplier(selectedSupplier.id, payload);
            } else {
                await createSupplier(payload);
            }
            loadSuppliers();
            handleClose();
        } catch (error: any) {
            console.error("Error al guardar proveedor:", error.response?.data || error.message);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("¿Seguro que quieres eliminar este proveedor?")) {
            try {
                await deleteSupplier(id);
                loadSuppliers();
            } catch (error) {
                console.error("No se pudo eliminar el proveedor:", error);
            }
        }
    };

    const columns: GridColDef[] = [
        { field: "name", headerName: "Nombre", flex: 1 },
        { field: "contact_person", headerName: "Contacto", flex: 1 },
        { field: "phone", headerName: "Teléfono", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "address", headerName: "Dirección", flex: 1.5 },
        {
            field: "created_at",
            headerName: "Creado",
            flex: 1,
            valueFormatter: (value: Date) => dayjs(value).format("DD/MM/YYYY"),
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
            <Box sx={{ display: "flex" }}>
                <SideMenu />
                <AppNavbar />
                <Box
                    component="main"
                    sx={(theme) => ({
                        flexGrow: 1,
                        backgroundColor: theme.vars
                            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                            : theme.palette.background.default,
                        overflow: "auto",
                    })}
                >
                    <Stack
                        spacing={2}
                        sx={{
                            alignItems: "center",
                            mx: 3,
                            pb: 5,
                            mt: { xs: 8, md: 0 },
                        }}
                    >
                        <Header />
                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            justifyContent="space-between"
                            alignItems={{ xs: "stretch", sm: "center" }}
                            spacing={2}
                            sx={{ width: "100%" }}
                        >
                            <Typography variant="h4">Proveedores</Typography>
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
                                    Nuevo Proveedor
                                </Button>
                            </Stack>
                        </Stack>

                        <Box
                            sx={{
                                height: { xs: 400, md: 500 },
                                width: "100%",
                                bgcolor: "background.paper",
                                borderRadius: 2,
                            }}
                        >
                            <DataGrid
                                rows={suppliers}
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
                        <DialogTitle>
                            {editMode ? "Editar Proveedor" : "Nuevo Proveedor"}
                        </DialogTitle>
                        <DialogContent>
                            <TextField
                                label="Nombre"
                                fullWidth
                                margin="normal"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                label="Persona de Contacto"
                                fullWidth
                                margin="normal"
                                value={contactPerson}
                                onChange={(e) => setContactPerson(e.target.value)}
                            />
                            <TextField
                                label="Teléfono"
                                fullWidth
                                margin="normal"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <TextField
                                label="Email"
                                fullWidth
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                label="Dirección"
                                fullWidth
                                margin="normal"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
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
