import React, { useState } from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import Favorites from './pages/Favorites';
import Search from './pages/Search';
import Account from './pages/Account';
import Landing from './pages/Landing';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

function App() {
  //const [token, setToken] = useState();

  //if(!token) {
    //return <Login setToken={setToken} />
  //}

  return (
    <div >
      <BrowserRouter>
        <Switch>
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
            <Search value={1} />
          </Route>
          <Route path="/search/cast">
            <Search value={2} />
          </Route>
          <Route path="/search/fans">
            <Search value={3} />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
          <Redirect from="/search" to="/search/dances" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
