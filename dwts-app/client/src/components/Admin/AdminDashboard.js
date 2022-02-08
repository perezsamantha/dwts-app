import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useDispatch } from 'react-redux';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PeopleIcon from '@mui/icons-material/People';
import { ListItemButton, Switch } from '@mui/material';
import Table from './Table';
import * as tableType from '../../constants/tableTypes'; 

const drawerWidth = 180;

function AdminDashboard(props) {
    
    const dispatch = useDispatch();

    useEffect(() => {
        
    }, []);

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
                <ListItemButton onClick={() => handleComponent(<Table key={1} type={tableType.CELEB} />)}>
                    <ListItemText>
                        Celebs
                    </ListItemText>
                </ListItemButton>
                <ListItemButton onClick={() => handleComponent(<Table key={2} type={tableType.PRO} />)}>
                    <ListItemText>
                        Pros
                    </ListItemText>
                </ListItemButton>
                <ListItemButton onClick={() => handleComponent(<Table key={3} type={tableType.SEASON} />)}>
                    <ListItemText>
                        Seasons
                    </ListItemText>
                </ListItemButton>
                {/* Episodes nested list? */}
                <ListItemButton onClick={() => handleComponent(<Table key={4} type={tableType.EPISODE} />)}>
                    <ListItemText>
                        Episodes
                    </ListItemText>
                </ListItemButton>
                <ListItemButton onClick={() => handleComponent(<Table key={5} type={tableType.TEAM} />)}>
                    <ListItemText>
                        Teams
                    </ListItemText>
                </ListItemButton>
                <ListItemButton onClick={() => handleComponent(<Table key={6} type={tableType.DANCE} />)}>
                    <ListItemText>
                        Dances
                    </ListItemText>
                </ListItemButton>
                {/* Dancers nested list? */}
                <ListItemButton onClick={() => handleComponent(<Table key={7} type={tableType.JUDGE} />)}>
                    <ListItemText>
                        Judges
                    </ListItemText>
                </ListItemButton>
                <ListItemButton onClick={() => handleComponent(<Table key={8} type={tableType.SCORE} />)}>
                    <ListItemText>
                        Scores
                    </ListItemText>
                </ListItemButton>
                <ListItemButton onClick={() => handleComponent(<Table key={9} type={tableType.DANCER} />)}>
                    <ListItemText>
                        Dancers
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
    //background-color: lightgrey;
    height: 100vh;
`;

const Title = styled.h3`
    color: green;
`;

export default AdminDashboard;