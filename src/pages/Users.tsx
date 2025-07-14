import type { } from '@mui/x-date-pickers/themeAugmentation';
import type { } from '@mui/x-charts/themeAugmentation';
import type { } from '@mui/x-data-grid-pro/themeAugmentation';
import type { } from '@mui/x-tree-view/themeAugmentation';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import AppNavbar from '../components/AppNavbar';
import ColorModeIconDropdown from '.././theme/ColorModeIconDropdown';
import SideMenu from '../components/SideMenu';
import AppTheme from '../theme/AppTheme';
import {
    chartsCustomizations,
    dataGridCustomizations,
    datePickersCustomizations,
    treeViewCustomizations,
} from '../theme/customizations';
import dayjs from 'dayjs';

const xThemeComponents = {
    ...chartsCustomizations,
    ...dataGridCustomizations,
    ...datePickersCustomizations,
    ...treeViewCustomizations,
};

type Customer = {
    id: string;
    name: string;
    email: string;
    contacto: string;
    rol: string;
    createdAt: Date;
};

const customers: Customer[] = [
    {
        id: 'USR-010',
        name: 'Alcides Antonio',
        email: 'alcides.antonio@devias.io',
        contacto: '908-691-3242',
        rol: 'cliente',
        createdAt: dayjs().subtract(2, 'hours').toDate(),
    },
    // ...otros clientes
];

const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1.5 },
    { field: 'contacto', headerName: 'Contacto', flex: 1 },
    { field: 'rol', headerName: 'Rol', flex: 0.8 },
    {
        field: 'createdAt',
        headerName: 'Registrado',
        flex: 1,
        valueFormatter: (params: { value: Date }) =>
            dayjs(params.value).format('MMM DD, YYYY'),
    },
];

export default function Users(props: { disableCustomTheme?: boolean }) {
    return (
        <AppTheme {...props} themeComponents={xThemeComponents}>
            <CssBaseline enableColorScheme />
            <Box sx={{ display: 'flex' }}>
                <SideMenu />
                <AppNavbar />
                {/* Main content */}
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
                        {/* Header */}
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
                                    startIcon={<UploadIcon />}
                                    variant="outlined"
                                >
                                    Import
                                </Button>
                                <Button
                                    color="inherit"
                                    startIcon={<DownloadIcon />}
                                    variant="outlined"
                                >
                                    Export
                                </Button>
                                <Button
                                    startIcon={<AddIcon />}
                                    variant="contained"
                                    color="primary"
                                >
                                    Add
                                </Button>
                                <ColorModeIconDropdown />
                            </Stack>
                        </Stack>

                        {/* Search bar */}
                        <TextField
                            fullWidth
                            placeholder="Buscar usuario"
                            variant="outlined"
                        />

                        {/* DataGrid */}
                        <Box
                            sx={{
                                height: { xs: 400, md: 500 },
                                width: '100%',
                                bgcolor: 'background.paper',
                                borderRadius: 2,
                            }}
                        >
                            <DataGrid
                                rows={customers}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { pageSize: 5, page: 0 },
                                    },
                                }}
                                pageSizeOptions={[5, 10, 25]}
                                disableRowSelectionOnClick
                                getRowId={(row) => row.id}
                            />
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </AppTheme>
    );
}
