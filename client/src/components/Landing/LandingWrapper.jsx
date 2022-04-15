import React, { useEffect, useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { motion } from 'framer-motion';
import { Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import styled from '@emotion/styled';
import useWindowDimensions from '../shared/useWindowDimensions';
import { useSelector } from 'react-redux';

const LandingWrapper = (props) => {
    const [isExpanded, setExpanded] = useState(false);
    const [active, setActive] = useState('signin');
    const [wave, setWave] = useState(null);
    const { height, width } = useWindowDimensions();

    const error = useSelector((state) => state.errors.AUTH);

    useEffect(() => {
        setWave(
            `M 0 0 L 600 0 L 600 110 C 425 65 360 185 250 150 C 140 120 110 220 0 220 L 0 0`
        );
    }, [error, height, width, wave]);

    const backdropVariants = {
        expanded: {
            d: `M 0 0 L 600 0 L 600 ${height} C 425 ${height} 360 ${height} 250 ${height} C 140 ${height} 110 ${height} 0 ${height} L 0 0`,
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

    return (
        <Container elevation={3}>
            <ShapeContainer>
                <Shape>
                    <NewShapeBack
                        d={wave}
                        transition={expandingTransition}
                        animate={isExpanded ? 'expanded' : 'collapsed'}
                        variants={backdropVariants}
                    />
                </Shape>
            </ShapeContainer>
            <Box sx={{ gridRowStart: 1, gridColumnStart: 1 }}>
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
                    {active === 'signin' && (
                        <>
                            <HeaderText variant="h3">Welcome</HeaderText>
                            <HeaderText variant="h3">Back</HeaderText>
                        </>
                    )}
                    {active === 'signup' && (
                        <>
                            <HeaderText variant="h3">Create</HeaderText>
                            <HeaderText variant="h3">Account</HeaderText>
                        </>
                    )}
                </NewTop>
                <InnerContainer>
                    {active === 'signin' && <SignIn />}
                    {active === 'signup' && <SignUp />}
                </InnerContainer>
            </Box>
        </Container>
    );
};

const Container = styled(Paper)(({ theme }) => ({
    maxWidth: 600,
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
        borderRadius: 0,
        minHeight: '100vh',
        maxHeight: '100vh',
    },
    [theme.breakpoints.up('sm')]: {
        borderRadius: 15,
        minHeight: '95vh',
        maxHeight: '95vh',
    },
    display: 'grid',
    gridTemplateColumns: '1fr',
    overflow: 'hidden',
}));

const ShapeContainer = styled(Box)({
    zIndex: 5,
    width: '100%',
    height: '100vh',
    gridRowStart: 1,
    gridColumnStart: 1,
    pointerEvents: 'none',
});

const Shape = styled(motion.svg)(({ theme }) => ({
    minWidth: '100%',
    maxWidth: 600,
    height: '100vh',
    [theme.breakpoints.down('sm')]: {
        borderRadius: 0,
    },
    [theme.breakpoints.up('sm')]: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
}));

const NewShapeBack = styled(motion.path)`
    fill: #fae27a;
`;

const TabBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    padding: '0.5rem',
});

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

const NewTop = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 25,
    pointerEvents: 'none',
    [theme.breakpoints.down('sm')]: {
        marginBottom: 75,
    },
    [theme.breakpoints.up('sm')]: {
        marginBottom: 100,
        marginTop: -35,
    },
}));

const HeaderText = styled(Typography)({
    color: 'white',
    textShadow: `5px 5px 15px rgba(0, 0, 0, 0.4)`,
    zIndex: 10,
});

const InnerContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    marginBottom: 50,
});

export default LandingWrapper;
