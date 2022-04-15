import React, { useState, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import * as actionType from '../../../constants/actionTypes';
import { fetchTeams } from '../../../actions/teams';
import { createLoadingSelector } from '../../../api/selectors';
import Progress from '../../shared/Progress';
import { initialUserState } from '../../../reducers/initialState';

function FanFilters() {
    const [open, setOpen] = useState(false);
    const initialFilters = useSelector((state) => state.users.filters);
    const [filters, setFilters] = useState(initialFilters);
    const pros = useSelector((state) => state.pros.pros);
    const teams = useSelector((state) => state.teams.teams);
    const dispatch = useDispatch();

    const loadingSelector = createLoadingSelector([
        actionType.TEAMSEARCH,
        actionType.PROSEARCH,
    ]);
    const loading = useSelector((state) => loadingSelector(state));

    useEffect(() => {}, []);

    const handleOpen = () => {
        dispatch(fetchTeams());
        setFilters(initialFilters);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        dispatch({ type: actionType.FANFILTERS, payload: filters });
        setOpen(false);
    };

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleClear = () => {
        setFilters(initialUserState.filters);
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
                                value="username"
                                control={<Radio />}
                                label="Username"
                            />
                            <FormControlLabel
                                value="nickname"
                                control={<Radio />}
                                label="Nickname"
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

                        <Typography>Favorite Pros</Typography>
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
                                            return <em>Any Pro</em>;
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
                                        Any Pro
                                    </MenuItem>
                                    {pros.map((pro, index) => (
                                        <MenuItem key={index} value={pro.id}>
                                            {pro.first_name} {pro?.last_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}

                        <Typography>Favorite Teams</Typography>
                        {loading ? (
                            <Progress />
                        ) : (
                            <FormControl>
                                <Select
                                    multiple
                                    displayEmpty
                                    name="teams"
                                    value={filters.teams}
                                    onChange={handleChange}
                                    input={<OutlinedInput />}
                                    renderValue={(selected) => {
                                        if (selected.length === 0) {
                                            return <em>Any Team</em>;
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
                                                    const team = teams.find(
                                                        (team) =>
                                                            team.id === value
                                                    );
                                                    const name =
                                                        team.celeb.first_name +
                                                        ' & ' +
                                                        team.pro.first_name;
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
                                        Any Team
                                    </MenuItem>
                                    {teams.map((team, index) => (
                                        <MenuItem key={index} value={team.id}>
                                            {team.celeb.first_name} &{' '}
                                            {team.pro.first_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
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

export default FanFilters;
