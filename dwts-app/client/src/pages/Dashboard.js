import React from 'react';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';

function Dashboard() {
    localStorage.setItem('parentPath', window.location.pathname);
    
    return(
        <div>
            <h2>Home Page</h2>
            <BottomNavBar />
        </div>
    )
}

export default Dashboard;