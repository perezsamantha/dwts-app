import React from 'react';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';
import AccountHeader from '../components/Account/AccountHeader';

function Account() {
    localStorage.setItem('parentPath', window.location.pathname);
    
    return(
        <div>
            <AccountHeader />
            <BottomNavBar />
        </div>
    )
}

export default Account;