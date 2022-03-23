import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchTeams } from '../../actions/teams';
import { Divider, Stack, Typography } from '@mui/material';
import { createLoadingSelector } from '../../api/selectors';
import * as actionType from '../../constants/actionTypes';
import { filterTeams } from './Filters/filtered';
import { ContentContainer, ResultsContainer } from '../shared/muiStyles';
import Progress from '../shared/Progress';
import TeamsSlider from './TeamsSlider';
import { convertPlacement } from '../shared/functions';

function Teams(props) {
    const { search } = props;
    const dispatch = useDispatch();
    const teams = useSelector((state) => state.teams.teams);
    const filters = useSelector((state) => state.teams.filters);

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
    let sortType = '';

    if (!loading) {
        filteredTeams = filterTeams(teams, filters);

        if (filters.sortBy === 'seasonAsc' || filters.sortBy === 'seasonDesc') {
            sortType = 'season';

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

            if (filters.sortBy === 'seasonDesc') {
                arr.reverse();
            }
        }

        if (filters.sortBy === 'placement') {
            sortType = 'placement';

            filteredTeams.sort((a, b) => {
                if (a.season_id > b.season_id) {
                    return -1;
                } else if (a.season_id < b.season_id) {
                    return 1;
                } else {
                    return 0;
                }
            });

            const categorizeByPlacement = filteredTeams.reduce((acc, item) => {
                if (!acc[item.placement]) {
                    acc[item.placement] = [];
                }

                acc[item.placement].push(item);
                return acc;
            }, {});

            for (let [placement] of Object.entries(categorizeByPlacement)) {
                arr.push(placement);
            }
        }
    }

    return loading ? (
        <Progress />
    ) : (
        <ResultsContainer>
            <Stack>
                <Typography>{filteredTeams.length} Teams</Typography>
                <Divider />
            </Stack>

            {arr.map((item, index) => (
                <ContentContainer key={index}>
                    <Typography variant="h5" my={1}>
                        {sortType === 'season'
                            ? `Season ${item}`
                            : sortType === 'placement'
                            ? `${convertPlacement(item)} Place`
                            : ''}
                    </Typography>
                    <TeamsSlider
                        filteredTeams={filteredTeams}
                        item={item}
                        sortType={sortType}
                    />
                </ContentContainer>
            ))}
        </ResultsContainer>
    );
}

export default Teams;
