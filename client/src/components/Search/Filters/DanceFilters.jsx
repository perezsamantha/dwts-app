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
import { seasons, styles, themes, weeks } from '../../../constants/dropdowns';
import { useDispatch, useSelector } from 'react-redux';
import * as actionType from '../../../constants/actionTypes';
import { createLoadingSelector } from '../../../api/selectors';
import { fetchTeams } from '../../../actions/teams';
import Progress from '../../shared/Progress';
import { initialDanceState } from '../../../reducers/initialState';

function DanceFilters() {
    const [open, setOpen] = useState(false);
    const initialFilters = useSelector((state) => state.dances.filters);
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
        dispatch({ type: actionType.DANCEFILTERS, payload: filters });
        setOpen(false);
    };

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleClear = () => {
        setFilters(initialDanceState.filters);
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
                                        value="episodeDesc"
                                        control={<Radio />}
                                        label="Episode (↑ to ↓)"
                                    />
                                    <FormControlLabel
                                        value="episodeAsc"
                                        control={<Radio />}
                                        label="Episode (↓ to ↑)"
                                    />
                                    {/* <FormControlLabel
                    value="scoreDesc"
                    control={<Radio />}
                    label="Score (High to Low)"
                /> */}
                                    {/* <FormControlLabel
                    value="scoreAsc"
                    control={<Radio />}
                    label="Score (Low to High)"
                /> */}
                                    <FormControlLabel
                                        value="likes"
                                        control={<Radio />}
                                        label="Most Likes"
                                    />
                                </RadioGroup>

                                <Stack
                                    direction="row"
                                    spacing={1}
                                    mb={1}
                                    alignItems="center"
                                >
                                    <Typography variant="h5">
                                        Filter By
                                    </Typography>
                                    <Button onClick={handleClear} size="small">
                                        Clear Filters
                                    </Button>
                                </Stack>

                                <FormControl>
                                    <Typography>Styles</Typography>
                                    <Select
                                        multiple
                                        displayEmpty
                                        name="styles"
                                        value={filters.styles}
                                        onChange={handleChange}
                                        input={<OutlinedInput />}
                                        renderValue={(selected) => {
                                            if (selected.length === 0) {
                                                return <em>All Styles</em>;
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
                                            All Styles
                                        </MenuItem>
                                        {styles.map((style) => (
                                            <MenuItem key={style} value={style}>
                                                {style}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <Typography>Theme Weeks</Typography>
                                    <Select
                                        multiple
                                        displayEmpty
                                        name="themes"
                                        value={filters.themes}
                                        onChange={handleChange}
                                        input={<OutlinedInput />}
                                        renderValue={(selected) => {
                                            if (selected.length === 0) {
                                                return <em>All Themes</em>;
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
                                            All Themes
                                        </MenuItem>
                                        {themes.map((theme, index) => (
                                            <MenuItem key={index} value={theme}>
                                                {theme}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <Typography>Teams</Typography>
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
                                                return <em>All Teams</em>;
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
                                                                team.id ===
                                                                value
                                                        );
                                                        const name =
                                                            team.celeb
                                                                .first_name +
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
                                            All Teams
                                        </MenuItem>
                                        {teams.map((team, index) => (
                                            <MenuItem
                                                key={index}
                                                value={team.id}
                                            >
                                                {team.celeb.first_name} &{' '}
                                                {team.pro.first_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <Typography>Pros</Typography>
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
                                            <MenuItem
                                                key={index}
                                                value={pro.id}
                                            >
                                                {pro.first_name}{' '}
                                                {pro?.last_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl>
                                    <Typography>Seasons</Typography>
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
                                        {seasons.map((season) => (
                                            <MenuItem
                                                key={season}
                                                value={season}
                                            >
                                                {season}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl>
                                    <Typography>Weeks</Typography>
                                    <Select
                                        multiple
                                        displayEmpty
                                        name="weeks"
                                        value={filters.weeks}
                                        onChange={handleChange}
                                        input={<OutlinedInput />}
                                        renderValue={(selected) => {
                                            if (selected.length === 0) {
                                                return <em>All Weeks</em>;
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
                                            All Weeks
                                        </MenuItem>
                                        {weeks.map((week) => (
                                            <MenuItem key={week} value={week}>
                                                {week}
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

                                <Typography>Must Have Link?</Typography>
                                <RadioGroup
                                    name="hasLink"
                                    value={filters.hasLink}
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
                            <Button variant="text" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="text" onClick={handleSubmit}>
                                Apply
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </>
    );
}

export default DanceFilters;
