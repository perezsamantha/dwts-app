import React, { useEffect, useState } from 'react';
import { MenuItem, TextField, Avatar } from '@mui/material';
import { MobileDatePicker } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';

import * as tableType from '../../constants/tableTypes';
import { genders, placements } from '../../constants/dropdowns';
import CoverPicUpload from '../shared/CoverPicUpload';
import { PhotoContainer } from '../shared/shared';

function DialogFields(props) {

    const formData = props.formData;
    const table = props.table;
    const handleChange = props.handleChange;
    const handleBirthday = props.handleBirthday;
    const celebs = props.celebs;
    const pros = props.pros;
    const seasons = props.seasons;

    useEffect(() => {

    }, []);

    return (
        <div>
            {Array.of('Celeb', 'Pro', tableType.SEASON, tableType.TEAM).includes(table) && props.dialog === 'Edit' &&
                <PhotoContainer>
                    <Avatar sx={{ width: 150, height: 150 }} src={formData?.cover_pic} />

                    <CoverPicUpload
                        editor={props.editor}
                        setEditor={props.setEditor}
                        fileData={props.fileData}
                        setFileData={props.setFileData}
                    />
                </PhotoContainer>
            }

            {Array.of('Celeb', 'Pro').includes(table) &&
                <TextField
                    margin="dense"
                    name="first_name"
                    label="First Name"
                    type="text"
                    value={formData?.first_name}
                    onChange={handleChange}
                />
            }

            {Array.of('Celeb', 'Pro').includes(table) &&
                <TextField
                    margin="dense"
                    name="last_name"
                    label="Last Name"
                    type="text"
                    value={formData?.last_name}
                    onChange={handleChange}
                />
            }

            {/* change to dropdown of constants */}
            {Array.of(tableType.SEASON).includes(table) &&
                <TextField
                    margin="dense"
                    name="number"
                    label="Number"
                    type="text"
                    value={formData?.number}
                    onChange={handleChange}
                />
            }

            {Array.of(tableType.TEAM).includes(table) &&
                <TextField
                    margin="dense"
                    name="celeb_id"
                    label="Celeb"
                    type="text"
                    select
                    value={formData?.celeb_id}
                    onChange={handleChange}
                >
                    {celebs.map((celeb, index) => (
                        <MenuItem key={index} value={celeb.id}>{celeb.first_name} {celeb?.last_name}</MenuItem>
                    ))}
                </TextField>
            }

            {Array.of(tableType.TEAM).includes(table) &&
                <TextField
                    margin="dense"
                    name="pro_id"
                    label="Pro"
                    type="text"
                    select
                    value={formData?.pro_id}
                    onChange={handleChange}
                >
                    {pros.map((pro, index) => (
                        <MenuItem key={index} value={pro.id}>{pro.first_name} {pro?.last_name}</MenuItem>
                    ))}
                </TextField>
            }

            {Array.of(tableType.TEAM).includes(table) &&
                <TextField
                    margin="dense"
                    name="mentor_id"
                    label="Mentor"
                    type="text"
                    select
                    value={formData?.mentor_id}
                    onChange={handleChange}
                >
                    {pros.map((pro, index) => (
                        <MenuItem key={index} value={pro.id}>{pro.first_name} {pro?.last_name}</MenuItem>
                    ))}
                </TextField>
            }

            {Array.of(tableType.TEAM).includes(table) &&
                <TextField
                    margin="dense"
                    name="season_id"
                    label="Season"
                    type="text"
                    select
                    value={formData?.season_id}
                    onChange={handleChange}
                >
                    {seasons.map((season, index) => (
                        <MenuItem key={index} value={season.id}>{season.number}</MenuItem>
                    ))}
                </TextField>
            }

            {Array.of(tableType.TEAM).includes(table) &&
                <TextField
                    margin="dense"
                    name="placement"
                    label="Placement"
                    type="text"
                    select
                    value={formData?.placement}
                    onChange={handleChange}
                >
                    {placements.map((placement, index) => (
                        <MenuItem key={index} value={placement}>{placement}</MenuItem>
                    ))}
                </TextField>
            }

            {Array.of(tableType.TEAM).includes(table) &&
                <TextField
                    margin="dense"
                    name="team_name"
                    label="Team Name"
                    type="text"
                    value={formData?.team_name}
                    onChange={handleChange}
                />
            }

            {Array.of(tableType.SEASON, tableType.TEAM).includes(table) &&
                <TextField
                    margin="dense"
                    name="extra"
                    label="Extra"
                    type="text"
                    value={formData?.extra}
                    onChange={handleChange}
                />
            }

            {Array.of('Celeb', 'Pro').includes(table) &&
                <MobileDatePicker
                    margin="dense"
                    label="Birthday"
                    inputFormat="MM/dd/yyyy"
                    value={formData?.birthday}
                    onChange={handleBirthday}
                    renderInput={(params) => <TextField {...params} />}
                />
            }

            {Array.of('Celeb', 'Pro').includes(table) &&
                <TextField
                    margin="dense"
                    name="height"
                    label="Height (_'__)"
                    type="text"
                    value={formData?.height}
                    onChange={handleChange}
                />}

            {Array.of('Celeb', 'Pro').includes(table) &&
                <TextField
                    margin="dense"
                    name="gender"
                    label="Gender"
                    type="text"
                    select
                    value={formData?.gender}
                    onChange={handleChange}
                >
                    {genders.map((gender, index) => (
                        <MenuItem key={index} value={gender}>{gender}</MenuItem>
                    ))}
                </TextField>
            }

            {Array.of('Celeb', 'Pro').includes(table) &&
                <TextField
                    margin="dense"
                    name="instagram"
                    label="Instagram Username"
                    type="text"
                    value={formData?.instagram}
                    onChange={handleChange}
                />
            }

            {Array.of('Celeb', 'Pro').includes(table) &&
                <TextField
                    margin="dense"
                    name="twitter"
                    label="Twitter Username"
                    type="text"
                    value={formData?.twitter}
                    onChange={handleChange}
                />
            }

            {Array.of('Celeb', 'Pro').includes(table) &&
                <TextField
                    margin="dense"
                    name="tiktok"
                    label="TikTok Username"
                    type="text"
                    value={formData?.tiktok}
                    onChange={handleChange}
                />
            }

            {Array.of('Celeb', 'Pro').includes(table) &&
                <TextField
                    margin="dense"
                    name="is_junior"
                    select
                    label="Junior?"
                    value={formData?.is_junior}
                    onChange={handleChange}
                >
                    <MenuItem key={1} value={true}>Yes</MenuItem>
                    <MenuItem key={2} value={false}>No</MenuItem>
                </TextField>
            }



        </div>
    )
}

export default DialogFields;