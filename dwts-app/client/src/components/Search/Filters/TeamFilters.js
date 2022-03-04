import React from 'react';
import {
    Box,
    Chip,
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
    placements,
    seasons,
} from '../../../constants/dropdowns';
import { useSelector } from 'react-redux';

function TeamFilters(props) {
    const pros = useSelector((state) => state.pros.pros);
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
                <FormControlLabel
                    value="placement"
                    control={<Radio />}
                    label="placement"
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
            <Typography variant="h5" mb={1}>
                Filter By
            </Typography>
            <Typography>Pro(s)</Typography>
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
            </Select>

            <Typography>Only Show Teams w/ Pictures?</Typography>
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
        </>
    );
}

export default TeamFilters;
