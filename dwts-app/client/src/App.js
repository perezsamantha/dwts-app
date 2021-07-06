import React, { useState } from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import Favorites from './pages/Favorites';
import Search from './pages/Search';
import Account from './pages/Account';
import Landing from './pages/Landing';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
