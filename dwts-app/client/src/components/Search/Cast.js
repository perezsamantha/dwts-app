import React, { useState, useEffect } from 'react';
import TeamCard from '../Cards/TeamCard';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { searchTeams } from '../../actions/teams';
import { Grid, makeStyles, CircularProgress } from '@material-ui/core';
import TeamAdd from '../Teams/TeamAdd';
import TeamsPreview from '../Previews/TeamsPreview';
import NewPreview from '../Previews/NewPreview';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    progress: {
        margin: "auto",
    }
})

function Cast(props) {
    const classes = useStyles();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [currentTeam, setCurrentTeam] = useState(null);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const history = useHistory();
    const input = { search: props.search };

    const teams = useSelector(state => state.teams);

    useEffect(() => {
        dispatch(searchTeams(input));
        //props.backgroundScroll(show);
        setLoading(false);
    }, []);


    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 2000 },
            items: 5,
            partialVisibilityGutter: 30
        },
        laptop: {
            breakpoint: { max: 2000, min: 1024 },
            items: 5,
            partialVisibilityGutter: 0 
        },
        largeTablet: {
            breakpoint: { max: 1024, min: 870 },
            items: 4,
            partialVisibilityGutter: 30 
        },
        anotherTablet: {
            breakpoint: { max: 870, min: 750 },
            items: 4,
            partialVisibilityGutter: 0 
        },
        tablet: {
            breakpoint: { max: 750, min: 625 },
            items: 3,
            partialVisibilityGutter: 20 
        },
        smallTablet: {
            breakpoint: { max: 625, min: 464 },
            items: 3,
            partialVisibilityGutter: 0 
        },
        mobile: {
            breakpoint: { max: 464, min: 410 },
            items: 2,
            partialVisibilityGutter: 20
        },
        smallMobile: {
            breakpoint: { max: 410, min: 350 },
            items: 2,
            partialVisibilityGutter: 0
        },
        extraSmallMobile: {
            breakpoint: { max: 350, min: 300 },
            items: 1,
            partialVisibilityGutter: 100
        },
        tinyMobile: {
            breakpoint: { max: 280, min: 0 },
            items: 1,
            partialVisibilityGutter: 60 
        },
    };

    return (
        <Container>
            <Spacer />
            <AdminAdd>
                <TeamAdd />
            </AdminAdd>
            <Subtitle>Season _</Subtitle>

            {(!teams.length || teams[0]?.email != null) ? <CircularProgress className={classes.progress} /> :
                // <ContentContainer>
                //     <Grid container justify="flex-start" className={classes.root} spacing={2}>
                //         {teams.map((team, index) => (
                //             <Grid key={index} item>
                //             <InnerContainer>
                //                 <Link to={{ pathname: `/teams/${team._id}` }} style={{ textDecoration: "none" }} >
                //                 {/* <TeamsPreview team={team}/> */}
                //                 <NewPreview team={team} />
                //             </Link>
                //             </InnerContainer>
                //             </Grid>
                //         ))}
                //     </Grid>
                // </ContentContainer>
                <ContentContainer>
                    <Carousel
                        responsive={responsive}
                        partialVisbile={true}
                    >

                        {teams.map((team) => (
                            <Link to={{ pathname: `/teams/${team._id}` }} style={{ textDecoration: "none" }} >
                                <NewPreview team={team} />
                            </Link>
                        ))}

                    </Carousel>
                </ContentContainer>
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
    //align-items: center;
    padding-bottom: 70px;
`;

const Spacer = styled.div`
    margin: 15px;
`;

const SubtitleContainer = styled.div`
    clear: both;
    margin: 0 auto;
    width: 75%;
`;

const Subtitle = styled.h2`
width: 75%;
    //float: left;
    color: rgba(0, 0, 0, 0.8);
    margin: 10px auto;
    color: white;
`;

const AdminAdd = styled.div`
    margin: 2px;
    width: 20%;
    margin-right: 0;
    margin-left: auto;
`;

const Divider = styled.div`
    width: 75%;
    margin: 10px auto;
    height: 2px;
    background: white;
`;

const ContentContainer = styled.div`
    width: 75%;
    margin: 10px auto;
`;

const InnerContainer = styled.div`
    width: 100%;
    float: left;
`;

export default Cast;