import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
//import SearchBar from '../components/Search/SearchBar';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';
import Dances from '../components/Search/Dances';
import Teams from '../components/Search/Teams';
import Fans from '../components/Search/Fans';
import Pros from '../components/Search/Pros';

import { makeStyles } from '@material-ui/core/styles'
import { Chip, Paper, Tab, Tabs } from '@material-ui/core';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import CheckIcon from '@material-ui/icons/Check';

import { styles } from '../constants/dropdowns';

const useStyles = makeStyles({
    root: {
        //flexGrow: 1,
        backgroundColor: "transparent",
        width: "100%",
        boxShadow: "none",
        position: "relative"
    },
    search: {
        backgroundColor: "black",
    },
    tabs: {
        color: "#fff",
        textColor: "#fff",
        '&:hover': {
            color: "rgb(255, 255, 255, 0.9)",
        },
        '&:selected': {
            color: "#fff",
        },
        '&:focus': {
            color: "#fff",
        },
        '&:active': {
            color: "rgb(255, 255, 255, 0.8)",
        },
    },
    indicator: {
        background: "rgb(243,229,171)",
        height: 3,
        borderRadius: "10px"
    },
    icon: {
        width: "10%",
        margin: "auto"
    },
    filterIcon: {
        color: "white",
        width: "10%",
        margin: "auto",
        cursor: "pointer"
    },
    chip: {
        backgroundColor: "white",
        margin: "2px",
        '&:active, &:hover': {
            backgroundColor: "rgb(243,229,171)"
        },
        '&:focus': {
            backgroundColor: "white"
        }
    },   
    selectedChip: {
        backgroundColor: "rgb(243,229,171)",
        '&:focus, &:hover': {
            backgroundColor: "rgb(243,229,171)"
        }
    },
    keyboardIcon: {
        margin: "auto 0",
        color: "lightgrey"
    },
});

function Search(props) {
    const classes = useStyles();
    const pathname = window.location.pathname;
    const [value, setValue] = useState(pathname);
    const [searchVal, setSearchVal] = useState("");
    const [key, setKey] = useState(1);
    const [placeholder, setPlaceholder] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [showStyleFilters, setShowStyleFilters] = useState(false);
    const [styleFilters, setStyleFilters] = useState([]);
    //let styleFilters = [];
    localStorage.setItem('parentPath', window.location.pathname);

    const placeholderText = (value) => {
        if (value === "/search/dances") {
            setPlaceholder("Style, song, team");
        } else if (value === "/search/teams") {
            setPlaceholder("Celebrity, professional");
        } else if (value === "/search/pros") {
            setPlaceholder("Name, ");
        } else if (value === "/search/fans") {
            setPlaceholder("Username, nickname");
        }
    }

    const handleChange = (e, newValue) => {
        setValue(newValue);
        placeholderText(newValue);
    }

    const searchChange = (e) => {
        setSearchVal(e.target.value);
        setKey(key + 1);
    }

    const handleStyleFilters = (e) => {
        const style = e.target.innerHTML;
        const index = styleFilters.indexOf(style);

        if (index > -1) {
            setStyleFilters(styleFilters.filter((style, i) => i !== index));
        } else {
            setStyleFilters(styleFilters => [...styleFilters, style]);
        }

    }

    useEffect(() => {
        placeholderText(pathname);
    }, [])

    return (
        <Page >
            <SearchContainer>
                <SearchTitle>Search</SearchTitle>
                <SearchBoxContainer>
                    <SearchBox >
                        <SearchIcon className={classes.icon} />
                        <SearchInput type="search" placeholder={placeholder} value={searchVal} onChange={searchChange} />
                    </SearchBox>
                    <FilterListIcon className={classes.filterIcon} onClick={() => setShowFilters(prev => !prev)} />
                </SearchBoxContainer>

                {showFilters && <FilterContainer>
                    <FilterTitleContainer onClick={() => setShowStyleFilters(prev => !prev)} >
                        {showStyleFilters ? <KeyboardArrowDownIcon className={classes.keyboardIcon} /> : <KeyboardArrowRightIcon className={classes.keyboardIcon} />}
                        <FilterTitle>
                            Filter by style
                        </FilterTitle>
                    </FilterTitleContainer>
                    <ChipContainer>
                        {showStyleFilters && styles.map((style, index) => (
                            <Chip key={index} size="small" className={styleFilters.includes(style) ? classes.selectedChip : classes.chip} icon={styleFilters.includes(style) && <CheckIcon />} label={style} onClick={handleStyleFilters} />
                        ))}
                    </ChipContainer>
                </FilterContainer>}

                <Paper className={classes.root}>
                    <Tabs
                        classes={{ indicator: classes.indicator }}
                        value={value}
                        onChange={handleChange}
                        centered
                    >
                        <Tab disableRipple component={Link} to="/search/dances" className={classes.tabs} label="DANCES" value="/search/dances" />
                        <Tab disableRipple component={Link} to="/search/teams" className={classes.tabs} label="TEAMS" value="/search/teams" />
                        <Tab disableRipple component={Link} to="/search/pros" className={classes.tabs} label="PROS" value="/search/pros" />
                        <Tab disableRipple component={Link} to="/search/fans" className={classes.tabs} label="FANS" value="/search/fans" />
                    </Tabs>
                </Paper>
            </SearchContainer>

            {value === "/search/dances" && <Dances key={key} search={searchVal} filters={styleFilters} />}
            {value === "/search/teams" && <Teams key={key} search={searchVal} />}
            {value === "/search/pros" && <Pros key={key} search={searchVal} />}
            {value === "/search/fans" && <Fans key={key} search={searchVal} />}

            <BottomNavBar />
        </Page>
    )
}

const Page = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(18, 18, 18);
    //background: rgb(73,69,38);
    //background: linear-gradient(160deg, rgba(73,69,38,1) 0%, rgba(18,18,18,1) 30%, rgba(18,18,18,1) 100%);
`;

// const InnerContainer = styled.div`
//     width: 100%;
//     display: flex;
//     flex-direction: column;
//     position: relative;
//     align-items: center;
//     padding-bottom: 70px;
// `;


const SearchContainer = styled.div`
    /* width: 100%;
    height: 200px;
    background: rgb(198,161,67);
background: linear-gradient(99deg, rgba(198,161,67,1) 0%, rgba(232,216,136,1) 55%, rgba(198,161,67,1) 100%);
    top: 0;
    position: relative;
    box-shadow: 0px 1px 100px grey;
    align-items: center;
    border-radius: 0 0 15px 15px; */

    width: 100%;
    min-height: 175px;
    //background: rgb(250,240,190, 0.8);
    //background: rgba(0, 0, 0, 0.9);

    position: relative;
    //margin: 15px;
    //box-shadow: 0px 1px 100px grey;
    border-radius: 0 0 10px 10px;
`;

const SearchTitle = styled.h2`
    width: 75%;
    color: #fff;
    font-size: 25px;
    font-weight: 500;
    margin: 30px auto 15px auto;
`;

const SearchBoxContainer = styled.div`
    width: 75%;
    margin: 15px auto;
    display: flex;
    flex-direction: row;
`;

const SearchBox = styled.div`
    width: 80%;
    //height: 40px;
    border: none;
    border-radius: 5px;
    //padding: 0.5em 0em 0.5em 1.5em;
    //padding: 0.5em;
    //background: rgba(255, 255, 255, 0.4);
    background: rgba(255, 255, 255, 1);
    //color: white !important;
    //display: block;
    //margin: 0 auto;
    display: flex;
    flex-direction: row;
    margin-right: auto;
    padding: 8px;
`;

const SearchInput = styled.input`
    width: 90%;
    height: 100%;
    margin: auto 0;
    //height: 40px;
    //border: 2px solid white;
    border: none;
    //border-radius: 10px;
    //padding: 0.5em 0em 0.5em 1.5em;
    //background: rgba(255, 255, 255, 0.4);
    //background: rgba(255, 255, 255, .3);
    //color: white !important;
    //display: block;
    //margin: 0 auto;
    font-family: 'Urbanist', sans-serif;
    font-size: 18px;
    &:focus {
        outline: none;
    };
    ::placeholder {
        color: black;
        opacity: 1;
        //font-family: 'Urbanist', sans-serif;
    }
    ::-webkit-search-decoration, ::-webkit-search-cancel-button, ::-webkit-search-results-button, ::-webkit-search-results-decoration {
        display: none;
    };
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
    color: white;
    font-size: 16px;
    cursor: pointer;
    margin: 5px 0;
`;

const ChipContainer = styled.div`
    
`;

export default Search;