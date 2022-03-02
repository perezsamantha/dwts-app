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
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CheckIcon from '@mui/icons-material/Check';

import { styles } from '../constants/dropdowns';
import { makeStyles } from '@mui/styles';
import { Page, SearchTextField } from '../components/shared/muiStyles';
import Filters from '../components/Search/Filters';

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
    const pathname = window.location.pathname;
    const [value, setValue] = useState(pathname);
    const [searchVal, setSearchVal] = useState('');
    const [key, setKey] = useState(1);
    const [placeholder, setPlaceholder] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [showStyleFilters, setShowStyleFilters] = useState(false);
    const [showSeasonFilters, setShowSeasonFilters] = useState(false);

    const [styleFilters, setStyleFilters] = useState([]);
    //const [lastSeason] = useState(seasons.pop());
    const lastSeason = 30;
    //console.log(lastSeason)
    const [seasonFilters, setSeasonFilters] = useState([1, lastSeason]);

    const [filters, setFilters] = useState({
        styles: [],
        seasons: [1, lastSeason],
    });

    localStorage.setItem('parentPath', window.location.pathname);

    const placeholderText = (value) => {
        if (value === '/search/dances') {
            setPlaceholder('Song title, song artist');
        } else if (value === '/search/teams') {
            setPlaceholder('Celebrity, professional');
        } else if (value === '/search/pros') {
            setPlaceholder('First name, last name');
        } else if (value === '/search/fans') {
            setPlaceholder('Username, nickname');
        }
    };

    const handleChange = (e, newValue) => {
        setValue(newValue);
        placeholderText(newValue);
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
            setFilters({
                ...filters,
                styles: filters.styles.filter((style, i) => i !== index),
            });
        } else {
            setStyleFilters((styleFilters) => [...styleFilters, style]);
            setFilters({ ...filters, styles: [...filters.styles, style] });
        }

        //console.log(filters);
    };

    const handleSeasonFilters = (e, newValue) => {
        setSeasonFilters(newValue);
        setFilters({ ...filters, seasons: newValue });
    };

    useEffect(() => {
        placeholderText(pathname);
    }, [pathname]);

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
                    <Filters />
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

                <Tabs value={value} onChange={handleChange} centered>
                    <Tab
                        disableRipple
                        component={Link}
                        to="/search/dances"
                        className={classes.tabs}
                        label="DANCES"
                        value="/search/dances"
                    />
                    <Tab
                        disableRipple
                        component={Link}
                        to="/search/teams"
                        className={classes.tabs}
                        label="TEAMS"
                        value="/search/teams"
                    />
                    <Tab
                        disableRipple
                        component={Link}
                        to="/search/pros"
                        className={classes.tabs}
                        label="PROS"
                        value="/search/pros"
                    />
                    <Tab
                        disableRipple
                        component={Link}
                        to="/search/fans"
                        className={classes.tabs}
                        label="FANS"
                        value="/search/fans"
                    />
                </Tabs>
            </SearchContainer>

            {/* change to switch case before return? */}
            {value === '/search/dances' && (
                <Dances key={key} search={searchVal} filters={filters} />
            )}
            {value === '/search/teams' && (
                <Teams key={key} search={searchVal} />
            )}
            {value === '/search/pros' && <Pros key={key} search={searchVal} />}
            {value === '/search/fans' && <Fans key={key} search={searchVal} />}

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
