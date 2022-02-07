import React, { useEffect, useState } from 'react';
import { MenuItem, TextField, Avatar } from '@mui/material';
import { MobileDatePicker } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';

import * as tableType from '../../constants/tableTypes';
import { genders, placements, weeks, styles, themes, runningOrders, scores, scoreOrders } from '../../constants/dropdowns';
import CoverPicUpload from '../shared/CoverPicUpload';
import { PhotoContainer } from '../shared/shared';
import { useSelector } from 'react-redux';
import { GetCelebName, GetDanceName, GetEpisodeNumber, GetJudgeName, GetProName, GetSeasonNumber, GetTeamName } from '../shared/functions';

function DialogFields(props) {

    const formData = props.formData;
    const table = props.table;
    const handleChange = props.handleChange;
    const handleBirthday = props.handleBirthday;
    const handleDate = props.handleDate;
    const celebs = useSelector(state => state.data.celebs);
    const pros = useSelector(state => state.data.pros);
    const seasons = useSelector(state => state.data.seasons);
    const episodes = useSelector(state => state.data.episodes);
    const judges = useSelector(state => state.data.judges);
    const dances = useSelector(state => state.data.dances);
    const teams = useSelector(state => state.data.teams);

    useEffect(() => {

    }, []);

    return (
        <div>
            {Array.of(tableType.CELEB, tableType.PRO, tableType.SEASON, tableType.TEAM).includes(table) && props.dialog === 'Edit' &&
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

            {Array.of(tableType.CELEB, tableType.PRO, tableType.JUDGE).includes(table) &&
                <TextField
                    margin="dense"
                    name="first_name"
                    label="First Name"
                    type="text"
                    value={formData?.first_name}
                    onChange={handleChange}
                />
            }

            {Array.of(tableType.CELEB, tableType.PRO, tableType.JUDGE).includes(table) &&
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

            {Array.of(tableType.SCORE, tableType.DANCER).includes(table) &&
                <TextField
                    margin="dense"
                    name="dance_id"
                    label="Dance"
                    type="text"
                    select
                    value={formData?.dance_id}
                    onChange={handleChange}
                >
                    {dances.map((dance, index) => {
                        const danceName = GetDanceName(dance.id); 
                        return (
                            // <MenuItem key={index} value={dance.id}>{dance?.episode_id} {dance?.style}</MenuItem>
                            <MenuItem key={index} value={dance.id}>{danceName}</MenuItem>
                        )
                    })}
                </TextField>
            }

            {Array.of(tableType.DANCER).includes(table) &&
                <TextField
                    margin="dense"
                    name="team_id"
                    label="Team"
                    type="text"
                    select
                    value={formData?.team_id}
                    onChange={handleChange}
                >
                    {teams.map((team, index) => {
                        const teamName = GetTeamName(team.id); 
                        return (
                            <MenuItem key={index} value={team.id}>{teamName}</MenuItem>
                        )
                    })}
                </TextField>
            }

            {Array.of(tableType.TEAM, tableType.DANCER).includes(table) &&
                <TextField
                    margin="dense"
                    name="celeb_id"
                    label="Celeb"
                    type="text"
                    select
                    value={formData?.celeb_id}
                    onChange={handleChange}
                >
                    {celebs.map((celeb, index) => {
                        const celebName = GetCelebName(celeb.id); 
                        return (
                            <MenuItem key={index} value={celeb.id}>{celebName}</MenuItem>
                        )
                    })}
                </TextField>
            }

            {Array.of(tableType.TEAM, tableType.DANCER).includes(table) &&
                <TextField
                    margin="dense"
                    name="pro_id"
                    label="Pro"
                    type="text"
                    select
                    value={formData?.pro_id}
                    onChange={handleChange}
                >
                    {pros.map((pro, index) => {
                        const proName = GetProName(pro.id); 
                        return (
                            <MenuItem key={index} value={pro.id}>{proName}</MenuItem>
                        )
                    })}
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
                    {pros.map((pro, index) => {
                        const proName = GetProName(pro.id); 
                        return (
                            <MenuItem key={index} value={pro.id}>{proName}</MenuItem>
                        )
                    })}
                </TextField>
            }

            {Array.of(tableType.TEAM, tableType.EPISODE).includes(table) &&
                <TextField
                    margin="dense"
                    name="season_id"
                    label="Season"
                    type="text"
                    select
                    value={formData?.season_id}
                    onChange={handleChange}
                >
                    {seasons.map((season, index) => {
                        const seasonNumber = GetSeasonNumber(season.id); 
                        return (
                            <MenuItem key={index} value={season.id}>{seasonNumber}</MenuItem>
                        )
                    })}
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

            {/* share getEp# function? */}
            {Array.of(tableType.DANCE).includes(table) &&
                <TextField
                    margin="dense"
                    name="episode_id"
                    label="Episode"
                    type="text"
                    select
                    value={formData?.episode_id}
                    onChange={handleChange}
                >
                    {episodes.map((episode, index) => {
                        const episodeNumber = GetEpisodeNumber(episode.id); 
                        return (
                            <MenuItem key={index} value={episode.id}>{episodeNumber}</MenuItem>
                        )
                    })}
                </TextField>
            }

            {Array.of(tableType.DANCE).includes(table) &&
                <TextField
                    margin="dense"
                    name="style"
                    label="Style"
                    type="text"
                    select
                    value={formData?.style}
                    onChange={handleChange}
                >
                    {styles.map((style, index) => (
                        <MenuItem key={index} value={style}>{style}</MenuItem>
                    ))}
                </TextField>
            }

            {Array.of(tableType.DANCE).includes(table) &&
                <TextField
                    margin="dense"
                    name="theme"
                    label="Theme"
                    type="text"
                    select
                    value={formData?.theme}
                    onChange={handleChange}
                >
                    {themes.map((theme, index) => (
                        <MenuItem key={index} value={theme}>{theme}</MenuItem>
                    ))}
                </TextField>
            }

            {Array.of(tableType.DANCE).includes(table) &&
                <TextField
                    margin="dense"
                    name="running_order"
                    label="Running Order"
                    type="text"
                    select
                    value={formData?.running_order}
                    onChange={handleChange}
                >
                    {runningOrders.map((ro, index) => (
                        <MenuItem key={index} value={ro}>{ro}</MenuItem>
                    ))}
                </TextField>
            }

            {Array.of(tableType.DANCE).includes(table) &&
                <TextField
                    margin="dense"
                    name="song_title"
                    label="Song Title"
                    type="text"
                    value={formData?.song_title}
                    onChange={handleChange}
                />
            }

            {Array.of(tableType.DANCE).includes(table) &&
                <TextField
                    margin="dense"
                    name="song_artist"
                    label="Song Artist"
                    type="text"
                    value={formData?.song_artist}
                    onChange={handleChange}
                />
            }

            {Array.of(tableType.DANCE).includes(table) &&
                <TextField
                    margin="dense"
                    name="link"
                    label="Link"
                    type="text"
                    value={formData?.link}
                    onChange={handleChange}
                />
            }

            {Array.of(tableType.DANCER).includes(table) &&
                <TextField
                    margin="dense"
                    name="is_background"
                    select
                    label="Background Dancer?"
                    value={formData?.is_background}
                    onChange={handleChange}
                >
                    <MenuItem key={1} value={true}>Yes</MenuItem>
                    <MenuItem key={2} value={false}>No</MenuItem>
                </TextField>
            }

            {/* EXTRA */}
            {Array.of(tableType.SEASON, tableType.TEAM, tableType.DANCE, tableType.DANCER).includes(table) &&
                <TextField
                    margin="dense"
                    name="extra"
                    label="Extra"
                    type="text"
                    value={formData?.extra}
                    onChange={handleChange}
                />
            }

            {Array.of(tableType.CELEB, tableType.PRO, tableType.JUDGE).includes(table) &&
                <MobileDatePicker
                    margin="dense"
                    label="Birthday"
                    inputFormat="MM/dd/yyyy"
                    value={formData?.birthday}
                    onChange={handleBirthday}
                    renderInput={(params) => <TextField {...params} />}
                />
            }

            {Array.of(tableType.EPISODE).includes(table) &&
                <TextField
                    margin="dense"
                    name="week"
                    label="Week"
                    type="text"
                    select
                    value={formData?.week}
                    onChange={handleChange}
                >
                    {weeks.map((week, index) => (
                        <MenuItem key={index} value={week}>{week}</MenuItem>
                    ))}
                </TextField>
            }

            {Array.of(tableType.EPISODE).includes(table) &&
                <TextField
                    margin="dense"
                    name="night"
                    select
                    label="Night"
                    value={formData?.night}
                    onChange={handleChange}
                >
                    <MenuItem key={1} value={1}>1</MenuItem>
                    <MenuItem key={2} value={2}>2</MenuItem>
                </TextField>
            }

            {Array.of(tableType.EPISODE).includes(table) &&
                <MobileDatePicker
                    margin="dense"
                    label="Date"
                    inputFormat="MM/dd/yyyy"
                    value={formData?.date}
                    onChange={handleDate}
                    renderInput={(params) => <TextField {...params} />}
                />
            }

            {Array.of(tableType.CELEB, tableType.PRO).includes(table) &&
                <TextField
                    margin="dense"
                    name="height"
                    label="Height (_'__)"
                    type="text"
                    value={formData?.height}
                    onChange={handleChange}
                />}

            {Array.of(tableType.CELEB, tableType.PRO).includes(table) &&
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

            {Array.of(tableType.CELEB, tableType.PRO).includes(table) &&
                <TextField
                    margin="dense"
                    name="instagram"
                    label="Instagram Username"
                    type="text"
                    value={formData?.instagram}
                    onChange={handleChange}
                />
            }

            {Array.of(tableType.CELEB, tableType.PRO).includes(table) &&
                <TextField
                    margin="dense"
                    name="twitter"
                    label="Twitter Username"
                    type="text"
                    value={formData?.twitter}
                    onChange={handleChange}
                />
            }

            {Array.of(tableType.CELEB, tableType.PRO).includes(table) &&
                <TextField
                    margin="dense"
                    name="tiktok"
                    label="TikTok Username"
                    type="text"
                    value={formData?.tiktok}
                    onChange={handleChange}
                />
            }

            {Array.of(tableType.CELEB, tableType.PRO).includes(table) &&
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

            {Array.of(tableType.SCORE).includes(table) &&
                <TextField
                    margin="dense"
                    name="judge_id"
                    label="Judge"
                    type="text"
                    select
                    value={formData?.judge_id}
                    onChange={handleChange}
                >
                    {judges.map((judge, index) => {
                        const judgeName = GetJudgeName(judge.id); 
                        return (
                            <MenuItem key={index} value={judge.id}>{judgeName}</MenuItem>
                        )
                    })}
                </TextField>
            }

            {Array.of(tableType.SCORE).includes(table) &&
                <TextField
                    margin="dense"
                    name="value"
                    label="Value"
                    type="text"
                    select
                    value={formData?.value}
                    onChange={handleChange}
                >
                    {scores.map((score, index) => (
                        <MenuItem key={index} value={score}>{score}</MenuItem>
                    ))}
                </TextField>
            }

            {Array.of(tableType.SCORE).includes(table) &&
                <TextField
                    margin="dense"
                    name="order"
                    label="Order Given"
                    type="text"
                    select
                    value={formData?.order}
                    onChange={handleChange}
                >
                    {scoreOrders.map((so, index) => (
                        <MenuItem key={index} value={so}>{so}</MenuItem>
                    ))}
                </TextField>
            }


            {Array.of(tableType.SCORE).includes(table) &&
                <TextField
                    margin="dense"
                    name="is_guest"
                    select
                    label="Guest Judge?"
                    value={formData?.is_guest}
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