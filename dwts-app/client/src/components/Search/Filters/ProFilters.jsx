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

//TODO: clear filters button?

function ProFilters(props) {
    const [open, setOpen] = useState(false);
    const [filters, setFilters] = useState(props.filters);

    const handleOpen = () => {
        setFilters(props.filters);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        props.setFilters(filters);
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
                            <FormControlLabel
                                value="avgPlacement"
                                control={<Radio />}
                                label="Average Placement"
                            />
                            <FormControlLabel
                                value="numPerfects"
                                control={<Radio />}
                                label="Perfect Scores"
                            />
                            <FormControlLabel
                                value="numWins"
                                control={<Radio />}
                                label="Wins"
                            />
                        </RadioGroup>
                        <Typography variant="h5" mb={1}>
                            Filter By
                        </Typography>
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

export default ProFilters;
