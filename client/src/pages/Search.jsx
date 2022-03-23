import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';
import Dances from '../components/Search/Dances';
import Teams from '../components/Search/Teams';
import Fans from '../components/Search/Fans';
import Pros from '../components/Search/Pros';

import { InputAdornment, Tab, Tabs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import {
    MainContainer,
    Page,
    SearchTextField,
} from '../components/shared/muiStyles';
import * as searchType from '../constants/searchTypes';
import DanceFilters from '../components/Search/Filters/DanceFilters';
import TeamFilters from '../components/Search/Filters/TeamFilters';
import ProFilters from '../components/Search/Filters/ProFilters';
import FanFilters from '../components/Search/Filters/FanFilters';

function Search(props) {
    const [type, setType] = useState(props.type);
    const [searchVal, setSearchVal] = useState('');
    const [key, setKey] = useState(1);
    const [placeholder, setPlaceholder] = useState('');

    localStorage.setItem('parentPath', window.location.pathname);

    const placeholderText = (type) => {
        switch (type) {
            case searchType.DANCES:
                setPlaceholder('Song title, song artist');
                break;
            case searchType.TEAMS:
                setPlaceholder('Celebrity, professional');
                break;
            case searchType.PROS:
                setPlaceholder('First name, last name');
                break;
            case searchType.FANS:
                setPlaceholder('Username, nickname');
                break;
            default:
        }
    };

    const handleChange = (e, newType) => {
        setType(newType);
        placeholderText(newType);
    };

    const searchChange = (e) => {
        setSearchVal(e.target.value);
        setKey(key + 1);
    };

    useEffect(() => {
        setType(type);
        placeholderText(type);
    }, [type]);

    const FilterComponent = () => {
        switch (type) {
            case searchType.DANCES:
                return <DanceFilters />;
            case searchType.TEAMS:
                return <TeamFilters />;
            case searchType.PROS:
                return <ProFilters />;
            case searchType.FANS:
                return <FanFilters />;
            default:
                return <></>;
        }
    };

    const SearchComponent = () => {
        // TODO: recap of filters above component, maybe number of results too
        switch (type) {
            case searchType.DANCES:
                return <Dances key={1} search={searchVal} />;
            case searchType.TEAMS:
                return <Teams key={2} search={searchVal} />;
            case searchType.PROS:
                return <Pros key={3} search={searchVal} />;
            case searchType.FANS:
                return <Fans key={4} search={searchVal} />;
            default:
                return <></>;
        }
    };

    return (
        <Page>
            <MainContainer>
                <SearchContainer elevation={0}>
                    <Typography variant="h4" my={2}>
                        Search
                    </Typography>
                    <SearchBoxContainer>
                        <SearchTextField
                            size="small"
                            placeholder={placeholder}
                            variant="outlined"
                            value={searchVal}
                            onChange={searchChange}
                            focused
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <FilterComponent />
                    </SearchBoxContainer>

                    <Tabs value={type} onChange={handleChange} centered>
                        <Tab
                            disableRipple
                            component={Link}
                            to="/search/dances"
                            label="DANCES"
                            value={searchType.DANCES}
                        />
                        <Tab
                            disableRipple
                            component={Link}
                            to="/search/teams"
                            label="TEAMS"
                            value={searchType.TEAMS}
                        />
                        <Tab
                            disableRipple
                            component={Link}
                            to="/search/pros"
                            label="PROS"
                            value={searchType.PROS}
                        />
                        <Tab
                            disableRipple
                            component={Link}
                            to="/search/fans"
                            label="FANS"
                            value={searchType.FANS}
                        />
                    </Tabs>
                </SearchContainer>

                <SearchComponent />
            </MainContainer>

            <BottomNavBar />
        </Page>
    );
}

const SearchContainer = styled.div`
    width: 100%;
    //min-height: 170px;
    position: relative;
    //border-radius: 0 0 10px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    //box-shadow: 1px 1px 5px lightgrey;
    border-bottom: 1px solid grey;
`;

const SearchBoxContainer = styled.div`
    width: 95%;
    margin: 10px auto;
    display: flex;
    flex-direction: row;
`;

export default Search;