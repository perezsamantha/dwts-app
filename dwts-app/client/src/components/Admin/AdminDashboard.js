import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DataGrid } from '@mui/x-data-grid';

import { useDispatch, useSelector } from 'react-redux';
import { fetchTeams } from '../../actions/teams';

import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PeopleIcon from '@mui/icons-material/People';
import { ListItemButton, Switch } from '@mui/material';
import TeamsTable from './TeamsTable';
import { Link } from 'react-router-dom';
import CelebsTable from './CelebsTable';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'celeb_id', headerName: 'Celeb', width: 70 },
    { field: 'pro_id', headerName: 'Pro', width: 70 },
    { field: 'mentor_id', headerName: 'Mentor', width: 70 },
    { field: 'season_id', headerName: 'Season', width: 70 },
    { field: 'placement', headerName: 'Placement', width: 80 },
    { field: 'team_name', headerName: 'Team Name', width: 130 },
    { field: 'extra', headerName: 'Extra', width: 130 },
    // {
    //     field: 'age',
    //     headerName: 'Age',
    //     type: 'number',
    //     width: 90,
    // },
    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params) =>
    //         `${params.getValue(params.id, 'firstName') || ''} ${params.getValue(params.id, 'lastName') || ''
    //         }`,
    // },
];

const drawerWidth = 180;

function AdminDashboard(props) {
    
    const dispatch = useDispatch();
    const teams = useSelector(state => state.teams.teams);

    useEffect(() => {
        dispatch(fetchTeams());
    }, [dispatch]);

    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const [table, setTable] = useState(null);

    const handleComponent = (c) => {
        setTable(c);
    }

    const setToggleDark = props.setToggleDark;
    const toggleDark = props.toggleDark;

    const handleMode = () => {
        setToggleDark(!toggleDark);
    }

    const drawer = (
        <DrawerContainer>
            <Divider />
            <List>
                <ListItemButton>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText>
                        Dashboard
                    </ListItemText>
                </ListItemButton>
                <ListItemButton onClick={() => handleComponent(<CelebsTable />)}>
                    <ListItemText>
                        Celebs
                    </ListItemText>
                </ListItemButton>
                <ListItemButton onClick={() => handleComponent()}>
                    <ListItemText>
                        Pros
                    </ListItemText>
                </ListItemButton>
                <ListItemButton onClick={() => handleComponent(<TeamsTable />)}>
                    <ListItemText>
                        Teams
                    </ListItemText>
                </ListItemButton>
                <ListItemButton onClick={() => handleComponent()}>
                    <ListItemText>
                        Dances
                    </ListItemText>
                </ListItemButton>
                {/* Dancers nested list? */}
                <ListItemButton onClick={() => handleComponent()}>
                    <ListItemText>
                        Judges
                    </ListItemText>
                </ListItemButton>
                <ListItemButton onClick={() => handleComponent()}>
                    <ListItemText>
                        Scores
                    </ListItemText>
                </ListItemButton>
                <ListItemButton onClick={() => handleComponent()}>
                    <ListItemText>
                        Seasons
                    </ListItemText>
                </ListItemButton>
                {/* Episodes nested list? */}
                <ListItemButton onClick={() => handleComponent()}>
                    <ListItemText>
                        Users
                    </ListItemText>
                </ListItemButton>
            </List>
            <Divider />
            <List>
                {['Home', 'Logout'].map((text, index) => (
                    <ListItemButton key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon color="secondary" />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                ))}
            </List>
        </DrawerContainer>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Container>
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
                        <Switch checked={toggleDark} onChange={handleMode} />
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
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                    <Toolbar />
                    {/* <Typography paragraph>
                        Teams table bla bla bla
                    </Typography> */}
                    {table}
                </Box>
            </Box>
        </Container>
    )
}

const Container = styled.div`
    //background-color: black;
    display: flex;
    flex-direction: column;
`;

const DrawerContainer = styled.div`
    //background-color: black;
    height: 100vh;
`;

const Title = styled.h3`
    color: green;
`;

export default AdminDashboard;