import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { addTeam } from '../../actions/teams';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginRight: theme.spacing(1.5),
        }
    },
    button: {
        minHeight: "10px",
        minWidth: "10px",
        maxHeight: "10px",
        maxWidth: "10px",
    },
    names: {
        width: "20ch"
    },
    numbers: {
        width: "10ch"
    }
}));

function TeamAdd() {
    const classes = useStyles();

    const initialState = {
        celeb: '',
        pro: '',
        season: '',
        placement: '',
        numDances: 0,
        numTens: 0,
        numPerfects: 0,
    };
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(addTeam(formData));
        setFormData(initialState);
        handleClose();
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button className={classes.button} disableRipple color="primary" onClick={handleOpen}>
                <AddIcon />
            </Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>Add Team</DialogTitle>
                <DialogContent className={classes.root} spacing={5}>
                        <TextField
                            className={classes.names}
                            margin="dense"
                            name="celeb"
                            label="celeb"
                            type="text"
                            value={formData.celeb}
                            onChange={handleChange}
                        />
                        <TextField
                            className={classes.names}
                            margin="dense"
                            name="pro"
                            label="pro"
                            type="text"
                            value={formData.pro}
                            onChange={handleChange}
                        />
                        <TextField
                            className={classes.numbers}
                            margin="dense"
                            name="season"
                            label="season"
                            type="text"
                            value={formData.season}
                            onChange={handleChange}
                        />
                        <TextField
                            className={classes.numbers}
                            margin="dense"
                            name="placement"
                            label="placement"
                            type="text"
                            value={formData.placement}
                            onChange={handleChange}
                        />
                        <TextField
                            className={classes.numbers}
                            margin="dense"
                            name="numDances"
                            label="# dances"
                            type="text"
                            value={formData.numDances}
                            onChange={handleChange}
                        />
                        <TextField
                            className={classes.numbers}
                            margin="dense"
                            name="numTens"
                            label="# tens"
                            type="text"
                            value={formData.numTens}
                            onChange={handleChange}
                        />
                        <TextField
                            className={classes.numbers}
                            margin="dense"
                            name="numPerfects"
                            label="# perfects"
                            type="text"
                            value={formData.numPerfects}
                            onChange={handleChange}
                        />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Add Team
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default TeamAdd;

