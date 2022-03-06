import React from 'react';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';
import AccountHeader from '../components/Account/AccountHeader';
import { MainContainer, Page } from '../components/shared/muiStyles';

function Account() {
    localStorage.setItem('parentPath', window.location.pathname);

    return (
        <Page>
            <MainContainer>
                <AccountHeader />
            </MainContainer>
            <BottomNavBar />
        </Page>
    );
}

export default Account;
