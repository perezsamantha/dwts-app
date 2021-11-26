import React from 'react';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';

function Favorites() {
    localStorage.setItem('parentPath', window.location.pathname);
    
    return(
        <div>
            <h2>Overview/Stats Page</h2>
            <h3>Number of perfect scores per pro</h3>
            <h3>Number of finals per pro</h3>
            <h3>Number of wins per pro</h3>
            <h3>Highest first week scores</h3>
            <h3>Earliest perfect scores</h3>
            <BottomNavBar />
        </div>
    )
}

export default Favorites;