import React from 'react';
import SearchBar from '../components/Search/SearchBar';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';
import Dances from '../components/Search/Dances';
import Cast from '../components/Search/Cast';
import Fans from '../components/Search/Fans';

function Search(props) {
    return(
        <div>
            <SearchBar />
            {props.value === 1 && <Dances />}
            {props.value === 2 && <Cast />}
            {props.value === 3 && <Fans />}
            <BottomNavBar />
        </div>
    )
}

export default Search;