import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
//import SearchBar from '../components/Search/SearchBar';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';
import Dances from '../components/Search/Dances';
import Teams from '../components/Search/Teams';
import Fans from '../components/Search/Fans';
import Pros from '../components/Search/Pros';

import {
    Chip,
    InputAdornment,
    Slider,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CheckIcon from '@mui/icons-material/Check';

import { styles } from '../constants/dropdowns';
import { makeStyles } from '@mui/styles';
import { Page, SearchTextField } from '../components/shared/muiStyles';
import Filters from '../components/Search/Filters';
import { initialFilters } from '../components/Search/Filters/initialFilters';
import * as searchType from '../constants/searchTypes';

const useStyles = makeStyles({
    icon: {
        width: '10%',
        margin: 'auto',
    },
    filterIcon: {
        width: '10%',
        margin: 'auto',
        cursor: 'pointer',
    },
    chip: {
        backgroundColor: 'white',
        margin: '2px',
        '&:active, &:hover': {
            backgroundColor: 'rgb(243,229,171)',
        },
        '&:focus': {
            backgroundColor: 'white',
        },
    },
    selectedChip: {
        backgroundColor: 'rgb(243,229,171)',
        '&:focus, &:hover': {
            backgroundColor: 'rgb(243,229,171)',
        },
    },
    arrowIcon: {
        margin: 'auto 0',
    },
});

function Search(props) {
    // TODO: move filters to new component !!!!!!!!!

    const classes = useStyles();
    const [type, setType] = useState(props.type);
    const [searchVal, setSearchVal] = useState('');
    const [key, setKey] = useState(1);
    const [placeholder, setPlaceholder] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [showStyleFilters, setShowStyleFilters] = useState(false);
    const [showSeasonFilters, setShowSeasonFilters] = useState(false);

    const [styleFilters, setStyleFilters] = useState([]);
    const lastSeason = 30;
    const [seasonFilters, setSeasonFilters] = useState([1, lastSeason]);

    const [finalFilters, setFinalFilters] = useState(initialFilters(type));

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

    const handleStyleFilters = (e) => {
        const style = e.target.innerHTML;
        const index = styleFilters.indexOf(style);

        if (index > -1) {
            setStyleFilters(styleFilters.filter((style, i) => i !== index));
            //setFilters({
            //     ...filters,
            //     styles: filters.styles.filter((style, i) => i !== index),
            // });
        } else {
            setStyleFilters((styleFilters) => [...styleFilters, style]);
            //setFilters({ ...filters, styles: [...filters.styles, style] });
        }

        //console.log(filters);
    };

    const handleSeasonFilters = (e, newValue) => {
        setSeasonFilters(newValue);
        //setFilters({ ...filters, seasons: newValue });
    };

    useEffect(() => {
        setType(type);
        placeholderText(type);
        setFinalFilters(initialFilters(type));
    }, [type]);

    const SearchComponent = () => {
        // TODO: recap of filters above component, maybe number of results too
        switch (type) {
            case searchType.DANCES:
                return (
                    <Dances key={1} search={searchVal} filters={finalFilters} />
                );
            case searchType.TEAMS:
                return (
                    <Teams key={2} search={searchVal} filters={finalFilters} />
                );
            case searchType.PROS:
                return (
                    <Pros key={3} search={searchVal} filters={finalFilters} />
                );
            case searchType.FANS:
                return <Fans key={4} search={searchVal} />;
            default:
                return <></>;
        }
    };

    return (
        <Page>
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
                    {/* <FilterListIcon
                        className={classes.filterIcon}
                        onClick={() => setShowFilters((prev) => !prev)}
                    /> */}
                    <Filters
                        type={type}
                        finalFilters={finalFilters}
                        setFinalFilters={setFinalFilters}
                    />
                </SearchBoxContainer>

                {showFilters && (
                    <FilterContainer>
                        <FilterTitleContainer
                            onClick={() => setShowStyleFilters((prev) => !prev)}
                        >
                            {showStyleFilters ? (
                                <KeyboardArrowDownIcon
                                    className={classes.arrowIcon}
                                />
                            ) : (
                                <KeyboardArrowRightIcon
                                    className={classes.arrowIcon}
                                />
                            )}
                            <FilterTitle>Filter by style</FilterTitle>
                        </FilterTitleContainer>

                        <ChipContainer>
                            {showStyleFilters &&
                                styles.map((style, index) => (
                                    <Chip
                                        key={index}
                                        size="small"
                                        className={
                                            styleFilters.includes(style)
                                                ? classes.selectedChip
                                                : classes.chip
                                        }
                                        icon={
                                            styleFilters.includes(style) && (
                                                <CheckIcon />
                                            )
                                        }
                                        label={style}
                                        onClick={handleStyleFilters}
                                    />
                                ))}
                        </ChipContainer>

                        <FilterTitleContainer
                            onClick={() =>
                                setShowSeasonFilters((prev) => !prev)
                            }
                        >
                            {showSeasonFilters ? (
                                <KeyboardArrowDownIcon
                                    className={classes.arrowIcon}
                                />
                            ) : (
                                <KeyboardArrowRightIcon
                                    className={classes.arrowIcon}
                                />
                            )}
                            <FilterTitle>Filter by season</FilterTitle>
                        </FilterTitleContainer>

                        {showSeasonFilters && (
                            <SliderContainer>
                                <Slider
                                    value={seasonFilters}
                                    valueLabelDisplay="auto"
                                    onChange={handleSeasonFilters}
                                    min={1}
                                    max={lastSeason}
                                    //className={classes.slider}
                                />
                            </SliderContainer>
                        )}
                    </FilterContainer>
                )}

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
                        className={classes.tabs}
                        label="FANS"
                        value={searchType.FANS}
                    />
                </Tabs>
            </SearchContainer>

            <SearchComponent />

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
    width: 90%;
    margin: 10px auto;
    display: flex;
    flex-direction: row;
`;

const FilterContainer = styled.div`
    width: 75%;
    margin: auto;
`;

const FilterTitleContainer = styled.div`
    width: 75%;
    display: flex;
    flex-direction: row;
    margin: 1px 0;
`;

const FilterTitle = styled.h3`
    //color: white;
    font-size: 16px;
    cursor: pointer;
    margin: 5px 0;
`;

const ChipContainer = styled.div`
    margin: 5px 0;
`;

const SliderContainer = styled.div`
    width: 95%;
    margin: 5px auto;
`;

export default Search;
