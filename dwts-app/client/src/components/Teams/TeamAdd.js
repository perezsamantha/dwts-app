import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, makeStyles, FormControl, InputLabel, Select, MenuItem, CircularProgress, DialogContentText } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { addTeam } from '../../actions/teams';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPros } from '../../actions/pros';
import { AddButton, FormControl1, FormControl2, FormControl3, TextField1, TextField2 } from '../shared/muiStyles';
import { seasons, placements } from '../../constants/dropdowns';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginRight: theme.spacing(1.5),
        }
    },
}));

function TeamAdd() {
    const classes = useStyles();

    const initialState = {
        celeb: '',
        pro: '',
        season: '',
        placement: '',
        teamName: '',
        celebSocials: {
            instagram: '',
            twitter: '',
            facebook: ''
        }
    };
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const dispatch = useDispatch();
    const pros = useSelector(state => state.pros.pros);

    useEffect(() => {
        dispatch(fetchPros());
    }, [dispatch])

    const handleChange = (e) => {
        if (["instagram", "twitter", "facebook"].includes(e.target.name)) {
            setFormData({ ...formData, celebSocials: { ...formData.celebSocials, [e.target.name]: e.target.value  } })
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
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
        !Array.isArray(pros) ? <div>loading bar</div> : <div style={{ height: "15px" }}>
            <AddButton disableRipple onClick={handleOpen}>
                <AddIcon />
            </AddButton>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>Add Team</DialogTitle>
                <DialogContent className={classes.root} spacing={5}>
                    <TextField2
                        margin="dense"
                        name="celeb"
                        label="Celebrity"
                        type="text"
                        value={formData.celeb}
                        onChange={handleChange}
                        required
                    />

                    <FormControl2 margin="dense" required>
                        <InputLabel id="pro">Professional</InputLabel>
                        <Select
                            labelId="pro"
                            name="pro"
                            value={formData.pro}
                            onChange={handleChange}
                        >
                            {pros.map((pro, index) => (
                                <MenuItem key={index} value={pro._id}>{pro.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl2>

                    <FormControl2 margin="dense" required >
                        <InputLabel id="season">Season</InputLabel>
                        <Select
                            labelId="season"
                            name="season"
                            value={formData.season}
                            onChange={handleChange}
                        >
                            {seasons.map((season, index) => (
                                <MenuItem key={index} value={season}>{season}</MenuItem>
                            ))}
                        </Select>
                    </FormControl2>

                    <FormControl2 margin="dense" >
                        <InputLabel id="placement">Placement</InputLabel>
                        <Select
                            labelId="placement"
                            name="placement"
                            value={formData.placement}
                            onChange={handleChange}
                        >
                            {placements.map((placement, index) => (
                                <MenuItem key={index} value={placement}>{placement}</MenuItem>
                            ))}
                        </Select>
                    </FormControl2>

                    <TextField1
                        margin="dense"
                        name="teamName"
                        label="Team Name"
                        type="text"
                        value={formData.teamName}
                        onChange={handleChange}
                    />

                    <TextField1
                        margin="dense"
                        name="instagram"
                        label="Celeb Instagram (Username)"
                        type="text"
                        value={formData.celebSocials?.instagram}
                        onChange={handleChange}
                    />
                    
                    <TextField1
                        margin="dense"
                        name="twitter"
                        label="Celeb Twitter (Username)"
                        type="text"
                        value={formData.celebSocials?.twitter}
                        onChange={handleChange}
                    />

                    <TextField1
                        margin="dense"
                        name="facebook"
                        label="Celeb Facebook (Username)"
                        type="text"
                        value={formData.celebSocials?.facebook}
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

