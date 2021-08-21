import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
//import SearchBar from '../components/Search/SearchBar';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';
import Dances from '../components/Search/Dances';
import Cast from '../components/Search/Cast';
import Fans from '../components/Search/Fans';

import { makeStyles } from '@material-ui/core/styles'
import { Paper, Tab, Tabs } from '@material-ui/core';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import TeamCard from '../components/Cards/TeamCard';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        position: "absolute",
        bottom: 0,
        backgroundColor: "transparent",
        width: "100%",
        boxShadow: "none",
    },
    tabs: {
        color: "#fff",
        textColor: "#fff",
        '&:hover': {
            color: "#fff",
        },
        '&:selected': {
            color: "#fff",
        },
        '&:focus': {
            color: "#fff",
        },
        '&:active': {
            color: "#fff",
        },
    },
    indicator: {
        background: "#fff",
        height: 5,
    },
});

function Search(props) {
    const classes = useStyles();
    const pathname = window.location.pathname;
    const [value, setValue] = useState(pathname);
    const [searchVal, setSearchVal] = useState("");
    const [key, setKey] = useState(1);
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState("");
    const [overflow, setOverflow] = useState("");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const searchChange = (e) => {
        setSearchVal(e.target.value);
        setKey(key + 1);
    }

    const scrollHandler = (show) => {
        setOpen(show);
    }

    useEffect(() => {
        if (open) {
            setPosition("fixed");
            setOverflow("hidden");
        } else {
            setPosition("");
            setOverflow("");
        }
    }, [open])

    return (
        <Page position={position} overflow={overflow}>
            <SearchContainer>
                <SearchTitle>Search</SearchTitle>
                <SearchBox type="search" placeholder="Search..." value={searchVal} onChange={searchChange} />
                <Paper className={classes.root}>
                    <Tabs
                        classes={{ indicator: classes.indicator }}
                        value={value}
                        onChange={handleChange}
                        centered
                    >
                        <Tab disableRipple component={Link} to="/search/dances" className={classes.tabs} label="DANCES" value="/search/dances" />
                        <Tab disableRipple component={Link} to="/search/cast" className={classes.tabs} label="CAST" value="/search/cast" />
                        <Tab disableRipple component={Link} to="/search/fans" className={classes.tabs} label="FANS" value="/search/fans" />
                    </Tabs>
                </Paper>
            </SearchContainer>
            
            {/* {value === "/search/dances" && <Dances key={key} search={searchVal} backgroundScroll={scrollHandler}/>}
            {value === "/search/cast" && <Cast key={key} search={searchVal} backgroundScroll={scrollHandler}/>}
            {value === "/search/fans" && <Fans key={key} search={searchVal} backgroundScroll={scrollHandler}/>}
             */}
            <Switch>
                <Route exact path="/search/cast/teams/:id">
                        <TeamCard key={key} />
                    </Route>
                    <Route path="/search/dances">
                        <Dances key={key} search={searchVal} backgroundScroll={scrollHandler} />
                    </Route>
                    <Route path="/search/cast">
                        <Cast key={key} search={searchVal} backgroundScroll={scrollHandler}/>
                    </Route>
                    
                    <Route path="/search/fans">
                        <Fans key={key} search={searchVal} backgroundScroll={scrollHandler} />
                    </Route>
                </Switch>
            
            <BottomNavBar />
        </Page>
    )
}

const Page = styled.div`
    width: 100%;
    position: ${props => props.position};
    overflow: ${props => props.overflow};
`;

const InnerContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    padding-bottom: 70px;
`;


const SearchContainer = styled.div`
    width: 100%;
    height: 200px;
    background: rgb(198,161,67);
background: linear-gradient(99deg, rgba(198,161,67,1) 0%, rgba(232,216,136,1) 55%, rgba(198,161,67,1) 100%);
    top: 0;
    position: relative;
    box-shadow: 0px 1px 100px grey;
    align-items: center;
    border-radius: 0 0 15px 15px;
`;

const SearchTitle = styled.h2`
    color: #fff;
    font-size: 30px;
    font-weight: 500;
    margin-top: 0;
    padding: 1em 0 0.2em 0;
    text-align: center;
`;

const SearchBox = styled.input`
    width: 70%;
    height: 40px;
    //border: 2px solid white;
    border: none;
    border-radius: 20px;
    padding: 0.5em 0em 0.5em 1.5em;
    background: rgba(255, 255, 255, 0.4);
    color: white !important;
    display: block;
    margin: 0 auto;
    &:focus {
        outline: none;
    };
    box-shadow: 0px 1px 150px white;
    ::placeholder {
        color: white;
        opacity: 1;
    };
    ::-webkit-search-decoration, ::-webkit-search-cancel-button, ::-webkit-search-results-button, ::-webkit-search-results-decoration {
        display: none;
    };
`;

export default Search;