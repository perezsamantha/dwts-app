import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { addPro } from '../../actions/pros';
import { useDispatch } from 'react-redux';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker2, TextField1, TextField2, AddButton } from '../shared/muiStyles';

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
        color: "grey",
    },
}));

function ProAdd() {
    const classes = useStyles();

    const initialState = {
        name: '',
        birthday: new Date().toISOString(),
        proSocials: {
            instagram: '',
            twitter: '',
            facebook: ''
        }
    };
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        if (["instagram", "twitter", "facebook"].includes(e.target.name)) {
            setFormData({ ...formData, proSocials: { ...formData.proSocials, [e.target.name]: e.target.value  } })
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleBirthday = (date) => {
        setFormData({ ...formData, birthday: date })
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(addPro(formData));
        setFormData(initialState);
        handleClose();
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div><MuiPickersUtilsProvider utils={DateFnsUtils}>
            <AddButton disableRipple onClick={handleOpen}>
                <AddIcon />
            </AddButton>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>Add Pro</DialogTitle>
                <DialogContent className={classes.root} spacing={5}>
                    <TextField2
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <KeyboardDatePicker2
                        margin="dense"
                        label="birthday"
                        name="Birthday"
                        format="MM/dd/yyyy"
                        value={formData.birthday}
                        onChange={handleBirthday}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />

                    <TextField1
                        margin="dense"
                        name="instagram"
                        label="Pro Instagram (Username)"
                        type="text"
                        value={formData.proSocials?.instagram}
                        onChange={handleChange}
                    />
                    
                    <TextField1
                        margin="dense"
                        name="twitter"
                        label="Pro Twitter (Username)"
                        type="text"
                        value={formData.proSocials?.twitter}
                        onChange={handleChange}
                    />

                    <TextField1
                        margin="dense"
                        name="facebook"
                        label="Pro Facebook (Username)"
                        type="text"
                        value={formData.proSocials?.facebook}
                        onChange={handleChange}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Add Pro
                    </Button>
                </DialogActions>
            </Dialog></MuiPickersUtilsProvider>
        </div>
    )
}

export default ProAdd;