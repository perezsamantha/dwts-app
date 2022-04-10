import React, { useEffect, useState } from 'react';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import Account from './pages/Account';
import Landing from './pages/Landing/Landing';
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
import * as searchType from './constants/searchTypes';
import { CssBaseline, Paper, useMediaQuery } from '@mui/material';
import NotFound from './pages/NotFound';
import Overview from './pages/Overview';
import ForgotPassword from './pages/Landing/ForgotPassword';
import Verification from './pages/Landing/Verification';
import 'swiper/css/bundle';
import { fetchAuthData, logout } from './actions/auth';
import Activity from './pages/Activity';
import Progress from './components/shared/Progress';

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
    const user = useSelector((state) => state.auth.authData);
    const fetching = useSelector((state) => state.auth.fetching);
    const authError = useSelector((state) => state.errors.AUTHFETCH);
    if (window.location.pathname !== '/' && authError) {
        dispatch(logout(navigate));
    }
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

        dispatch(fetchAuthData());

        if (window.location.pathname !== '/' && authError) {
            dispatch(logout(navigate));
        }
    }, [dispatch, navigate, prefersDarkMode, authError]);

    const PrivateRoute = () => {
        return fetching ? (
            <Progress />
        ) : user.role === 'admin' ? (
            <Outlet />
        ) : (
            <Navigate to="/" />
        );
    };

    const handleDarkMode = (toggleDark) => {
        setToggleDark(toggleDark);
        localStorage.setItem('theme', toggleDark ? 'dark' : 'light');
    };

    let theme = createTheme({
        palette: {
            mode: toggleDark ? 'dark' : 'light',
        },
        typography: {
            fontFamily: [
                'Urbanist',
                'Roboto',
                'Helvetica Neue',
                'Arial',
                'sans-serif',
            ].join(','),
        },
    });

    theme = createTheme(theme, {
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
                        [theme.breakpoints.down('sm')]: {
                            minWidth: '50%',
                        },
                        [theme.breakpoints.up('sm')]: {
                            minWidth: '30%',
                        },
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        marginTop: 10,
                        marginBottom: 10,
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
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        // paddingLeft: 0,
                        // paddingRight: 0,
                        // paddingTop: 3,
                        // paddingBottom: 3,
                        padding: 4,
                    },
                },
            },
            MuiMenu: {
                styleOverrides: {
                    root: {
                        maxHeight: 48 * 4.5 + 8,
                    },
                },
            },
            MuiAutocomplete: {
                styleOverrides: {
                    root: {
                        display: 'inline-flex',
                        [theme.breakpoints.down('sm')]: {
                            width: '100%',
                        },
                        [theme.breakpoints.up('sm')]: {
                            width: '40%',
                            marginRight: 20,
                        },
                    },
                },
            },
        },
    });

    // #f5dc6c

    let lightTheme = createTheme({
        ...theme,
        palette: {
            mode: 'light',
            primary: {
                light: '#fff1b5',
                main: '#FAE27A',
                dark: '#DDBE35',
            },
            background: {
                default: 'rgb(249, 249, 249)',
                paper: 'rgb(249, 249, 249)',
            },
        },
        // typography: {
        //     allVariants: {
        //         textShadow: '2px 2px 5px rgba(255, 255, 255, 0.2)',
        //     },
        // },
    });

    let darkTheme = createTheme({
        ...theme,
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
                        <Route path="dashboard" element={<Dashboard />} />
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
                        <Route path="activity" element={<Activity />} />
                        <Route
                            path="account"
                            element={
                                <Account
                                    toggleDark={toggleDark}
                                    handleDarkMode={handleDarkMode}
                                />
                            }
                        />
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
                            path="fans/:username/*"
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
