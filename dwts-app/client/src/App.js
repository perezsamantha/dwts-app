import React, { useState } from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import Favorites from './pages/Favorites';
import Search from './pages/Search';
import Account from './pages/Account';
import Landing from './pages/Landing';
import { BrowserRouter, Redirect, Route, Switch, useLocation } from 'react-router-dom';
import Individuals from './pages/Individuals';
import { AnimatePresence } from 'framer-motion';

function App(props) {
  //const [token, setToken] = useState();

  //if(!token) {
    //return <Login setToken={setToken} />
  //}

  //const location = useLocation();

  return (
      <BrowserRouter>
        <Switch >
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/favorites">
            <Favorites />
          </Route>
          <Route path="/search/dances">
            <Search  />
          </Route>
          <Route path="/search/cast">
            <Search  />
          </Route>
          <Route path="/search/pros">
            <Search  />
          </Route>
          <Route path="/search/fans">
            <Search  />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
          <Route exact path="/teams/:id">
            <Individuals />
          </Route>
          <Redirect from="/search" to="/search/dances" />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
