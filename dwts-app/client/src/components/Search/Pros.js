import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchPros } from '../../actions/pros';
import { makeStyles, CircularProgress } from '@material-ui/core';
import ProAdd from '../Pros/ProAdd';
import ProsPreview from '../Previews/ProsPreview';


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
    const loading = useSelector(state => state.pros.loading);

    useEffect(() => {
        const input = { search: props.search };
        dispatch(searchPros(input));
    }, [dispatch, props]);

    return (
        <Container>
            <AdminAdd>
                <ProAdd />
            </AdminAdd>

            {loading ? <CircularProgress className={classes.progress} /> :

                <div>
                    {pros && pros.map((pro, index) => (

                        <ProsPreview pro={pro} />
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

export default Pros;