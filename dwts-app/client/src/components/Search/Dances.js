import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchDances } from '../../actions/dances';
import { CircularProgress, Divider } from '@mui/material';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import DancesPreview from '../Previews/DancesPreview';
import responsive from '../shared/responsive';
import { createLoadingSelector } from '../../api/selectors';

import * as actionType from '../../constants/actionTypes';
import { makeStyles } from '@mui/styles';
import { Container, ContentContainer } from '../shared/muiStyles';
import { filterDances } from './Filters/filtered';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    progress: {
        margin: 'auto',
    },
});

function Dances(props) {
    const { search, filters } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const dances = useSelector((state) => state.dances.dances);

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

    // const filters = {
    //     style:
    //         props.filters.styles.length !== 0
    //             ? (style) => props.filters.styles.includes(style)
    //             : [],
    //     season: (season) =>
    //         season >= props.filters.seasons[0] &&
    //         season <= props.filters.seasons[1],
    // };

    const arr = [];

    useEffect(() => {
        const input = { search: search };
        dispatch(searchDances(input));
    }, [dispatch, search]);

    let filteredDances = [];

    if (!loading) {
        filteredDances = filterDances(dances, filters);
    }

    // if (Array.isArray(dances)) {
    //     const categorizeBySeason = filteredDances.reduce((acc, item) => {
    //         if (!acc[item.season]) {
    //             acc[item.season] = [];
    //         }

    //         acc[item.season].push(item);
    //         return acc;
    //     }, {});

    //     for (let [season] of Object.entries(categorizeBySeason)) {
    //         arr.push(season);
    //     }
    // }

    return loading ? (
        <CircularProgress className={classes.progress} />
    ) : (
        <Container>
            {/* {arr.map((item, index) => (  */}
            <ContentContainer>
                {/* <Subtitle>Season {item}</Subtitle> */}
                {/* <Carousel responsive={responsive} partialVisible={true}> */}
                {/* {filteredDances.filter(dance => Number(dance.season) === Number(item)) */}
                {filteredDances.map((dance, index) => (
                    <>
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
                        <Divider />
                    </>
                ))}
                {/* </Carousel> */}
            </ContentContainer>
            {/* } */}
        </Container>
    );
}

export default Dances;
