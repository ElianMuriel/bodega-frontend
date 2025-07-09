import { Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText } from "@mui/material";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ListItemButton } from "@mui/material";

const drawerWidth = 240;

interface Props {
    children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
    const navigate = useNavigate();

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: 1300, ml: `${drawerWidth}px` }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Bodega de Cintas – Panel
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
                }}
            >
                <Toolbar />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate("/")}>
                            <ListItemText primary="Inicio" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate("/dashboard")}>
                            <ListItemText primary="Productos" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
                {children}
            </Box>
        </Box>
    );
}
