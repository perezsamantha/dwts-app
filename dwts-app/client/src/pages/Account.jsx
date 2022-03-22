import React from 'react';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';
import AccountHeader from '../components/Account/AccountHeader';
import { MainContainer, Page } from '../components/shared/muiStyles';

function Account(props) {
    localStorage.setItem('parentPath', window.location.pathname);

    return (
        <Page>
            <MainContainer>
                <AccountHeader
                    toggleDark={props.toggleDark}
                    handleDarkMode={props.handleDarkMode}
                />
            </MainContainer>
            <BottomNavBar />
        </Page>
    );
}

export default Account;
