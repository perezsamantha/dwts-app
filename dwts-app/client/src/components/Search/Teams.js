import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTeams, searchTeams } from '../../actions/teams';
import { CircularProgress, Paper, Typography } from '@mui/material';
import TeamsPreview from '../Previews/TeamsPreview';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import responsive from '../shared/responsive';

import { createLoadingSelector } from '../../api/selectors';

import * as actionType from '../../constants/actionTypes';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    progress: {
        margin: 'auto',
    },
});

function Teams(props) {
    const classes = useStyles();

    // const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    // const [currentTeam, setCurrentTeam] = useState(null);
    // const [show, setShow] = useState(false);
    //const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    // const history = useHistory();
    //const input = { search: props.search };

    const teams = useSelector((state) => state.data.teams);
    //const loading = useSelector(state => state.teams.loading);
    const pros = useSelector((state) => state.data.pros);
    const celebs = useSelector((state) => state.data.celebs);

    //const loadingSelector = createLoadingSelector([actionType.PROSEARCH, actionType.TEAMSEARCH]);
    const loading = useSelector((state) => state.loading.TEAMSEARCH);
    //const isFetching = useSelector((state) => loadingSelector(state));

    let arr = [];

    useEffect(() => {
        const input = { search: props.search };
        dispatch(searchTeams(input));
        //dispatch(fetchTeams());
    }, [dispatch, props]);

    if (!loading) {
        const categorizeBySeason = teams.reduce((acc, item) => {
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
        arr.reverse();
    }

    return (
        <Container>
            {loading ? (
                <CircularProgress className={classes.progress} />
            ) : (
                <div>
                    {arr.map((item, index) => (
                        <ContentContainer key={index}>
                            <Typography variant="h5" my={1}>
                                Season {item}
                            </Typography>
                            <Carousel
                                responsive={responsive}
                                partialVisible={true}
                            >
                                {teams
                                    .filter(
                                        (team) =>
                                            Number(team.season_id) ===
                                            Number(item)
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
                                            <TeamsPreview
                                                key={index}
                                                team={team}
                                            />
                                        </Link>
                                    ))}
                            </Carousel>
                        </ContentContainer>
                    ))}
                </div>
            )}
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    position: relative;
    padding-bottom: 70px;
`;

const ContentContainer = styled.div`
    width: 85%;
    margin: 15px auto;
`;

export default Teams;
