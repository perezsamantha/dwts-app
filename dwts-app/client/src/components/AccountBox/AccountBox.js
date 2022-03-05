import React, { useState } from 'react';

import Signin from './Signin';
import Signup from './Signup';

import { AccountContext } from './AccountContext';

import { motion } from 'framer-motion';
import { Paper } from '@mui/material';
import styled from '@emotion/styled';
import { HeaderText } from './common';

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

const backdropVariants = {
    expanded: {
        scale: 10,
    },
    collapsed: {
        scale: 1,
    },
};

const expandingTransition = {
    type: 'spring',
    duration: 2.5,
    stiffness: 50,
};

const AccountBox = (props) => {
    const [isExpanded, setExpanded] = useState(false);
    const [active, setActive] = useState('signin');

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
                <NewTop>
                    {/* <NewBack
                        initial={false}
                        animate={isExpanded ? 'expanded' : 'collapsed'}
                        variants={backdropVariants}
                        transition={expandingTransition}
                    /> */}
                    <NewBack
                        //initial={false}
                        animate={isExpanded ? 'expanded' : 'collapsed'}
                        variants={backdropVariants}
                        transition={expandingTransition}
                    />
                    {active === 'signin' && (
                        <>
                            <HeaderText variant="h4">Welcome</HeaderText>
                            <HeaderText variant="h4">Back</HeaderText>
                            <HeaderText>Please sign in to continue</HeaderText>
                        </>
                    )}
                    {active === 'signup' && (
                        <>
                            <HeaderText variant="h4">Create</HeaderText>
                            <HeaderText variant="h4">Account</HeaderText>
                            <HeaderText>Please sign up to continue</HeaderText>
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

const Container = styled(Paper)`
    display: flex;
    flex-direction: column;
    align-content: center;
    //position: relative;
`;

const NewTop = styled(Paper)`
    //width: 60%;
    //height: 30vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5em 1.8em;
`;

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

const InnerContainer = styled(Paper)`
    display: flex;
    flex-direction: column;
    //align-content: center;
    padding: 0 1.8em;
`;

export default AccountBox;
