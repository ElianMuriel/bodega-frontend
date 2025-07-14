import { Box, CssBaseline, Toolbar, Drawer, List, ListItem, ListItemText } from "@mui/material";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ListItemButton } from "@mui/material";
import { SitemarkIcon } from "./SitemarkIcon";

const drawerWidth = 240;

interface Props {
    children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
    const navigate = useNavigate();

    return (
        <Box sx={{ display: "listitem" }}>
            <CssBaseline />
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
                }}
            >
                <Toolbar />
                <List>
                    <SitemarkIcon />
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate("/")}>
                            <ListItemText primary="Inicio" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate("/products")}>
                            <ListItemText primary="Productos" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate("/categories")}>
                            <ListItemText primary="Categorias" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate("/products")}>
                            <ListItemText primary="Ventas" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate("/products")}>
                            <ListItemText primary="Usuarios" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 4, mt: 10 }}>
                {children}
            </Box>
        </Box>
    );
}
