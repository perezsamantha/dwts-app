import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
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
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
