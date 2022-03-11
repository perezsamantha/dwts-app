import React, { useEffect, useState } from 'react';

import Signin from './Signin';
import Signup from './Signup';

import { AccountContext } from './AccountContext';

import { motion } from 'framer-motion';
import { Box, Paper, Stack, Tab, Tabs, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { HeaderText } from './common';
import useWindowDimensions from '../shared/useWindowDimensions';

// const backdropVariants = {
//     expanded: {
//         width: '320%',
//         height: '280vh',
//         borderRadius: '20%',
//         transform: 'rotate(60deg)',
//     },
//     collapsed: {
//         width: 200,
//         height: 200,
//         borderRadius: '50%',
//         transform: 'rotate(60deg)',
//     },
// };

const AccountBox = (props) => {
    const [isExpanded, setExpanded] = useState(false);
    const [active, setActive] = useState('signin');
    const [wave, setWave] = useState(null);
    const { height, width } = useWindowDimensions();

    useEffect(() => {
        setWave(
            `M 0 0 L ${width} 0 L ${width} 150 C ${width} ${width} 250 125 200 225 C 175 275 100 300 0 300 Z`
        );
    }, [height, width, wave]);

    const backdropVariants = {
        expanded: {
            //scale: 20,
            d: `M 0 0 L ${width} 0 L ${width} ${height} C 325 ${height} 325 ${height} 200 ${height} C 125 ${height} 125 ${height} 0 ${height} Z`,
        },
        collapsed: {
            scale: 1,
        },
    };

    const expandingTransition = {
        type: 'spring',
        duration: 2.5,
        stiffness: 35,
    };

    const playExpandingAnimation = () => {
        setExpanded(true);
        setTimeout(() => {
            setExpanded(false);
        }, expandingTransition.duration * 1000 - 1500);
    };

    const switchToSignup = () => {
        playExpandingAnimation();
        setTimeout(() => {
            setActive('signup');
        }, 400);
    };

    const switchToSignin = () => {
        playExpandingAnimation();
        setTimeout(() => {
            setActive('signin');
        }, 400);
    };

    const contextValue = { switchToSignup, switchToSignin };

    return (
        <AccountContext.Provider value={contextValue}>
            <Container>
                <ShapeContainer>
                    <Shape
                        width="100%"
                        height="100vh"
                        //viewBox="0 0 500 500"
                        preserveAspectRatio="xMinYMin meet"
                    >
                        <NewShapeBack
                            // d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
                            // d="M 0 0 L 0 300 C 200 320 200 200 440 200 C 600 200 720 160 800 80 L 800 0 Z"
                            //d="M 0 0 L 400 0 L 400 150 C 325 200 250 125 200 225 C 175 275 100 300 0 300 Z"
                            d={wave}
                            transition={expandingTransition}
                            //initial={!isExpanded ? 'expanded' : 'collapsed'}
                            animate={isExpanded ? 'expanded' : 'collapsed'}
                            variants={backdropVariants}
                        />
                    </Shape>
                </ShapeContainer>
                <TabBox>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <StyledTabs value={active}>
                            <StyledTab
                                label="Sign In"
                                value="signin"
                                onClick={switchToSignin}
                            />
                            <StyledTab
                                label="Sign Up"
                                value="signup"
                                onClick={switchToSignup}
                            />
                        </StyledTabs>
                    </Box>
                </TabBox>
                <NewTop>
                    {/* <NewBack
                        initial={false}
                        animate={isExpanded ? 'expanded' : 'collapsed'}
                        variants={backdropVariants}
                        transition={expandingTransition}
                    /> */}
                    {/* <NewBack
                        //initial={false}
                        animate={isExpanded ? 'expanded' : 'collapsed'}
                        variants={backdropVariants}
                        transition={expandingTransition}
                    /> */}
                    {active === 'signin' && (
                        <>
                            <HeaderText variant="h3">Welcome</HeaderText>
                            <HeaderText variant="h3">Back</HeaderText>
                            {/* <HeaderText>Please sign in to continue</HeaderText> */}
                        </>
                    )}
                    {active === 'signup' && (
                        <>
                            <HeaderText variant="h3">Create</HeaderText>
                            <HeaderText variant="h3">Account</HeaderText>
                            {/* <HeaderText>Please sign up to continue</HeaderText> */}
                        </>
                    )}
                </NewTop>
                <InnerContainer>
                    {active === 'signin' && <Signin />}
                    {active === 'signup' && <Signup />}
                </InnerContainer>
            </Container>
        </AccountContext.Provider>
    );
};

const StyledTabs = styled((props) => (
    <Tabs
        {...props}
        TabIndicatorProps={{
            children: <span className="MuiTabs-indicatorSpan" />,
        }}
    />
))({
    zIndex: 10,
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        height: 3,
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 5,
    },
});

const StyledTab = styled(Tab)(({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: 16,
    minWidth: 70,
    width: 70,
    textShadow: '1px 3px 10px rgba(0, 0, 0, 0.2)',
    //minHeight: 'fit-content',
    //height: 'fit-content',
    padding: 0,
    marginRight: theme.spacing(1),
    color: '#fff',
    '&.Mui-selected': {
        color: '#fff',
    },
    '&.Mui-focusVisible': {
        backgroundColor: '#fff',
    },
}));

const ShapeContainer = styled.div`
    //display: inline-block;
    //position: relative;
    //width: '100%';
    //padding-bottom: 30%;
    //vertical-align: middle;
    //overflow: hidden;
    z-index: 5;
`;

const Shape = styled(motion.svg)`
    //display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
`;

const NewShapeBack = styled(motion.path)`
    fill: #fae27a;
`;

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    align-content: center;
    //position: relative;
`;

const TabBox = styled(Box)`
    //width: 60%;
    //height: 30vh;
    display: flex;
    flex-direction: column;
    //align-items: center;
    //justify-content: center;
    padding: 0.5rem;
`;

const NewTop = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem 2rem',
    marginBottom: 100,
});

// TODO: convert to star and possibly change from px
const NewBack = styled(motion.div)`
    width: 200px;
    height: 200px;
    position: absolute;
    border-radius: 50%;
    transform: rotate(50deg);
    background: rgb(236, 220, 141);
    background: radial-gradient(
        circle,
        rgba(236, 220, 141, 1) 0%,
        rgba(208, 174, 87, 1) 100%
    );
    z-index: 5;
`;

// const NewBack = styled(motion.div)`
//     width: 500px;
//     height: 400px;
//     position: absolute;
//     display: flex;
//     flex-direction: column;
//     border-radius: 50%;
//     transform: rotate(50deg);
//     top: -325px;
//     left: -325px;
//     background: rgb(196, 159, 65);
//     background: linear-gradient(
//         100deg,
//         rgba(196, 159, 65, 1) 0%,
//         rgba(215, 189, 102, 1) 70%,
//         rgba(240, 225, 152, 1) 100%
//     );
//     z-index: 5;
// `;

const InnerContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    //align-content: center;
    padding: 1rem;
    top: 0;
`;

export default AccountBox;
