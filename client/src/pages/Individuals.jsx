import React, { useEffect } from 'react';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';
import Team from '../components/Individuals/Team';
import Pro from '../components/Individuals/Pro';
import Fan from '../components/Individuals/Fan';
import Dance from '../components/Individuals/Dance';
import { MainContainer, Page } from '../components/shared/muiStyles';

function Individuals() {
    const pathname = window.location.pathname;
    const category = pathname.split('/')[1];

    useEffect(() => {}, []);

    const Individual = () => {
        switch (category) {
            case 'dances':
                return <Dance />;
            case 'teams':
                return <Team />;
            case 'pros':
                return <Pro />;
            case 'fans':
                return <Fan />;
            default:
                return <></>;
        }
    };

    return (
        <Page>
            <MainContainer>
                <Individual />
            </MainContainer>
            <BottomNavBar />
        </Page>
    );
}

export default Individuals;
