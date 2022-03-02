import React, { useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Typography,
} from '@mui/material';

function Filters() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('female');
    const [value2, setValue2] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleChange2 = (event) => {
        setValue2(event.target.value);
    };

    return (
        <>
            <Button>
                <FilterListIcon color="inherit" onClick={handleOpen} />
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Testing</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        for pros - by age, height, gender, is_junior
                    </DialogContentText>
                    <DialogContentText>
                        for teams - by season(?? maybe slider?), placement, has
                        pictures?, pro,
                    </DialogContentText>
                    <DialogContentText>
                        for dances - by style (chips), season (slider), week,
                        score, running order?, has link, has pictures, theme
                    </DialogContentText>
                    <FormControl>
                        <Typography>Gender</Typography>
                        <RadioGroup value={value} onChange={handleChange} row>
                            <FormControlLabel
                                value="female"
                                control={<Radio />}
                                label="Female"
                            />
                            <FormControlLabel
                                value="male"
                                control={<Radio />}
                                label="Male"
                            />
                        </RadioGroup>
                        <Typography>Only show junior pros?</Typography>
                        <RadioGroup value={value2} onChange={handleChange2} row>
                            <FormControlLabel
                                value={true}
                                control={<Radio />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value={false}
                                control={<Radio />}
                                label="No"
                            />
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleClose}>
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Filters;
