import React from 'react';
import styled from 'styled-components';
import SearchBar from '../components/Search/SearchBar';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';
import Dances from '../components/Search/Dances';
import Cast from '../components/Search/Cast';
import Fans from '../components/Search/Fans';

function Search(props) {
    return (
        <div>
            <SearchBar />
            {props.value === 1 && <Dances />}
            {props.value === 2 && <Cast />}
            {props.value === 3 && <Fans />}
            <BottomNavBar />
        </div>
    )
}

const InnerContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    padding-bottom: 70px;
`;

export default Search;