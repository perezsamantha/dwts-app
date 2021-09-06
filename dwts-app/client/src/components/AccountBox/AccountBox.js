import React, { useState } from 'react';

import styled from 'styled-components';
import Signin from './Signin';
import Signup from './Signup';

import { AccountContext } from './AccountContext';

import { motion } from "framer-motion";

const backdropVariants = {
    expanded: {
        width: "260%",
        height: "220vh",
        borderRadius: "20%",
        transform: "rotate(60deg)"
    },
    collapsed: {
        width: "650px",
        height: "550px",
        borderRadius: "50%",
        transform: "rotate(60deg)"
    }
}

const expandingTransition = {
    type: "spring",
    duration: 2.5,
    stiffness: 50,
}

const AccountBox = (props) => {
    const [isExpanded, setExpanded] = useState(false);
    const [active, setActive] = useState("signin");

    const playExpandingAnimation = () => {
        setExpanded(true);
        setTimeout(() => {
            setExpanded(false);
        }, expandingTransition.duration * 1000 - 1500);
    }

    const switchToSignup = () => {
        playExpandingAnimation();
        setTimeout(() => {
            setActive("signup");
        }, 400)
    }

    const switchToSignin = () => {
        playExpandingAnimation();
        setTimeout(() => {
            setActive("signin");
        }, 400)
    }

    const contextValue = { switchToSignup, switchToSignin };

    return (
        <AccountContext.Provider value={contextValue}>
            <NewBox>
                <NewTop>
                    <NewBack
                        initial={false}
                        animate={isExpanded ? "expanded" : "collapsed"}
                        variants={backdropVariants}
                        transition={expandingTransition}
                    />
                    {active === "signin" && <HeaderContainer>
                        <HeaderText>Welcome</HeaderText>
                        <HeaderText>Back</HeaderText>
                        <SmallText>Please sign in to continue.</SmallText>
                    </HeaderContainer>}
                    {active === "signup" && <HeaderContainer>
                        <HeaderText>Create</HeaderText>
                        <HeaderText>Account</HeaderText>
                        <SmallText>Please sign up to continue.</SmallText>
                    </HeaderContainer>}
                </NewTop>
                <InnerContainer>
                    {active === "signin" && <Signin />}
                    {active === "signup" && <Signup />}
                </InnerContainer>
            </NewBox>

            {/* <BoxContainer>
            <TopContainer>
                <BackDrop 
                    initial={false} 
                    animate={isExpanded ? "expanded" : "collapsed"} 
                    variants={backdropVariants}
                    transition={expandingTransition}
                />
                {active ==="signin" && <HeaderContainer>
                    <HeaderText>Welcome</HeaderText>
                    <HeaderText>Back</HeaderText>
                    <SmallText>Please sign in to continue.</SmallText>
                </HeaderContainer>}
                {active ==="signup" && <HeaderContainer>
                    <HeaderText>Create</HeaderText>
                    <HeaderText>Account</HeaderText>
                    <SmallText>Please sign up to continue.</SmallText>
                </HeaderContainer>}
            </TopContainer>
            <InnerContainer>
                {active === "signin" && <Signin />}
                {active === "signup" && <Signup />}
            </InnerContainer>
        </BoxContainer>*/}
        </AccountContext.Provider>
    )
}

const NewBox = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
`;


// const BoxContainer = styled.div`
//     width: 280px;
//     min-height: 550px;
//     display: flex;
//     flex-direction: column;
//     border-radius: 19px;
//     background-color: #ffffff;
//     box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
//     position: relative;
//     overflow: hidden;
// `;

const NewTop = styled.div`
    width: 100%;
    height: 30vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 1.8em;
    padding-bottom: 5em;
`;

// const TopContainer = styled.div`
//     width: 100%;
//     height: 150px;
//     display: flex;
//     flex-direction: column;
//     justify-content: flex-end;
//     padding: 0 1.8em;
//     padding-bottom: 5em;
// `;

const NewBack = styled(motion.div)`
    width: 500px;
    height: 400px;
    position: absolute;
    display: flex;
    flex-direction: column;
    border-radius: 50%;
    transform: rotate(50deg);
    top: -325px;
    left: -325px;
    background: rgb(196,159,65);
    background: linear-gradient(100deg, rgba(196,159,65,1) 0%, rgba(215,189,102,1) 70%, rgba(240,225,152,1) 100%);
    z-index: 5;
`;

// const BackDrop = styled(motion.div)`
//     width: 160%;
//     height: 550px;
//     position: absolute;
//     display: flex;
//     flex-direction: column;
//     border-radius: 50%;
//     transform: rotate(60deg);
//     top: -290px;
//     left: -70px;
//     background: rgb(196,159,65);
//     background: linear-gradient(100deg, rgba(196,159,65,1) 0%, rgba(215,189,102,1) 70%, rgba(240,225,152,1) 100%);
//     z-index: 5;
// `;

const HeaderContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const HeaderText = styled.h2`
    font-size: 30px;
    font-weight: 600;
    line-height: 1.24;
    color: #fff;
    z-index: 10;
    margin: 0;
    text-shadow: 0px 1px 15px rgba(0, 0, 0, 0.3);
`;

const SmallText = styled.h5`
    color: #fff;
    font-weight: 500;
    font-size: 11px;
    z-index: 10;
    margin: 0;
    margin-top: 10px;
    text-shadow: 0px 1px 15px rgba(0, 0, 0, 0.3);
`;

const InnerContainer = styled.div`
    //width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 1.8em;
`;

export default AccountBox;
