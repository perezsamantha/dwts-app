import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Avatar, Button, makeStyles } from "@material-ui/core";
import CheckJWT from "../shared/logout";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { findProById } from "../../actions/pros";

import { Container, TeamName } from '../shared/shared.js'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles({
    avi: {
        width: "100px",
        height: "100px",
        margin: "auto",
    },
    statsGrid: {
        flexGrow: 1,
    },
    progress: {
        margin: "auto",
    },
    back: {
        float: "left",
        margin: "0",
        position: "relative",
    },
    slider: {
        width: "20ch",
        position: "relative",
    },
    editor: {
        width: "100%",
        margin: "10px auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    root: {
        flexGrow: 1,
    },
    icons: {
        color: "lightgrey",
    },
    button: {
        margin: "0",
        padding: "0",
        maxWidth: "20px",
    },
})

function ProCard() {
    CheckJWT();
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const pro = useSelector(state => state.pros.pros);
    const { id } = useParams();

    useEffect(() => {
        dispatch(findProById(id));
    }, [dispatch, id])

    return (
        (Array.isArray(pro)) ? <div>insert loading bar</div> :
            <Container>
                <Button className={classes.back} onClick={() => navigate(-1)}>
                    <ArrowBackIosIcon className={classes.icons} />
                </Button>
                <Avatar className={classes.avi} alt={pro.name} src={pro.coverPic} />
            </Container>
    )
}

export default ProCard;