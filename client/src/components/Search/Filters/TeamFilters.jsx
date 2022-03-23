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
import { placements, seasons } from '../../../constants/dropdowns';
import { useDispatch, useSelector } from 'react-redux';
import * as actionType from '../../../constants/actionTypes';

//TODO: clear filters button?

function TeamFilters() {
    const [open, setOpen] = useState(false);
    const initialFilters = useSelector((state) => state.teams.filters);
    const [filters, setFilters] = useState(initialFilters);
    const pros = useSelector((state) => state.pros.pros);
    const dispatch = useDispatch();

    const handleOpen = () => {
        setFilters(initialFilters);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        dispatch({ type: actionType.TEAMFILTERS, payload: filters });
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
                                value="seasonDesc"
                                control={<Radio />}
                                label="Season (High to Low)"
                            />
                            <FormControlLabel
                                value="seasonAsc"
                                control={<Radio />}
                                label="Season (Low to High)"
                            />
                            <FormControlLabel
                                value="placement"
                                control={<Radio />}
                                label="Placement"
                            />
                            {/* <FormControlLabel
                    value="perfects"
                    control={<Radio />}
                    label="Perfect Scores"
                /> */}
                            {/* <FormControlLabel
                    value="avgScore"
                    control={<Radio />}
                    label="Average Score"
                /> */}
                        </RadioGroup>

                        <Typography variant="h5" my={1}>
                            Filter By
                        </Typography>

                        <Typography>Pro(s)</Typography>
                        <FormControl margin="dense">
                            <Select
                                multiple
                                name="pros"
                                value={filters.pros}
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
                                        {selected.map((value) => {
                                            const pro = pros.find(
                                                (pro) => pro.id === value
                                            );
                                            const name =
                                                pro.first_name +
                                                ' ' +
                                                pro?.last_name;
                                            return (
                                                <Chip
                                                    key={value}
                                                    label={name}
                                                />
                                            );
                                        })}
                                    </Box>
                                )}
                            >
                                {pros.map((pro, index) => {
                                    return (
                                        <MenuItem key={index} value={pro.id}>
                                            {pro.first_name} {pro?.last_name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>

                        <Typography>Seasons</Typography>
                        <Stack direction="row">
                            <TextField
                                select
                                margin="dense"
                                name="seasons"
                                value={filters.seasons[0]}
                                onChange={handleChangeFrom}
                                sx={{
                                    '&.MuiOutlinedInput-root': {
                                        marginLeft: 0,
                                    },
                                }}
                            >
                                {seasons.map((season, index) => {
                                    return (
                                        <MenuItem key={index} value={season}>
                                            {season}
                                        </MenuItem>
                                    );
                                })}
                            </TextField>

                            <Typography alignSelf="center">to</Typography>

                            <TextField
                                select
                                margin="dense"
                                name="seasons"
                                value={filters.seasons[1]}
                                onChange={handleChangeTo}
                            >
                                {seasons.map((season, index) => {
                                    return (
                                        <MenuItem key={index} value={season}>
                                            {season}
                                        </MenuItem>
                                    );
                                })}
                            </TextField>
                        </Stack>

                        <Typography>Placements</Typography>
                        <Stack direction="row">
                            <TextField
                                select
                                margin="dense"
                                name="placements"
                                value={filters.placements[0]}
                                onChange={handleChangeFrom}
                            >
                                {placements.map((placement, index) => {
                                    return (
                                        <MenuItem key={index} value={placement}>
                                            {placement}
                                        </MenuItem>
                                    );
                                })}
                            </TextField>

                            <Typography alignSelf="center">to</Typography>

                            <TextField
                                select
                                margin="dense"
                                name="placements"
                                value={filters.placements[1]}
                                onChange={handleChangeTo}
                            >
                                {placements.map((placement, index) => {
                                    return (
                                        <MenuItem key={index} value={placement}>
                                            {placement}
                                        </MenuItem>
                                    );
                                })}
                            </TextField>
                        </Stack>

                        <Typography>Must Have Pictures?</Typography>
                        <RadioGroup
                            name="hasPictures"
                            value={filters.hasPictures}
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

export default TeamFilters;
