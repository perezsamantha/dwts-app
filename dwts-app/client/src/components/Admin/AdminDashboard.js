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
    Switch,
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

    const drawer = (
        <Box>
            <Divider />
            <List>
                <ListItemButton
                    selected={selectedIndex === 0}
                    onClick={() => handleComponent(<AdminLanding key={0} />, 0)}
                >
                    <ListItemText>Admin Dashboard</ListItemText>
                </ListItemButton>

                <Divider />

                <ListItemButton
                    selected={selectedIndex === 1}
                    onClick={() =>
                        handleComponent(
                            <Table key={1} type={tableType.CELEB} />,
                            1
                        )
                    }
                >
                    <ListItemText>Celebs</ListItemText>
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 2}
                    onClick={() =>
                        handleComponent(
                            <Table key={2} type={tableType.PRO} />,
                            2
                        )
                    }
                >
                    <ListItemText>Pros</ListItemText>
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 3}
                    onClick={() =>
                        handleComponent(
                            <Table key={3} type={tableType.SEASON} />,
                            3
                        )
                    }
                >
                    <ListItemText>Seasons</ListItemText>
                </ListItemButton>
                {/* Episodes nested list? */}
                <ListItemButton
                    selected={selectedIndex === 4}
                    onClick={() =>
                        handleComponent(
                            <Table key={4} type={tableType.EPISODE} />,
                            4
                        )
                    }
                >
                    <ListItemText>Episodes</ListItemText>
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 5}
                    onClick={() =>
                        handleComponent(
                            <Table key={5} type={tableType.TEAM} />,
                            5
                        )
                    }
                >
                    <ListItemText>Teams</ListItemText>
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 6}
                    onClick={() =>
                        handleComponent(
                            <Table key={6} type={tableType.DANCE} />,
                            6
                        )
                    }
                >
                    <ListItemText>Dances</ListItemText>
                </ListItemButton>
                {/* Dancers nested list? */}
                <ListItemButton
                    selected={selectedIndex === 7}
                    onClick={() =>
                        handleComponent(
                            <Table key={7} type={tableType.JUDGE} />,
                            7
                        )
                    }
                >
                    <ListItemText>Judges</ListItemText>
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 8}
                    onClick={() =>
                        handleComponent(
                            <Table key={8} type={tableType.SCORE} />,
                            8
                        )
                    }
                >
                    <ListItemText>Scores</ListItemText>
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 9}
                    onClick={() =>
                        handleComponent(
                            <Table key={9} type={tableType.DANCER} />,
                            9
                        )
                    }
                >
                    <ListItemText>Dancers</ListItemText>
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 10}
                    onClick={() =>
                        handleComponent(
                            <Table key={10} type={tableType.USER} />,
                            10
                        )
                    }
                >
                    <ListItemText>Users</ListItemText>
                </ListItemButton>
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
                            Statistics & Tables
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                width: drawerWidth,
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
                    {/* <Typography paragraph>
                        Teams table bla bla bla
                    </Typography> */}
                    {table}
                </Box>
            </Box>
        </Box>
    );
}

export default AdminDashboard;
