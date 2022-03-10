import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchTeams } from '../../actions/teams';
import { Typography } from '@mui/material';
import TeamPreview from './Previews/TeamPreview';

import { createLoadingSelector } from '../../api/selectors';

import * as actionType from '../../constants/actionTypes';
import { filterTeams } from './Filters/filtered';
import { ResultsContainer } from '../shared/muiStyles';
import Progress from '../shared/Progress';
import TeamsSlider from './TeamsSlider';

function Teams(props) {
    const { search, filters } = props;
    const dispatch = useDispatch();

    const teams = useSelector((state) => state.teams.teams);

    const loadingSelector = createLoadingSelector([
        actionType.TEAMSEARCH,
        actionType.PROSEARCH,
        actionType.CELEBSEARCH,
        actionType.SEASONSEARCH,
    ]);
    const loading = useSelector((state) => loadingSelector(state));

    let arr = [];

    useEffect(() => {
        const input = { search: search };
        dispatch(searchTeams(input));
    }, [dispatch, search]);

    let filteredTeams = [];

    if (!loading) {
        filteredTeams = filterTeams(teams, filters);

        // sorts by placement first, should this be after ??
        filteredTeams.sort((a, b) => {
            if (a.placement < b.placement) {
                return -1;
            } else if (a.placement > b.placement) {
                return 1;
            } else {
                return 0;
            }
        });

        const categorizeBySeason = filteredTeams.reduce((acc, item) => {
            if (!acc[item.season_id]) {
                acc[item.season_id] = [];
            }

            acc[item.season_id].push(item);
            return acc;
        }, {});

        for (let [season_id] of Object.entries(categorizeBySeason)) {
            arr.push(season_id);
        }

        // reverses array, to start with newst season working backwards
        if (filters.sortBy === 'seasonDesc') {
            arr.reverse();
        }
    }

    return loading ? (
        <Progress />
    ) : (
        <ResultsContainer>
            {arr.map((item, index) => (
                <ContentContainer key={index}>
                    <Typography variant="h5" my={1}>
                        Season {item}
                    </Typography>
                    <TeamsSlider filteredTeams={filteredTeams} item={item} />
                    {/* <Carousel responsive={responsive} partialVisible={true}>
                        {filteredTeams
                            .filter(
                                (team) =>
                                    Number(team.season_id) === Number(item)
                            )
                            .map((team, index) => (
                                <Link
                                    key={index}
                                    to={{
                                        pathname: `/teams/${team.id}`,
                                    }}
                                    style={{
                                        textDecoration: 'inherit',
                                        color: 'inherit',
                                    }}
                                >
                                    <TeamsPreview key={index} team={team} />
                                </Link>
                            ))}
                    </Carousel> */}
                </ContentContainer>
            ))}
        </ResultsContainer>
    );
}

const ContentContainer = styled.div`
    width: 100%;
    //margin: 15px auto;
`;

export default Teams;