import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchPros } from '../../actions/pros';
import { makeStyles, CircularProgress, Grid } from '@material-ui/core';
import ProAdd from '../Pros/ProAdd';
import ProsPreview from '../Previews/ProsPreview';
import { createLoadingSelector } from '../../api/selectors';

import * as actionType from '../../constants/actionTypes';


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    progress: {
        margin: "auto",
    }
})

function Pros(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const pros = useSelector(state => state.pros.pros);

    console.log(useSelector(state => state.loading))

    const loadingSelector = createLoadingSelector([actionType.PROSEARCH]);
    const isFetching = useSelector((state) => loadingSelector(state));
    console.log(isFetching)


    useEffect(() => {
        const input = { search: props.search };
        dispatch(searchPros(input));
    }, [dispatch, props]);

    return (
        <Container>
            <AdminAdd>
                <ProAdd />
            </AdminAdd>

            { isFetching || !Array.isArray(pros) ? <CircularProgress className={classes.progress} /> :

                <ContentContainer>
                    <Grid container justify="flex-start" className={classes.root} spacing={2}>
                        {pros.map((pro, index) => (
                            <Grid key={index} item>
                                <InnerContainer>
                                    <Link to={{ pathname: `/pros/${pro._id}` }} style={{ textDecoration: "none" }} >
                                        <ProsPreview pro={pro} />
                                    </Link>
                                </InnerContainer>
                            </Grid>
                        ))}
                    </Grid>
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

const InnerContainer = styled.div`
    width: 100%;
    float: left;
`;

// const loadingSelector = createLoadingSelector(['PROSEARCH']);
// const mapStateToProps = (state) => ({ isFetching: loadingSelector(state) })

// export default connect(mapStateToProps(Pros));

export default Pros;