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
    background: rgb(9,121,87);
    background: linear-gradient(90deg, rgba(9,121,87,1) 0%, rgba(4,153,162,1) 60%, rgba(0,184,235,1) 100%);
    top: 0;
    position: relative;
    box-shadow: 0px 1px 100px grey;
`;

const SearchTitle = styled.h2`
    color: #fff;
    font-size: 30px;
    font-weight: 500;
    margin-top: 0;
    padding: 1em 0;
    text-align: center;
`;

export default SearchBar;