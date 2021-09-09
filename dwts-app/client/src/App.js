import React from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import Favorites from './pages/Favorites';
import Search from './pages/Search';
import Account from './pages/Account';
import Landing from './pages/Landing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Individuals from './pages/Individuals';
//import { AnimatePresence } from 'framer-motion';

function App(props) {
  //const [token, setToken] = useState();

  //if(!token) {
  //return <Login setToken={setToken} />
  //}

  //const location = useLocation();

  return (
    <BrowserRouter>
      <div>
        <Routes >
          <Route exact path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/search/dances" element={<Search />} />
          <Route path="/search/teams" element={<Search />} />
          <Route path="/search/pros" element={<Search />} />
          <Route path="/search/fans" element={<Search />} />
          <Route path="/account" element={<Account />} />
          <Route exact path="/teams/:id/*" element={<Individuals />} />
          <Route exact path="/pros/:id/*" element={<Individuals />} />
          {/* <Redirect from="/search" to="/search/dances" /> */}
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
