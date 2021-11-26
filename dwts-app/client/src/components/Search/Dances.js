import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchDances } from '../../actions/dances';
import { makeStyles, CircularProgress } from '@material-ui/core';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import DancesPreview from '../Previews/DancesPreview';
import DanceAdd from '../Dances/DanceAdd';
import responsive from '../shared/responsive';
import { ResultsContainer } from '../shared/shared.js';
import CheckJWT from '../shared/logout';
import { fetchTeams } from '../../actions/teams';
import { createLoadingSelector } from '../../api/selectors';

import * as actionType from '../../constants/actionTypes';


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    progress: {
        margin: "auto",
    },
})

function actionCreator(input) {
    return dispatch => {
        dispatch(searchDances(input));
        dispatch(fetchTeams());
        return Promise.resolve();
    }
}

function Dances(props) {
    CheckJWT();
    const classes = useStyles();
    const dispatch = useDispatch();
    const dances = useSelector(state => state.dances.dances);
    //const loading = useSelector(state => state.dances.loading);
    const teams = useSelector(state => state.teams.teams);

    const loadingSelector = createLoadingSelector([actionType.DANCESEARCH, actionType.TEAMSEARCH]);
    const isFetching = useSelector((state) => loadingSelector(state));

    const filters = {
        style: props.filters.styles.length !== 0 ? style => props.filters.styles.includes(style) : [],
        season: season => season >= props.filters.seasons[0] && season <= props.filters.seasons[1],
    };

    const arr = []

    useEffect(() => {
        const input = { search: props.search };
        dispatch(searchDances(input));
        dispatch(fetchTeams());
    }, [dispatch, props]);

    const multiFilter = (array, filters) => {
        const filterKeys = Object.keys(filters);
        return array.filter(item => {
            return filterKeys.every(key => {
                if (!filters[key].length) {
                    return true;
                }
                return filters[key](item[key]);
            })
        })
    }

    let filteredDances = [];

    if (Array.isArray(dances)) {
        filteredDances = multiFilter(dances, filters);
        //console.log(filteredDances);

        const categorizeBySeason = filteredDances.reduce((acc, item) => {
            if (!acc[item.season]) {
                acc[item.season] = [];
            }

            acc[item.season].push(item);
            return acc;
        }, {})


        for (let [season] of Object.entries(categorizeBySeason)) {
            arr.push(season);
        }
    }

    return (
         <ResultsContainer>
            <AdminAdd>
                <DanceAdd />
            </AdminAdd>


            {isFetching  ? <CircularProgress className={classes.progress} /> :
                <div>
                {arr.map((item, index) => ( 
                    <ContentContainer key={index} >
                        <Subtitle>Season {item}</Subtitle>
                        <Carousel
                            responsive={responsive}
                            partialVisible={true}
                        >
                            {filteredDances.filter(dance => Number(dance.season) === Number(item))
                                .map((dance, index) => (

                                    <Link key={index} to={{ pathname: `/dances/${dance.id}` }} style={{ textDecoration: "none" }} >
                                        <DancesPreview 
                                            dance={dance}
                                            teams={teams}
                                             />
                                    </Link>
                                ))}
                        </Carousel>
                    </ContentContainer>
                ))}
            </div>}
            
        </ResultsContainer>
    )
};

// const Container = styled.div`
//     width: 100%;
//     min-height: 300px;
//     display: flex;
//     flex-direction: column;
//     position: relative;
//     padding-bottom: 70px;
// `;

const Subtitle = styled.h2`
    //float: left;
    color: rgba(0, 0, 0, 0.8);
    margin: 0 auto 15px auto;
    color: white;
`;

const AdminAdd = styled.div`
    margin: 2px;
    width: 20%;
    margin-right: 0;
    margin-left: auto;
`;

const ContentContainer = styled.div`
    width: 75%;
    margin: 15px auto;
`;

export default Dances;