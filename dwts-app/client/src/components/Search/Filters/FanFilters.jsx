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
    Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import * as actionType from '../../../constants/actionTypes';
import { fetchTeams } from '../../../actions/teams';
import { createLoadingSelector } from '../../../api/selectors';
import Progress from '../../shared/Progress';

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

    useEffect(() => {
        dispatch(fetchTeams());
    }, [dispatch]);

    const handleOpen = () => {
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

    return (
        <>
            <Button color="inherit" onClick={handleOpen}>
                <FilterListIcon />
            </Button>

            <Dialog open={open} onClose={handleClose} fullWidth>
                {loading ? (
                    <Progress />
                ) : (
                    <>
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
                                <Typography variant="h5" mb={1}>
                                    Filter By
                                </Typography>

                                <Typography>Favorite Pros</Typography>
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
                                        )}
                                    >
                                        {pros.map((pro, index) => {
                                            return (
                                                <MenuItem
                                                    key={index}
                                                    value={pro.id}
                                                >
                                                    {pro.first_name}{' '}
                                                    {pro?.last_name}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>

                                <Typography>Favorite Teams</Typography>
                                <FormControl margin="dense">
                                    <Select
                                        multiple
                                        name="teams"
                                        value={filters.teams}
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
                                        )}
                                    >
                                        {teams.map((team, index) => {
                                            return (
                                                <MenuItem
                                                    key={index}
                                                    value={team.id}
                                                >
                                                    {team.celeb.first_name} &{' '}
                                                    {team.pro.first_name}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="contained" onClick={handleSubmit}>
                                Apply
                            </Button>
                        </DialogActions>{' '}
                    </>
                )}
            </Dialog>
        </>
    );
}

export default FanFilters;
