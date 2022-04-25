import React, { useEffect, useState } from 'react';
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
    Typography,
} from '@mui/material';
import { placements, seasonNumbers } from '../../../constants/dropdowns';
import { useDispatch, useSelector } from 'react-redux';
import * as actionType from '../../../constants/actionTypes';
import { initialTeamState } from '../../../reducers/initialState';
import { createLoadingSelector } from '../../../api/selectors';
import Progress from '../../shared/Progress';
import { fetchPros } from '../../../actions/pros';
import { convertPlacement } from '../../shared/functions';

function TeamFilters() {
    const [open, setOpen] = useState(false);
    const initialFilters = useSelector((state) => state.teams.filters);
    const [filters, setFilters] = useState(initialFilters);
    const pros = useSelector((state) => state.pros.pros);
    const dispatch = useDispatch();

    const loadingSelector = createLoadingSelector([actionType.PROSEARCH]);
    const loading = useSelector((state) => loadingSelector(state));

    useEffect(() => {}, []);

    const handleOpen = () => {
        dispatch(fetchPros());
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

    const handleClear = () => {
        setFilters(initialTeamState.filters);
    };

    return (
        <>
            <Button onClick={handleOpen}>
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
                                label="Season"
                            />
                            {/* <FormControlLabel
                                value="seasonAsc"
                                control={<Radio />}
                                label="Season (↓ to ↑)"
                            /> */}
                            <FormControlLabel
                                value="placementAsc"
                                control={<Radio />}
                                label="Placement"
                            />
                            {/* <FormControlLabel
                                value="placementDesc"
                                control={<Radio />}
                                label="Placement (↓ to ↑)"
                            /> */}
                            <FormControlLabel
                                value="likes"
                                control={<Radio />}
                                label="Season Favs"
                            />
                            {/* <FormControlLabel
                                        value="avgScore"
                                        control={<Radio />}
                                        label="Average Score"
                                    /> */}
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

                        <Typography>Pros</Typography>
                        {loading ? (
                            <Progress />
                        ) : (
                            <FormControl>
                                <Select
                                    multiple
                                    displayEmpty
                                    name="pros"
                                    value={filters.pros}
                                    onChange={handleChange}
                                    input={<OutlinedInput />}
                                    renderValue={(selected) => {
                                        if (selected.length === 0) {
                                            return <em>All Pros</em>;
                                        }
                                        return (
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    gap: 0.5,
                                                }}
                                            >
                                                {selected.map((value) => {
                                                    const pro = pros.find(
                                                        (pro) =>
                                                            pro.id === value
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
                                        );
                                    }}
                                >
                                    <MenuItem disabled value="">
                                        All Pros
                                    </MenuItem>
                                    {pros.map((pro, index) => (
                                        <MenuItem key={index} value={pro.id}>
                                            {pro.first_name} {pro?.last_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}

                        <Typography>Seasons</Typography>
                        <FormControl>
                            <Select
                                multiple
                                displayEmpty
                                name="seasons"
                                value={filters.seasons}
                                onChange={handleChange}
                                input={<OutlinedInput />}
                                renderValue={(selected) => {
                                    if (selected.length === 0) {
                                        return <em>All Seasons</em>;
                                    }
                                    return (
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
                                                    label={value}
                                                />
                                            ))}
                                        </Box>
                                    );
                                }}
                            >
                                <MenuItem disabled value="">
                                    All Seasons
                                </MenuItem>
                                {seasonNumbers.map((season) => (
                                    <MenuItem key={season} value={season}>
                                        {season}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Typography>Placements</Typography>
                        <FormControl>
                            <Select
                                multiple
                                displayEmpty
                                name="placements"
                                value={filters.placements}
                                onChange={handleChange}
                                input={<OutlinedInput />}
                                renderValue={(selected) => {
                                    if (selected.length === 0) {
                                        return <em>All Placements</em>;
                                    }
                                    return (
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
                                                    label={convertPlacement(
                                                        value
                                                    )}
                                                />
                                            ))}
                                        </Box>
                                    );
                                }}
                            >
                                <MenuItem disabled value="">
                                    All Placements
                                </MenuItem>
                                {placements.map((placement) => (
                                    <MenuItem key={placement} value={placement}>
                                        {convertPlacement(placement)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

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
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Apply</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default TeamFilters;
