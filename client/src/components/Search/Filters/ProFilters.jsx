import React, { useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    FormControlLabel,
    MenuItem,
    OutlinedInput,
    Radio,
    RadioGroup,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { convertHeight } from '../../shared/functions';
import {
    agesInYears,
    genders,
    heightsInInches,
} from '../../../constants/dropdowns';
import { useDispatch, useSelector } from 'react-redux';
import * as actionType from '../../../constants/actionTypes';
import { initialProState } from '../../../reducers/initialState';

function ProFilters() {
    const [open, setOpen] = useState(false);
    const initialFilters = useSelector((state) => state.pros.filters);
    const [filters, setFilters] = useState(initialFilters);
    const dispatch = useDispatch();

    const handleOpen = () => {
        setFilters(initialFilters);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        dispatch({ type: actionType.PROFILTERS, payload: filters });
        setOpen(false);
    };

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleChangeFrom = (e) => {
        let tempArray = [...filters[e.target.name]];
        tempArray[0] = e.target.value;
        setFilters({ ...filters, [e.target.name]: tempArray });
    };

    const handleChangeTo = (e) => {
        let tempArray = [...filters[e.target.name]];
        tempArray[1] = e.target.value;
        setFilters({ ...filters, [e.target.name]: tempArray });
    };

    const handleClear = () => {
        setFilters(Object.assign({}, initialProState.filters));
        console.log(filters);
    };

    return (
        <>
            <Button color="inherit" onClick={handleOpen}>
                <FilterListIcon />
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogContent>
                    <FormControl>
                        <Typography variant="h5">Sort By</Typography>
                        <RadioGroup
                            name="sortBy"
                            value={filters.sortBy}
                            onChange={handleChange}
                            row
                        >
                            <FormControlLabel
                                value="firstName"
                                control={<Radio />}
                                label="First Name"
                            />
                            <FormControlLabel
                                value="lastName"
                                control={<Radio />}
                                label="Last Name"
                            />
                            <FormControlLabel
                                value="age"
                                control={<Radio />}
                                label="Age"
                            />
                            <FormControlLabel
                                value="height"
                                control={<Radio />}
                                label="Height"
                            />
                        </RadioGroup>

                        <Stack
                            direction="row"
                            spacing={1}
                            mb={1}
                            alignItems="center"
                        >
                            <Typography variant="h5">Filter By</Typography>
                            <Chip
                                size="small"
                                label="Reset Filters"
                                onClick={handleClear}
                            />
                        </Stack>

                        <Typography>Gender</Typography>
                        <Select
                            multiple
                            name="gender"
                            value={filters.gender}
                            onChange={handleChange}
                            input={<OutlinedInput />}
                            renderValue={(selected) => (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: 0.5,
                                    }}
                                >
                                    {selected.map((value) => (
                                        <Chip
                                            key={value}
                                            label={`${value} Pros`}
                                        />
                                    ))}
                                </Box>
                            )}
                        >
                            {genders.map((gender, index) => {
                                return (
                                    <MenuItem key={index} value={gender}>
                                        {gender} Pros
                                    </MenuItem>
                                );
                            })}
                        </Select>

                        <Typography>Height</Typography>
                        <Stack direction="row">
                            <TextField
                                select
                                margin="dense"
                                name="height"
                                value={filters.height[0]}
                                onChange={handleChangeFrom}
                            >
                                {heightsInInches.map((height, index) => {
                                    return (
                                        <MenuItem key={index} value={height}>
                                            {convertHeight(height)}
                                        </MenuItem>
                                    );
                                })}
                            </TextField>

                            <Typography alignSelf="center">to</Typography>

                            <TextField
                                select
                                margin="dense"
                                name="height"
                                value={filters.height[1]}
                                onChange={handleChangeTo}
                            >
                                {heightsInInches.map((height, index) => {
                                    return (
                                        <MenuItem key={index} value={height}>
                                            {convertHeight(height)}
                                        </MenuItem>
                                    );
                                })}
                            </TextField>
                        </Stack>
                        <Typography>Age</Typography>

                        <Stack direction="row">
                            <TextField
                                select
                                margin="dense"
                                name="age"
                                value={filters.age[0]}
                                onChange={handleChangeFrom}
                            >
                                {agesInYears.map((age, index) => {
                                    return (
                                        <MenuItem key={index} value={age}>
                                            {age}
                                        </MenuItem>
                                    );
                                })}
                            </TextField>

                            <Typography alignSelf="center">to</Typography>

                            <TextField
                                select
                                margin="dense"
                                name="age"
                                value={filters.age[1]}
                                onChange={handleChangeTo}
                            >
                                {agesInYears.map((age, index) => {
                                    return (
                                        <MenuItem key={index} value={age}>
                                            {age}
                                        </MenuItem>
                                    );
                                })}
                            </TextField>
                        </Stack>

                        <Typography>Show Junior Pros?</Typography>
                        <RadioGroup
                            name="showJuniors"
                            value={filters.showJuniors}
                            onChange={handleChange}
                            row
                        >
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
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Apply</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ProFilters;
