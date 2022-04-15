import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Paper,
} from '@mui/material';
import styled from '@emotion/styled';
import { FiSearch, FiBarChart2, FiActivity } from 'react-icons/fi';
import { AiOutlineUser } from 'react-icons/ai';
import { BsStars } from 'react-icons/bs';
import { motion } from 'framer-motion';

const iconVal = 25;

function BottomNavBar() {
    const pathname = localStorage.getItem('parentPath');
    const [value, setValue] = useState(pathname?.split('/')[1]);

    if (
        value !== 'dashboard' &&
        value !== 'overview' &&
        value !== 'search' &&
        value !== 'account' &&
        value !== 'activity'
    ) {
        setValue('home');
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <NavBarContainer elevation={4}>
            <BottomNavigation value={value} onChange={handleChange}>
                <BottomNavigationAction
                    component={Link}
                    label={null}
                    to="/dashboard"
                    value="dashboard"
                    icon={
                        <MotionBox
                            component={motion.div}
                            whileHover={{
                                scale: 1.25,
                                transition: { duration: 0.3 },
                            }}
                            whileTap={{
                                scale: 1.3,
                                transition: { duration: 0.3 },
                            }}
                        >
                            <CustomHomeIcon />
                        </MotionBox>
                    }
                />
                <BottomNavigationAction
                    component={Link}
                    to="/overview"
                    value="overview"
                    icon={
                        <MotionBox
                            component={motion.div}
                            whileHover={{
                                scale: 1.25,
                                transition: { duration: 0.3 },
                            }}
                            whileTap={{
                                scale: 1.3,
                                transition: { duration: 0.3 },
                            }}
                        >
                            <CustomOverviewIcon />
                        </MotionBox>
                    }
                />
                <BottomNavigationAction
                    component={Link}
                    to="/search/dances"
                    value="search"
                    icon={
                        <MotionBox
                            component={motion.div}
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.3 },
                            }}
                            whileTap={{
                                scale: 1.15,
                                transition: { duration: 0.3 },
                            }}
                        >
                            <CustomSearch>
                                <CustomSearchIcon />
                            </CustomSearch>
                        </MotionBox>
                    }
                />
                <BottomNavigationAction
                    component={Link}
                    to="/activity"
                    value="activity"
                    icon={
                        <MotionBox
                            component={motion.div}
                            whileHover={{
                                scale: 1.25,
                                transition: { duration: 0.3 },
                            }}
                            whileTap={{
                                scale: 1.3,
                                transition: { duration: 0.3 },
                            }}
                        >
                            <CustomActivityIcon />
                        </MotionBox>
                    }
                />
                <BottomNavigationAction
                    component={Link}
                    to="/account"
                    value="account"
                    icon={
                        <MotionBox
                            component={motion.div}
                            whileHover={{
                                scale: 1.25,
                                transition: { duration: 0.3 },
                            }}
                            whileTap={{
                                scale: 1.3,
                                transition: { duration: 0.3 },
                            }}
                        >
                            <CustomAccountIcon />
                        </MotionBox>
                    }
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
    width: 55,
    height: 55,
    marginTop: -50,
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    boxShadow:
        theme.palette.mode === 'dark'
            ? `0px 0px 5px 1px ${theme.palette.primary.light}`
            : `1px 1px 15px 8px ${theme.palette.primary.light}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

const CustomSearchIcon = styled(FiSearch)(({ theme }) => ({
    width: 35,
    height: 35,
    color: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'white',
}));

const CustomHomeIcon = styled(BsStars)({
    width: iconVal,
    height: iconVal,
});

const CustomOverviewIcon = styled(FiBarChart2)({
    width: iconVal,
    height: iconVal,
});

const CustomActivityIcon = styled(FiActivity)({
    width: iconVal,
    height: iconVal,
});

const CustomAccountIcon = styled(AiOutlineUser)({
    width: iconVal,
    height: iconVal,
});

const MotionBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
});

export default BottomNavBar;
