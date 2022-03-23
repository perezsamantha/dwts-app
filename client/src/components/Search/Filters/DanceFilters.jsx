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
import {
    placements,
    seasons,
    styles,
    themes,
    weeks,
} from '../../../constants/dropdowns';
import { useDispatch, useSelector } from 'react-redux';
import * as actionType from '../../../constants/actionTypes';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

//TODO: clear filters button?

function DanceFilters(props) {
    const [open, setOpen] = useState(false);
    const initialFilters = useSelector((state) => state.dances.filters);
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
        dispatch({ type: actionType.DANCEFILTERS, payload: filters });
        //props.setFilters(filters);
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
                                label="Season Descending"
                            />
                            <FormControlLabel
                                value="seasonAsc"
                                control={<Radio />}
                                label="Season Ascending"
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
                                label="Most Liked"
                            />
                        </RadioGroup>
                        <Typography variant="h5" mb={1}>
                            Filter By
                        </Typography>
                        <FormControl>
                            <Typography>Styles</Typography>
                            <Select
                                multiple
                                name="styles"
                                value={filters.styles}
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
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {styles.map((style) => (
                                    <MenuItem key={style} value={style}>
                                        {style}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <Typography>Themes</Typography>
                            <Select
                                multiple
                                name="themes"
                                value={filters.themes}
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
                                            return (
                                                <Chip
                                                    key={value}
                                                    label={value}
                                                />
                                            );
                                        })}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {themes.map((theme, index) => {
                                    return (
                                        <MenuItem key={index} value={theme}>
                                            {theme}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        {/* <Typography>Pro(s)</Typography>
            <Select
                multiple
                name="pros"
                value={filters.pros}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => {
                            const pro = pros.find((pro) => pro.id === value);
                            const name = pro.first_name + ' ' + pro?.last_name;
                            return <Chip key={value} label={name} />;
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
            </Select> */}
                        {/* teams */}

                        <Typography>Seasons</Typography>
                        <Stack direction="row">
                            <TextField
                                select
                                margin="dense"
                                name="seasons"
                                value={filters.seasons[0]}
                                onChange={handleChangeFrom}
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

                        <Typography>Weeks</Typography>
                        <Stack direction="row">
                            <TextField
                                select
                                margin="dense"
                                name="weeks"
                                value={filters.weeks[0]}
                                onChange={handleChangeFrom}
                            >
                                {weeks.map((week, index) => {
                                    return (
                                        <MenuItem key={index} value={week}>
                                            {week}
                                        </MenuItem>
                                    );
                                })}
                            </TextField>

                            <Typography alignSelf="center">to</Typography>

                            <TextField
                                select
                                margin="dense"
                                name="weeks"
                                value={filters.weeks[1]}
                                onChange={handleChangeTo}
                            >
                                {weeks.map((week, index) => {
                                    return (
                                        <MenuItem key={index} value={week}>
                                            {week}
                                        </MenuItem>
                                    );
                                })}
                            </TextField>
                        </Stack>

                        <Typography>Running Order</Typography>

                        <Stack direction="row">
                            <TextField
                                select
                                margin="dense"
                                name="runningOrders"
                                value={filters.runningOrders[0]}
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
                                name="runningOrders"
                                value={filters.runningOrders[1]}
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

export default DanceFilters;
