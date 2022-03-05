import React, { useEffect, useState } from 'react';
//import './App.css';
import Dashboard from './pages/Dashboard';
import Favorites from './pages/Favorites';
import Search from './pages/Search';
import Account from './pages/Account';
import Landing from './pages/Landing';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Individuals from './pages/Individuals';
import Admin from './pages/Admin';
import styled from 'styled-components';
//import { AnimatePresence } from 'framer-motion';
import {
    ThemeProvider,
    createTheme,
    responsiveFontSizes,
} from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import * as actionType from './constants/actionTypes';
import decode from 'jwt-decode';
import { Paper, useMediaQuery } from '@mui/material';

function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark');
    const [toggleDark, setToggleDark] = useState(
        localStorage.getItem('theme')
            ? localStorage.getItem('theme') === 'dark'
            : prefersDarkMode
            ? true
            : false
    );

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setToggleDark(
            localStorage.getItem('theme')
                ? localStorage.getItem('theme') === 'dark'
                : prefersDarkMode
                ? true
                : false
        );
        const user = JSON.parse(localStorage.getItem('profile'));

        if (user === null) {
            dispatch({ type: actionType.LOGOUT });
            navigate('/');
        }

        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
            // need to test functionality
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                dispatch({ type: actionType.LOGOUT });
                navigate('/');
            }
        }
    }, [dispatch, navigate, prefersDarkMode]);

    const handleDarkMode = (toggleDark) => {
        setToggleDark(toggleDark);
        localStorage.setItem('theme', toggleDark ? 'dark' : 'light');
    };

    let baseTheme = createTheme({
        palette: {
            mode: toggleDark ? 'dark' : 'light',
        },
        typography: {
            fontFamily: [
                'Urbanist',
                'Helvetica Neue',
                'Arial',
                'sans-serif',
            ].join(','),
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& > *': {
                            margin: '10px',
                        },
                        margin: '0',
                        width: '50%',
                    },
                },
            },
            MuiTabs: {
                styleOverrides: {
                    indicator: {
                        height: 4,
                        borderRadius: 1,
                    },
                },
            },
            MuiButton: {
                defaultProps: {
                    disableRipple: true,
                },
            },
            MuiDivider: {
                styleOverrides: {
                    root: {
                        margin: 'auto',
                        width: '95%',
                    },
                },
            },
        },
    });

    // #f5dc6c

    let lightTheme = createTheme({
        ...baseTheme,
        palette: {
            mode: 'light',
            primary: {
                light: '#fff1b5',
                main: '#FAE27A',
                dark: '#DDBE35',
            },
        },
    });

    let darkTheme = createTheme({
        ...baseTheme,
        palette: {
            mode: 'dark',
            primary: {
                light: '#fff1b5',
                main: '#FCE689',
                dark: '#F6DD6E',
            },
        },
    });

    const muiTheme = responsiveFontSizes(toggleDark ? darkTheme : lightTheme);

    return (
        <ThemeProvider theme={muiTheme}>
            <Container>
                <Routes>
                    <Route exact path="/" element={<Landing />} />
                    <Route
                        path="/dashboard"
                        element={
                            <Dashboard
                                toggleDark={toggleDark}
                                handleDarkMode={handleDarkMode}
                            />
                        }
                    />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/search/dances" element={<Search />} />
                    <Route path="/search/teams" element={<Search />} />
                    <Route path="/search/pros" element={<Search />} />
                    <Route path="/search/fans" element={<Search />} />
                    <Route path="/account" element={<Account />} />
                    <Route
                        path="/admin"
                        element={
                            <Admin
                                toggleDark={toggleDark}
                                setToggleDark={setToggleDark}
                            />
                        }
                    />
                    {/* eventually move function to account */}
                    <Route
                        exact
                        path="/teams/:id/*"
                        element={<Individuals />}
                    />
                    <Route exact path="/pros/:id/*" element={<Individuals />} />
                    <Route exact path="/fans/:id/*" element={<Individuals />} />
                    <Route
                        exact
                        path="/dances/:id/*"
                        element={<Individuals />}
                    />
                    {/* <Redirect from="/search" to="/search/dances" /> */}
                    <Route path="*" element={<div>Not found</div>} />
                </Routes>
            </Container>
        </ThemeProvider>
    );
}

const Container = styled(Paper)`
    height: 100vh;
`;

export default App;
