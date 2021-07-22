import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Button, InputAdornment, IconButton, makeStyles } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

import { updateTeam, deleteTeam, updatePic } from '../../actions/teams';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginRight: theme.spacing(1.5),
        }
    },
    names: {
        width: "20ch"
    },
    numbers: {
        width: "10ch"
    }
}));

function TeamSettings(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(props.team);
    const [fileData, setFileData] = useState(null);
    const id = formData._id;

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleFile = (e) => {
        setFileData(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (fileData != null) {
            const data = new FormData();
            data.append("promoPic", fileData);

            dispatch(updatePic(id, data));
        }

        dispatch(updateTeam(id, formData));
        handleClose();
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        
        dispatch(deleteTeam(id));
        handleClose();
    }

    return (
        <div>
            <Button color="primary" onClick={handleOpen}>
                <SettingsIcon />
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle>Team Settings</DialogTitle>
                <DialogContent className={classes.root} >
                    <input
                        type="file"
                        accept=".jpeg, .jpg, .png"
                        onChange={handleFile}
                    />
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
                        Update Team
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Delete Team
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default TeamSettings;