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
    getUsers,
    createUser,
    updateUser,
    deleteUser,
} from "../services/api";

interface User {
    id: string;
    username: string;
    email: string;
    phone: string;
    role: string;
    createdAt: Date;
}

const xThemeComponents = {
    ...chartsCustomizations,
    ...dataGridCustomizations,
    ...datePickersCustomizations,
    ...treeViewCustomizations,
};

export default function Users(props: { disableCustomTheme?: boolean }) {
    const [users, setUsers] = useState<User[]>([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");

    const loadUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            console.error("No se pudo cargar los usuarios:", error);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleOpen = (user?: User) => {
        if (user) {
            setSelectedUser(user);
            setUserName(user.username);
            setEmail(user.email);
            setPhone(user.phone);
            setRole(user.role);
            setEditMode(true);
        } else {
            setSelectedUser(null);
            setUserName("");
            setEmail("");
            setPhone("");
            setRole("");
            setEditMode(false);
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setUserName("");
        setEmail("");
        setPhone("");
        setRole("");
        setSelectedUser(null);
        setEditMode(false);
    };

    const handleSave = async () => {
        try {
            if (editMode && selectedUser) {
                await updateUser(selectedUser.id, { username, email, phone, role });
            } else {
                await createUser({ username, email, phone, role });
            }
            loadUsers();
            handleClose();
        } catch (error: any) {
            console.error("Error al guardar usuario:", error.response?.data || error.message);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("¿Seguro que quieres eliminar este usuario?")) {
            try {
                await deleteUser(id);
                loadUsers();
            } catch (error) {
                console.error("No se pudo eliminar el usuario:", error);
            }
        }
    };

    const columns: GridColDef[] = [
        { field: "username", headerName: "Nombre", flex: 1 },
        { field: "email", headerName: "Correo Electrónico", flex: 1.5 },
        { field: "phone", headerName: "Teléfono", flex: 1 },
        { field: "role", headerName: "Rol", flex: 0.8 },
        {
            field: "createdAt",
            headerName: "Registrado",
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
                            <Typography variant="h4">Usuarios</Typography>
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
                                    Nuevo Usuario
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
                                rows={users}
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
                        <DialogTitle>{editMode ? "Editar Usuario" : "Nuevo Usuario"}</DialogTitle>
                        <DialogContent>
                            <TextField
                                label="Nombre"
                                fullWidth
                                margin="normal"
                                value={name}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <TextField
                                label="Correo Electrónico"
                                fullWidth
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                label="Teléfono"
                                fullWidth
                                margin="normal"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <TextField
                                label="Rol"
                                fullWidth
                                margin="normal"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
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
