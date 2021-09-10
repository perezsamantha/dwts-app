import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, makeStyles, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { addDance } from '../../actions/dances';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPros } from '../../actions/pros';
import styles from '../../constants/danceStyles';

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

function DanceAdd() {
    const classes = useStyles();

    const initialState = {
        season: '',
        week: '',
        night: '',
        style: '',
        isPerfect: false,
    };
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const dispatch = useDispatch();
    const pros = useSelector(state => state.pros.pros);

    useEffect(() => {
        dispatch(fetchPros());
    }, [dispatch])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(addDance(formData));
        setFormData(initialState);
        handleClose();
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        !Array.isArray(pros) ? <div>loading bar</div> : <div style={{ height: "15px" }}>
            <Button className={classes.button} disableRipple onClick={handleOpen}>
                <AddIcon />
            </Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>Add Dance</DialogTitle>
                <DialogContent className={classes.root} spacing={5}>
                    {/* <TextField
                        className={classes.names}
                        margin="dense"
                        name="style"
                        label="style"
                        type="text"
                        value={formData.style}
                        onChange={handleChange}
                    /> */}
                    {/* <FormControl className={classes.names}>
                        <InputLabel id="pro">Pro</InputLabel>
                        <Select
                            labelId="pro"
                            name="pro"
                            value={formData.pro}
                            onChange={handleChange}
                        >   
                        {pros.map((pro, index) => (
                            <MenuItem key={index} value={pro.name}>{pro.name}</MenuItem>
                        ))}
                        </Select>
                    </FormControl> */}
                    <FormControl className={classes.names}>
                        <InputLabel id="pro">Style</InputLabel>
                        <Select
                            labelId="style"
                            name="style"
                            value={formData.style}
                            onChange={handleChange}
                        >   
                        {styles.map((style, index) => (
                            <MenuItem key={index} value={style}>{style}</MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Add Dance
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DanceAdd;

