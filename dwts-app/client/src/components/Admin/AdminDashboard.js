import React, { useEffect, useState } from 'react';

import {
    AppBar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Stack,
    Toolbar,
    Typography,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

import Table from './Table';
import * as tableType from '../../constants/tableTypes';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as actionType from '../../constants/actionTypes';
import AdminLanding from './AdminLanding';

const drawerWidth = 180;

function AdminDashboard(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {}, []);

    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const [table, setTable] = useState(<AdminLanding />);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleComponent = (component, index) => {
        setSelectedIndex(index);
        setTable(component);
    };

    const handleLogout = () => {
        dispatch({ type: actionType.LOGOUT });
        navigate('/');
    };

    const types = [
        tableType.CELEB,
        tableType.PRO,
        tableType.SEASON,
        tableType.TEAM,
        tableType.EPISODE,
        tableType.DANCE,
        tableType.JUDGE,
        tableType.SCORE,
        tableType.DANCER,
        tableType.TOUR,
        tableType.TOURCAST,
        tableType.USER,
    ];

    const drawer = (
        <Box>
            <List>
                <ListItemButton
                    //selected={selectedIndex === 0}
                    onClick={() => handleComponent(<AdminLanding key={0} />, 0)}
                >
                    <ListItemText>Overview</ListItemText>
                </ListItemButton>

                <Divider />

                {types.map((type, index) => (
                    <ListItemButton
                        key={index}
                        //selected={selectedIndex === index + 1}
                        onClick={() =>
                            handleComponent(
                                <Table key={index + 1} type={type} />,
                                index + 1
                            )
                        }
                    >
                        {selectedIndex === index + 1 ? (
                            <ListItemText>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                >
                                    <Paper
                                        sx={{
                                            backgroundColor: 'primary.main',
                                            zIndex: 10,
                                            width: 4,
                                            height: 20,
                                            borderRadius: 0,
                                        }}
                                    />
                                    <Typography>{type}s</Typography>
                                </Stack>
                            </ListItemText>
                        ) : (
                            <ListItemText>{type}s</ListItemText>
                        )}
                    </ListItemButton>
                ))}
            </List>
            <Divider />
            <List>
                <ListItemButton onClick={() => navigate('/dashboard')}>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText>Home</ListItemText>
                </ListItemButton>
                <ListItemButton onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </ListItemButton>
            </List>
        </Box>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <Box>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                        borderBottomLeftRadius: 15,
                        borderBottomRightRadius: 15,
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Admin Dashboard
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                width: drawerWidth,
                                borderTopRightRadius: 15,
                                borderBottomRightRadius: 15,
                            },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                width: drawerWidth,
                                borderTopRightRadius: 15,
                                borderBottomRightRadius: 15,
                            },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                    }}
                >
                    <Toolbar />
                    {table}
                </Box>
            </Box>
        </Box>
    );
}

export default AdminDashboard;
