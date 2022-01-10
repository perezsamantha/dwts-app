import React, { useState } from 'react';
//import './App.css';
import Dashboard from './pages/Dashboard';
import Favorites from './pages/Favorites';
import Search from './pages/Search';
import Account from './pages/Account';
import Landing from './pages/Landing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Individuals from './pages/Individuals';
import Admin from './pages/Admin';
import styled from 'styled-components';
//import { AnimatePresence } from 'framer-motion';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function App(props) {
  const [toggleDark, setToggleDark] = useState(false);


  const muiTheme = createTheme({
    palette: {
      mode: toggleDark ? 'dark' : 'light',
      primary: {
        main: '#f5dc6c'
      },
      secondary: {
        main: '#6cf5c3'
      },
      // text: {
      //   primary: '',
      //   secondary: ''
      // }
    },
    typography: {
      fontFamily: [
        'Urbanist',
        'Helvetica Neue',
        'Arial',
        'sans-serif'
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
        }
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            boxShadow: toggleDark ? '1px 1px 1px dimgrey' : "1px 65px 5px gainsboro",
            //backgroundColor: toggleDark ? 'rgb(39, 39, 39)' : 'rgba(241, 220, 125, 0.2)',
          }
        }
      }
    }
  })
  //const [token, setToken] = useState();

  //if(!token) {
  //return <Login setToken={setToken} />
  //}

  //const location = useLocation();

  return (
    <ThemeProvider theme={muiTheme}>
      <BrowserRouter>
        <Container>
          <Routes >
            <Route exact path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/search/dances" element={<Search />} />
            <Route path="/search/teams" element={<Search />} />
            <Route path="/search/pros" element={<Search />} />
            <Route path="/search/fans" element={<Search />} />
            <Route path="/account" element={<Account />} />
            <Route path="/admin" element={<Admin toggleDark={toggleDark} setToggleDark={setToggleDark} />} />
            {/* eventually move function to account */}
            <Route exact path="/teams/:id/*" element={<Individuals />} />
            <Route exact path="/pros/:id/*" element={<Individuals />} />
            <Route exact path="/fans/:id/*" element={<Individuals />} />
            <Route exact path="/dances/:id/*" element={<Individuals />} />
            {/* <Redirect from="/search" to="/search/dances" /> */}
            <Route path="*" element={<div>Not found</div>} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const Container = styled.div`
  //background-color: rgb(18, 18, 18);
`;

export default App;
