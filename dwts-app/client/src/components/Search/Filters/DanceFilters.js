import React from 'react';
import {
    Box,
    Chip,
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
import { useSelector } from 'react-redux';

function DanceFilters(props) {
    //const pros = useSelector((state) => state.pros.pros);
    const { filters, handleChange, handleChangeFrom, handleChangeTo } = props;

    return (
        <>
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
            <Typography>Styles</Typography>
            <Select
                multiple
                name="styles"
                value={filters.styles}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => {
                            return <Chip key={value} label={value} />;
                        })}
                    </Box>
                )}
            >
                {styles.map((style, index) => {
                    return (
                        <MenuItem key={index} value={style}>
                            {style}
                        </MenuItem>
                    );
                })}
            </Select>
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
                            sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                        >
                            {selected.map((value) => {
                                return <Chip key={value} label={value} />;
                            })}
                        </Box>
                    )}
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

            <Typography>Only Show Dances w/ Pictures?</Typography>
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
        </>
    );
}

export default DanceFilters;
