import React, { useEffect, useState } from 'react';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import Account from './pages/Account';
import Landing from './pages/Landing';
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Individuals from './pages/Individuals';
import Admin from './pages/Admin';
import styled from 'styled-components';
//import { AnimatePresence } from 'framer-motion';
import {
    ThemeProvider,
    createTheme,
    responsiveFontSizes,
} from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import * as actionType from './constants/actionTypes';
import * as searchType from './constants/searchTypes';
import decode from 'jwt-decode';
import { CssBaseline, Paper, useMediaQuery } from '@mui/material';
import NotFound from './pages/NotFound';
import Overview from './pages/Overview';
import 'swiper/css/bundle';
import ForgotPassword from './pages/Landing/ForgotPassword';
import Verification from './pages/Landing/Verification';

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

        if (window.location.pathname.split('/')[1] === 'verify') {
            return;
        }

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

    const PrivateRoute = () => {
        const role = useSelector(
            (state) => state.auth?.authData?.result?.user_role
        );

        return role === 'admin' ? <Outlet /> : <Navigate to="/" />;
    };

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
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        scrollbarColor: 'transparent darkgrey',
                        '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                            backgroundColor: 'transparent',
                            width: 5,
                            height: 6,
                        },
                        '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb':
                            {
                                borderRadius: 10,
                                backgroundColor: 'darkgrey',
                            },
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        //padding: 15,
                        //borderRadius: 15,
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        padding: 15,
                        borderRadius: 15,
                        marginTop: 15,
                        marginBottom: 15,
                    },
                },
            },
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
            MuiButtonBase: {
                defaultProps: {
                    disableRipple: true,
                },
            },
            MuiButton: {
                defaultProps: {
                    disableRipple: true,
                },
                styleOverrides: {
                    root: {
                        borderRadius: 20,
                    },
                },
            },
            MuiDivider: {
                styleOverrides: {
                    root: {
                        //margin: 'auto',
                        //width: '95%',
                        marginTop: 10,
                        marginBottom: 10,
                    },
                },
            },
            MuiListItemButton: {
                styleOverrides: {
                    root: {
                        '&.Mui-selected': {
                            background: 'transparent',
                        },
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
            <CssBaseline />
            <AppContainer>
                <Routes>
                    <Route exact path="/">
                        <Route path="" element={<Landing />} />
                        {/* following 2 need to bypass jwt check */}
                        <Route
                            path="forgot-password"
                            element={<ForgotPassword />}
                        />
                        <Route path="verify/:id" element={<Verification />} />
                        <Route
                            path="dashboard"
                            element={
                                <Dashboard
                                    toggleDark={toggleDark}
                                    handleDarkMode={handleDarkMode}
                                />
                            }
                        />
                        <Route path="overview" element={<Overview />} />
                        <Route exact path="search">
                            <Route
                                path=""
                                element={
                                    <Navigate to="/search/dances" replace />
                                }
                            />
                            <Route
                                path="dances"
                                element={<Search type={searchType.DANCES} />}
                            />
                            <Route
                                path="teams"
                                element={<Search type={searchType.TEAMS} />}
                            />
                            <Route
                                exact
                                path="pros"
                                element={<Search type={searchType.PROS} />}
                            />
                            <Route
                                path="fans"
                                element={<Search type={searchType.FANS} />}
                            />
                        </Route>
                        <Route path="account" element={<Account />} />
                        <Route path="admin" element={<PrivateRoute />}>
                            <Route path="" element={<Admin />} />
                        </Route>
                        {/* eventually move function to account */}
                        <Route
                            exact
                            path="teams/:id/*"
                            element={<Individuals />}
                        />
                        <Route
                            exact
                            path="pros/:id/*"
                            element={<Individuals />}
                        />
                        <Route
                            exact
                            path="fans/:id/*"
                            element={<Individuals />}
                        />
                        <Route
                            exact
                            path="dances/:id/*"
                            element={<Individuals />}
                        />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </AppContainer>
        </ThemeProvider>
    );
}

const AppContainer = styled(Paper)`
    min-height: 100vh;
`;

export default App;
