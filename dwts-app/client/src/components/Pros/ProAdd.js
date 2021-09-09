import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { addPro } from '../../actions/pros';
import { useDispatch } from 'react-redux';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

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
    names: {
        width: "20ch"
    },
    numbers: {
        width: "10ch"
    }
}));

function ProAdd() {
    const classes = useStyles();

    const initialState = {
        name: '',
        birthday: new Date().toISOString()
    };
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(e)
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
            <Button className={classes.button} disableRipple onClick={handleOpen}>
                <AddIcon />
            </Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>Add Pro</DialogTitle>
                <DialogContent className={classes.root} spacing={5}>
                        <TextField
                            className={classes.names}
                            margin="dense"
                            name="name"
                            label="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        
                            <KeyboardDatePicker 
                                margin="dense"
                                label="birthday"
                                name="birthday"
                                format="MM/dd/yyyy"
                                value={formData.birthday}
                                onChange={handleBirthday}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
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