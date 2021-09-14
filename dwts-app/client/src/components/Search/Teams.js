import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { searchTeams } from '../../actions/teams';
import { makeStyles, CircularProgress } from '@material-ui/core';
import TeamAdd from '../Teams/TeamAdd';
import TeamsPreview from '../Previews/TeamsPreview';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import responsive from '../shared/responsive';
import { fetchPros } from '../../actions/pros';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    progress: {
        margin: "auto",
    }
})

function Teams(props) {
    const classes = useStyles();

    // const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    // const [currentTeam, setCurrentTeam] = useState(null);
    // const [show, setShow] = useState(false);
    //const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    // const history = useHistory();
    //const input = { search: props.search };

    const teams = useSelector(state => state.teams.teams);
    const loading = useSelector(state => state.teams.loading);
    const pros = useSelector(state => state.pros.pros)
    
    const arr = [];

    useEffect(() => {
        const input = { search: props.search };
        dispatch(searchTeams(input));
        dispatch(fetchPros());
    }, [dispatch, props]);

    // bug: following functions load before teams is correctly updated
    //      tried combining in useEffect() but no luck :()
    //      probably need to utilize selectors with loading flags in reducers
    //      https://medium.com/stashaway-engineering/react-redux-tips-better-way-to-handle-loading-flags-in-your-reducers-afda42a804c6
    if (Array.isArray(teams)) {
        const categorizeBySeason = teams.reduce((acc, item) => {
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
        <Container>
            <AdminAdd>
                <TeamAdd />
            </AdminAdd>

            {(loading || !Array.isArray(pros)) ? <CircularProgress className={classes.progress} /> :
                // <ContentContainer>
                //     <Grid container justify="flex-start" className={classes.root} spacing={2}>
                //         {teams.map((team, index) => (
                //             <Grid key={index} item>
                //             <InnerContainer>
                //                 <Link to={{ pathname: `/teams/${team._id}` }} style={{ textDecoration: "none" }} >
                //                 {/* <TeamsPreview team={team}/> */}
                //                 <TeamsPreview team={team} />
                //             </Link>
                //             </InnerContainer>
                //             </Grid>
                //         ))}
                //     </Grid>
                // </ContentContainer>
                <div>
                    {arr.map((item, index) => (
                        <ContentContainer key={index}>
                            <Subtitle>Season {item}</Subtitle>
                            <Carousel
                                responsive={responsive}
                                partialVisible={true}
                            >
                                {teams.filter(team => Number(team.season) === Number(item))
                                    .map((team, index) => (

                                        <Link key={index} to={{ pathname: `/teams/${team._id}` }} style={{ textDecoration: "none" }} >
                                            <TeamsPreview team={team} pro={pros.find(pro => pro._id === team.pro)} />
                                        </Link>
                                    ))}
                            </Carousel>
                        </ContentContainer>
                    ))}
                </div>
            }
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    position: relative;
    padding-bottom: 70px;
`;

// const Spacer = styled.div`
//     margin: 15px;
// `;

// const SubtitleContainer = styled.div`
//     clear: both;
//     margin: 0 auto;
//     width: 75%;
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

// const Divider = styled.div`
//     width: 75%;
//     margin: 10px auto;
//     height: 2px;
//     background: white;
// `;

const ContentContainer = styled.div`
    width: 75%;
    margin: 15px auto;
`;

// const InnerContainer = styled.div`
//     width: 100%;
//     float: left;
// `;

export default Teams;