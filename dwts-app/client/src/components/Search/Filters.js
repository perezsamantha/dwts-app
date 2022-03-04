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
} from '@mui/material';
import ProFilters from './Filters/ProFilters';

function Filters(props) {
    const [open, setOpen] = useState(false);
    //const { filters, setFilters } = props;
    const { finalFilters, setFinalFilters, type } = props;

    const [filters, setFilters] = useState(finalFilters);

    const handleOpen = () => {
        setFilters(finalFilters);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        setFinalFilters(filters);
        setOpen(false);
    };

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleChangeFrom = (e) => {
        let tempArray = filters[e.target.name];
        tempArray[0] = e.target.value;
        setFilters({ ...filters, [e.target.name]: tempArray });
    };

    const handleChangeTo = (e) => {
        let tempArray = filters[e.target.name];
        tempArray[1] = e.target.value;
        setFilters({ ...filters, [e.target.name]: tempArray });
    };

    const FilterComponent = () => {
        switch (type) {
            case '/search/pros':
                return (
                    <ProFilters
                        filters={filters}
                        handleChange={handleChange}
                        handleChangeFrom={handleChangeFrom}
                        handleChangeTo={handleChangeTo}
                    />
                );
            default:
                return <></>;
        }
    };

    return (
        <>
            <Button color="inherit" onClick={handleOpen}>
                <FilterListIcon />
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
                        <FilterComponent />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleSubmit}>
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Filters;
