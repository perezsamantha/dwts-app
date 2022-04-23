import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import Account from './pages/Account';
import Landing from './pages/Landing/Landing';
import Individuals from './pages/Individuals';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import Overview from './pages/Overview';
import ResetPassword from './pages/Landing/ResetPassword';
import Verification from './pages/Landing/Verification';
import Activity from './pages/Activity';
import {
    ThemeProvider,
    createTheme,
    responsiveFontSizes,
} from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import * as searchType from './constants/searchTypes';
import { CssBaseline, Paper, useMediaQuery } from '@mui/material';
import 'swiper/css/bundle';
import { fetchInitialAuthData, logout } from './actions/auth';
import Progress from './components/shared/Progress';
import { styled } from '@mui/system';

function App() {
    const navigate = useNavigate();
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark');
    const [toggleDark, setToggleDark] = useState(
        localStorage.getItem('theme')
            ? localStorage.getItem('theme') === 'dark'
            : prefersDarkMode
            ? true
            : false
    );

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.initialAuth);
    const fetching = useSelector((state) => state.auth.initialFetching);
    const page = window.location.pathname.split('/')[1];

    useEffect(() => {
        setToggleDark(
            localStorage.getItem('theme')
                ? localStorage.getItem('theme') === 'dark'
                : prefersDarkMode
                ? true
                : false
        );

        if (page === 'verify' || page === 'reset') {
            return;
        } else if (fetching) {
            dispatch(fetchInitialAuthData());
        }
    }, [fetching, prefersDarkMode, page, dispatch]);

    const AuthRoute = () => {
        if (page === 'verify' || page === 'reset') {
            return <Outlet />;
        }

        if (fetching) {
            return <Progress />;
        } else if (Object.keys(user).includes('id')) {
            if (window.location.pathname === '/') {
                return <Navigate to="/dashboard" />;
            } else {
                return <Outlet />;
            }
        } else {
            if (window.location.pathname === '/') {
                return <Outlet />;
            } else {
                dispatch(logout(navigate));
                return <Navigate to="/" />;
            }
        }
    };

    const PrivateRoute = () => {
        return fetching ? (
            <Progress />
        ) : Array.of('admin', 'moderator', 'pro').includes(user.role) ? (
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
        shape: {
            borderRadius: 10,
        },
        palette: {
            mode: toggleDark ? 'dark' : 'light',
        },
        typography: {
            fontFamily: [
                'Urbanist',
                'Roboto',
                'Helvetica Neue',
                'Just Another Hand',
                'Arial',
                'sans-serif',
            ].join(','),
        },
    });

    theme = createTheme(theme, {
        components: {
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
            MuiBottomNavigationAction: {
                styleOverrides: {
                    root: {
                        // '&.Mui-selected': {
                        //     color: 'inherit',
                        // },
                        '&.MuiButtonBase-root': {
                            paddingTop: 10,
                        },
                    },
                },
            },
            MuiButton: {
                defaultProps: {
                    disableRipple: true,
                    color: 'inherit',
                },
                styleOverrides: {
                    root: {
                        borderRadius: 20,
                        minWidth: 0,
                        height: 'fit-content',
                    },
                },
            },
            MuiButtonBase: {
                defaultProps: {
                    disableRipple: true,
                },
            },
            MuiCard: {
                defaultProps: {
                    elevation: 3,
                },
                styleOverrides: {
                    root: {
                        padding: 15,
                        borderRadius: 15,
                        marginTop: 15,
                        marginBottom: 15,
                    },
                },
            },
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        scrollbarColor: 'transparent darkgrey',
                        '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                            backgroundColor: 'inherit',
                            [theme.breakpoints.down('sm')]: {
                                width: 3,
                                height: 0,
                            },
                            [theme.breakpoints.up('sm')]: {
                                width: 5,
                                height: 6,
                            },
                        },
                        '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb':
                            {
                                borderRadius: 10,
                                backgroundColor: 'darkgrey',
                            },
                    },
                },
            },
            // MuiDialog: {
            //     defaultProps: {
            //         PaperProps: {
            //             style: { borderRadius: 10 },
            //         },
            //     },
            // },
            MuiDivider: {
                styleOverrides: {
                    root: {
                        marginTop: 10,
                        marginBottom: 10,
                    },
                },
            },
            MuiFormControl: {
                styleOverrides: {
                    root: {
                        marginTop: 5,
                        marginBottom: 5,
                    },
                },
            },
            MuiFormLabel: {
                styleOverrides: {
                    root: {
                        '&.Mui-focused': {
                            color: 'inherit',
                        },
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
            MuiMenu: {
                styleOverrides: {
                    root: {
                        maxHeight: 48 * 4.5 + 8,
                    },
                },
            },
            // MuiOutlinedInput: {
            //     styleOverrides: {
            //         root: {
            //             margin: 5,
            //         },
            //     },
            // },
            // MuiStack: {
            //     defaultProps: {
            //         spacing: 1,
            //         alignItems: 'center',
            //     },
            // },
            MuiSelect: {
                styleOverrides: {
                    root: {
                        marginTop: 5,
                        marginBottom: 5,
                    },
                },
            },
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        padding: 4,
                    },
                },
            },
            MuiTab: {
                styleOverrides: {
                    root: {
                        '&.Mui-selected': {
                            color: 'inherit',
                        },
                    },
                },
            },
            MuiTabs: {
                styleOverrides: {
                    indicator: {
                        height: 4,
                        borderRadius: 2,
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& > *': {
                            margin: 5,
                        },
                        //margin: '0',
                        [theme.breakpoints.down('sm')]: {
                            minWidth: '50%',
                        },
                        [theme.breakpoints.up('sm')]: {
                            minWidth: '30%',
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
                light: '#fbedab',
                main: '#fde88c',
                dark: '#f1d453',
            },
            secondary: {
                light: '#b0bec5',
                main: '#607d8b',
                dark: '#455a64',
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
                main: '#fbe47e',
                dark: '#e7ca49',
            },
            secondary: {
                light: '#b0bec5',
                main: '#607d8b',
                dark: '#455a64',
            },
        },
    });

    const muiTheme = responsiveFontSizes(toggleDark ? darkTheme : lightTheme);

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <AppContainer>
                <Routes>
                    <Route exact path="" element={<AuthRoute />}>
                        <Route exact path="/">
                            <Route path="" element={<Landing />} />
                            <Route
                                path="reset/:token"
                                element={<ResetPassword />}
                            />
                            <Route
                                path="verify/:token"
                                element={<Verification />}
                            />
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
                                    element={
                                        <Search type={searchType.DANCES} />
                                    }
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
                        </Route>
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AppContainer>
        </ThemeProvider>
    );
}

const AppContainer = styled(Paper)`
    min-height: 100vh;
`;

export default App;
