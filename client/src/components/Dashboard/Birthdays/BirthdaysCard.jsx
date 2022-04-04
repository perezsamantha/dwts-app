import { useEffect } from 'react';
import { Card, Divider, Grid, Typography } from '@mui/material';
import { getBirthdays } from './birthdayFunctions';
import ProPreview from './ProPreview';
import CelebPreview from './CelebPreview';
import FanPreview from './FanPreview';
import { useDispatch, useSelector } from 'react-redux';
import { createLoadingSelector } from '../../../api/selectors';
import * as actionType from '../../../constants/actionTypes';
import { getBirthdayData } from '../../../actions/multipleActions';
import Progress from '../../shared/Progress';
import { Link } from 'react-router-dom';

function BirthdaysCard() {
    const today = new Date();

    const dispatch = useDispatch();
    const celebs = useSelector((state) => state.celebs.celebs);
    const pros = useSelector((state) => state.pros.pros);
    const fans = useSelector((state) => state.users.users);

    const loadingSelector = createLoadingSelector([
        actionType.CELEBSEARCH,
        actionType.PROSEARCH,
        actionType.USERSEARCH,
        actionType.FETCHBIRTHDAYDATA,
    ]);
    const loading = useSelector((state) => loadingSelector(state));

    useEffect(() => {
        dispatch(getBirthdayData());
    }, [dispatch]);

    let proBirthdays, celebBirthdays, fanBirthdays, noBirthdays;

    if (!loading) {
        proBirthdays = getBirthdays(pros, today);
        celebBirthdays = getBirthdays(celebs, today);
        fanBirthdays = getBirthdays(fans, today);

        noBirthdays =
            proBirthdays.length === 0 &&
            celebBirthdays.length === 0 &&
            fanBirthdays.length === 0;
    }

    return (
        <Card elevation={3}>
            <Typography variant="h5">Today's Birthdays</Typography>
            <Divider />

            {loading ? (
                <Progress />
            ) : noBirthdays ? (
                <Typography>No birthdays today</Typography>
            ) : (
                <>
                    {proBirthdays.length !== 0 && (
                        <>
                            <Typography variant="h6" my={1}>
                                Pros
                            </Typography>
                            <Grid container spacing={2}>
                                {proBirthdays.map((pro, index) => (
                                    <Grid item key={index}>
                                        <Link
                                            to={{ pathname: `/pros/${pro.id}` }}
                                            style={{
                                                textDecoration: 'inherit',
                                                color: 'inherit',
                                            }}
                                        >
                                            <ProPreview pro={pro} />
                                        </Link>
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                    )}

                    {celebBirthdays.length !== 0 && (
                        <>
                            <Typography variant="h6" my={1}>
                                Celebs
                            </Typography>
                            <Grid container spacing={2}>
                                {celebBirthdays.map((celeb, index) => (
                                    <Grid item key={index}>
                                        <CelebPreview celeb={celeb} />
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                    )}

                    {fanBirthdays.length !== 0 && (
                        <>
                            <Typography variant="h6" my={1}>
                                Fans
                            </Typography>
                            <Grid container spacing={2}>
                                {fanBirthdays.map((fan, index) => (
                                    <Grid item key={index}>
                                        <Link
                                            to={{ pathname: `/fans/${fan.id}` }}
                                            style={{
                                                textDecoration: 'inherit',
                                                color: 'inherit',
                                            }}
                                        >
                                            <FanPreview fan={fan} />
                                        </Link>
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                    )}
                </>
            )}
        </Card>
    );
}

export default BirthdaysCard;
