import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchDances, searchDances } from '../../actions/dances';
import { CircularProgress } from '@mui/material';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import DancesPreview from '../Previews/DancesPreview';
import responsive from '../shared/responsive';
import { createLoadingSelector } from '../../api/selectors';

import * as actionType from '../../constants/actionTypes';
import { makeStyles } from '@mui/styles';
import { Container, ContentContainer } from '../shared/muiStyles';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    progress: {
        margin: 'auto',
    },
});

function Dances(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const dances = useSelector((state) => state.data.dances);
    //const teams = useSelector(state => state.data.teams);

    //const loadingSelector = createLoadingSelector([actionType.DANCESEARCH, actionType.TEAMSEARCH]);
    //const isFetching = useSelector((state) => loadingSelector(state));
    const loading2 = useSelector((state) => state.loading.DANCESEARCH);

    const loadingSelector = createLoadingSelector([
        actionType.DANCESEARCH,
        actionType.CELEBSEARCH,
        actionType.PROSEARCH,
        actionType.TEAMSEARCH,
        actionType.SEASONSEARCH,
        actionType.EPISODESEARCH,
        actionType.DANCERSEARCH,
        actionType.JUDGESEARCH,
        actionType.SCORESEARCH,
    ]);
    const loading = useSelector((state) => loadingSelector(state));

    const filters = {
        style:
            props.filters.styles.length !== 0
                ? (style) => props.filters.styles.includes(style)
                : [],
        season: (season) =>
            season >= props.filters.seasons[0] &&
            season <= props.filters.seasons[1],
    };

    const arr = [];

    useEffect(() => {
        const input = { search: props.search };
        dispatch(searchDances(input));
    }, [dispatch, props]);

    const multiFilter = (array, filters) => {
        const filterKeys = Object.keys(filters);
        return array.filter((item) => {
            return filterKeys.every((key) => {
                if (!filters[key].length) {
                    return true;
                }
                return filters[key](item[key]);
            });
        });
    };

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
        }, {});

        for (let [season] of Object.entries(categorizeBySeason)) {
            arr.push(season);
        }
    }

    return loading ? (
        <CircularProgress className={classes.progress} />
    ) : (
        <Container>
            {/* {arr.map((item, index) => (  */}
            <ContentContainer>
                {/* <Subtitle>Season {item}</Subtitle> */}
                {/* <Carousel responsive={responsive} partialVisible={true}> */}
                {/* {filteredDances.filter(dance => Number(dance.season) === Number(item)) */}
                {dances.map((dance, index) => (
                    <Link
                        key={index}
                        to={{ pathname: `/dances/${dance.id}` }}
                        style={{
                            textDecoration: 'inherit',
                            color: 'inherit',
                        }}
                    >
                        <DancesPreview dance={dance} />
                    </Link>
                ))}
                {/* </Carousel> */}
            </ContentContainer>
            {/* } */}
        </Container>
    );
}

export default Dances;
