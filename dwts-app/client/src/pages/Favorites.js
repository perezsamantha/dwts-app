import React from 'react';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';

function Favorites() {
    localStorage.setItem('parentPath', window.location.pathname);
    
    return(
        <div>
            <h2>Favorites Page</h2>
            <BottomNavBar />
        </div>
    )
}

export default Favorites;