import React from 'react';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';
import TeamCard from '../components/Cards/TeamCard';
import ProCard from '../components/Cards/ProCard';
import FanCard from '../components/Cards/FanCard';
import DanceCard from '../components/Cards/DanceCard';
import { MainContainer, Page } from '../components/shared/muiStyles';

function Individuals() {
    const pathname = window.location.pathname;

    const category = pathname.split('/')[1];

    return (
        <Page>
            <MainContainer>
                {category === 'teams' && <TeamCard />}
                {category === 'pros' && <ProCard />}
                {category === 'fans' && <FanCard />}
                {category === 'dances' && <DanceCard />}
            </MainContainer>
            <BottomNavBar />
        </Page>
    );
}

export default Individuals;
