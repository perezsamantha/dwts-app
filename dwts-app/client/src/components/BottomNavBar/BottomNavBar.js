import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import styled from '@emotion/styled';

import { FiSearch, FiBarChart2 } from 'react-icons/fi';
import { AiOutlineUser } from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { BsStars } from 'react-icons/bs';

function BottomNavBar() {
    const pathname = localStorage.getItem('parentPath');
    const [value, setValue] = useState(pathname?.split('/')[1]);

    if (
        value !== 'dashboard' &&
        value !== 'overview' &&
        value !== 'search' &&
        value !== 'account' &&
        value !== 'notifications'
    ) {
        setValue('home');
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <NavBarContainer elevation={4}>
            <BottomNavigation
                value={value}
                onChange={handleChange}
                sx={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
            >
                <BottomNavigationAction
                    component={Link}
                    to="/dashboard"
                    value="dashboard"
                    icon={<CustomHomeIcon />}
                />
                <BottomNavigationAction
                    component={Link}
                    to="/overview"
                    value="overview"
                    icon={<CustomOverviewIcon />}
                />
                <BottomNavigationAction
                    component={Link}
                    to="/search/dances"
                    value="search"
                    icon={
                        <CustomSearch>
                            <CustomSearchIcon />
                        </CustomSearch>
                    }
                />
                <BottomNavigationAction
                    component={Link}
                    to="/notifications"
                    value="notifications"
                    icon={<CustonNotificationsIcon />}
                />
                <BottomNavigationAction
                    component={Link}
                    to="/account"
                    value="account"
                    icon={<CustomAccountIcon />}
                />
            </BottomNavigation>
        </NavBarContainer>
    );
}

const NavBarContainer = styled(Paper)({
    bottom: 0,
    position: 'fixed',
    width: '100%',
    zIndex: 10,
    //padding: 5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
});

const CustomSearch = styled(Paper)(({ theme }) => ({
    width: 50,
    height: 50,
    marginTop: -50,
    borderRadius: '50%',
    backgroundColor:
        theme.palette.mode === 'dark'
            ? theme.palette.primary.dark
            : theme.palette.primary.main,
    boxShadow: `0 5px 15px ${theme.palette.primary.main}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

const CustomSearchIcon = styled(FiSearch)(({ theme }) => ({
    width: 30,
    height: 30,
    color: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'white',
}));

const CustomHomeIcon = styled(BsStars)({
    width: 25,
    height: 25,
    marginTop: -5,
});

const CustomOverviewIcon = styled(FiBarChart2)({
    width: 25,
    height: 25,
    marginTop: -5,
});

const CustonNotificationsIcon = styled(IoMdNotificationsOutline)({
    width: 25,
    height: 25,
    marginTop: -5,
});

const CustomAccountIcon = styled(AiOutlineUser)({
    width: 25,
    height: 25,
    marginTop: -5,
});

export default BottomNavBar;
