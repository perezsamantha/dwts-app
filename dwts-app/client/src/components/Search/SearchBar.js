import React, { useState } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Tab, Tabs } from '@material-ui/core';
import { Link } from 'react-router-dom';

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

function SearchBar() {
    const classes = useStyles();
    const pathname = window.location.pathname;
    const [value, setValue] = useState(pathname);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <SearchContainer>
            <SearchTitle>Search</SearchTitle>
            <SearchBox type="search" placeholder="Search..." />
            <Paper className={classes.root}>
                <Tabs 
                    classes={{ indicator: classes.indicator }}
                    value={value}
                    onChange={handleChange}
                    //indicatorColor="primary"
                    //textColor="primary"
                    centered
                >
                    <Tab disableRipple component={Link} to="/search/dances" className={classes.tabs} label="DANCES" value="/search/dances" />
                    <Tab disableRipple component={Link} to="/search/cast" className={classes.tabs} label="CAST" value="/search/cast" />
                    <Tab disableRipple component={Link} to="/search/fans" className={classes.tabs} label="FANS" value="/search/fans" />
                </Tabs>
            </Paper>
        </SearchContainer>
    );
}

const SearchContainer = styled.div`
    width: 100%;
    height: 200px;
    background: rgb(149,213,232);
background: radial-gradient(circle, rgba(149,213,232,1) 0%, rgba(159,236,203,1) 100%);
    top: 0;
    position: relative;
    box-shadow: 0px 1px 100px grey;
    align-items: center;
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

export default SearchBar;