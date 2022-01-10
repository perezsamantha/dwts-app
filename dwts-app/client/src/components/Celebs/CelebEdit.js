import React, { useCallback, useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { findCelebById, updateCeleb } from '../../actions/celebs';
import { useDispatch, useSelector } from 'react-redux';
import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { genders } from '../../constants/dropdowns';
import EditIcon from '@mui/icons-material/Edit';

const useStyles = makeStyles((theme) => ({
    
}));

function CelebEdit(props) {
    const classes = useStyles();

    const [open, setOpen] = useState(props.open);
    //const celeb = useSelector(state => state.celebs.celeb);
    //const loading = useSelector(state => state.loading.CELEBFIND);
    const [formData, setFormData] = useState(props.celeb);
    //const [formData, setFormData] = useState(null);
    const id = props.celeb?.id;
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleBirthday = (date) => {
        setFormData({ ...formData, birthday: date })
    }

    // const HandleOpen = () => {
    //     dispatch(findCelebById(id));
    //     //const celeb = useSelector(state => state.celebs.celeb);
    //     setFormData((prevCeleb) => { return celeb })
    //     setOpen(true);
    // };

    useEffect(() => {
        setFormData(props.celeb);
        setOpen(props.open);

    }, [props]);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(updateCeleb(id, formData));
        props.handleClose();
    };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    return (
        <div>
            <LocalizationProvider dateAdapter={DateAdapter}>
                {/* <Button variant="contained" disableRipple onClick={handleOpen}> */}
                    {/* <EditIcon onClick={HandleOpen}/> */}
                {/* </Button> */}
            { <Dialog fullWidth maxWidth={'lg'} open={open} onClose={props.handleClose} >
                    <DialogTitle>Update Celeb</DialogTitle>
                    <DialogContent >
                        <TextField
                            margin="dense"
                            name="first_name"
                            label="First Name"
                            type="text"
                            value={formData?.first_name}
                            onChange={handleChange}
                        />

                        <TextField
                            margin="dense"
                            name="last_name"
                            label="Last Name"
                            type="text"
                            value={formData?.last_name}
                            onChange={handleChange}
                        />

                        <MobileDatePicker
                            margin="dense"
                            label="Birthday"
                            inputFormat="MM/dd/yyyy"
                            value={formData?.birthday}
                            onChange={handleBirthday}
                            renderInput={(params) => <TextField {...params} />}
                        />

                        <TextField
                            margin="dense"
                            name="height"
                            label="Height (_'__)"
                            type="text"
                            value={formData?.height}
                            onChange={handleChange}
                        />

                        <TextField
                            margin="dense"
                            name="gender"
                            label="Gender"
                            type="text"
                            select
                            value={formData?.gender}
                            onChange={handleChange}
                        >
                            {genders.map((gender, index) => (
                                <MenuItem key={index} value={gender}>{gender}</MenuItem>
                            ))}
                            </TextField>

                        <TextField
                            margin="dense"
                            name="instagram"
                            label="Instagram Username"
                            type="text"
                            value={formData?.instagram}
                            onChange={handleChange}
                        />

                        <TextField
                            margin="dense"
                            name="twitter"
                            label="Twitter Username"
                            type="text"
                            value={formData?.twitter}
                            onChange={handleChange}
                        />

                        <TextField
                            margin="dense"
                            name="tiktok"
                            label="TikTok Username"
                            type="text"
                            value={formData?.tiktok}
                            onChange={handleChange}
                        />

                        <TextField
                            margin="dense"
                            name="is_junior"
                            select
                            label="Junior?"
                            value={formData?.is_junior}
                            onChange={handleChange}
                        >
                            <MenuItem key={1} value={true}>Yes</MenuItem>
                            <MenuItem key={2} value={false}>No</MenuItem>
                        </TextField>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.handleClose} variant="contained" color="error">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} variant="contained" color="primary">
                            Update Celeb
                        </Button>
                    </DialogActions>
                </Dialog>}
            </LocalizationProvider>
        </div>
    )
}

export default CelebEdit;