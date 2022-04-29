import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchTeams } from '../../actions/teams';
import { Divider, Fade, Stack, Typography } from '@mui/material';
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
    const [slide, setSlide] = useState(false);

    const loadingSelector = createLoadingSelector([actionType.TEAMSEARCH]);
    const loading = useSelector((state) => loadingSelector(state));

    let filteredTeams,
        arr = [];
    let sortType = '';

    useEffect(() => {
        const input = { search: search };
        const delay = setTimeout(() => {
            dispatch(searchTeams(input));
            setSlide(true);
        }, 500);

        return () => clearTimeout(delay);
    }, [dispatch, search]);

    if (!loading) {
        filteredTeams = filterTeams(teams, filters);

        if (filters.sortBy === 'seasonDesc' || filters.sortBy === 'likes') {
            sortType = 'season';

            if (filters.sortBy === 'seasonDesc') {
                filteredTeams.sort((a, b) => {
                    if (a.placement < b.placement) {
                        return -1;
                    } else if (a.placement > b.placement) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
            } else if (filters.sortBy === 'likes') {
                filteredTeams.sort((a, b) => {
                    if (a.likes.length > b.likes.length) {
                        return -1;
                    } else if (a.likes.length < b.likes.length) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
            }

            arr = filteredTeams.reduce((acc, item) => {
                const found = acc.find((a) => a.key === item.season_id);

                if (found) {
                    found.data.push(item);
                } else {
                    acc.push({ key: item.season_id, data: [item] });
                }

                return acc;
            }, []);

            if (filters.sortBy === 'seasonDesc') {
                arr.sort((a, b) => {
                    if (a.key > b.key) {
                        return -1;
                    } else if (a.key < b.key) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
            }
            // else if (filters.sortBy === 'seasonAsc') {
            //     arr.sort((a, b) => {
            //         if (a.key < b.key) {
            //             return -1;
            //         } else if (a.key > b.key) {
            //             return 1;
            //         } else {
            //             return 0;
            //         }
            //     });
            // }
        }

        if (filters.sortBy === 'placementAsc') {
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

            arr = teams.reduce((acc, item) => {
                const found = acc.find((a) => a.key === item.placement);

                if (found) {
                    found.data.push(item);
                } else {
                    acc.push({ key: item.placement, data: [item] });
                }

                return acc;
            }, []);

            // if (filters.sortBy === 'placementDesc') {
            //     arr.sort((a, b) => {
            //         if (a.key > b.key) {
            //             return -1;
            //         } else if (a.key < b.key) {
            //             return 1;
            //         } else {
            //             return 0;
            //         }
            //     });
            // } else
            if (filters.sortBy === 'placementAsc') {
                arr.sort((a, b) => {
                    if (a.key < b.key) {
                        return -1;
                    } else if (a.key > b.key) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
            }
        }
    }

    const sliderTitle = (item, sortType) => {
        if (sortType === 'season') {
            if (item.key === 27.5) {
                return `Juniors`;
            } else {
                return `Season ${item.key}`;
            }
        } else if (sortType === 'placement') {
            const placement = convertPlacement(item.key);

            if (placement) {
                return `${placement} Place`;
            } else {
                return `Currently Competing`;
            }
        }
    };

    return loading ? (
        <Progress />
    ) : (
        <Fade in={slide} style={{ transitionDuration: '0.5s' }}>
            <ResultsContainer>
                <Stack>
                    <Typography>{filteredTeams.length} Teams</Typography>
                    <Divider />
                </Stack>

                {arr.map((item, index) => (
                    <ContentContainer key={index}>
                        <Typography variant="h5" my={1}>
                            {sliderTitle(item, sortType)}
                        </Typography>
                        <TeamsSlider teams={item.data} sortType={sortType} />
                    </ContentContainer>
                ))}
            </ResultsContainer>
        </Fade>
    );
}

export default Teams;
