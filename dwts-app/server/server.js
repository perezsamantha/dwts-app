import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

import { PORT, CLIENT_ORIGIN } from './config.js';

app.use(
    cors({
        origin: CLIENT_ORIGIN,
    })
);
app.use(express.json());

//app.use('/uploads', express.static('uploads'));
import usersRouter from './routes/users.js';
//import fansRouter from './routes/fans.js';
import teamsRouter from './routes/teams.js';
import prosRouter from './routes/pros.js';
import dancesRouter from './routes/dances.js';
import seasonsRouter from './routes/seasons.js';
import celebsRouter from './routes/celebs.js';
import judgesRouter from './routes/judges.js';
import episodesRouter from './routes/episodes.js';
import scoresRouter from './routes/scores.js';
import dancersRouter from './routes/dancers.js';
import toursRouter from './routes/tours.js';
import tourCastRouter from './routes/tourCast.js';

app.use('/users', usersRouter);
//app.use('/fans', fansRouter);
app.use('/teams', teamsRouter);
app.use('/pros', prosRouter);
app.use('/dances', dancesRouter);
app.use('/seasons', seasonsRouter);
app.use('/celebs', celebsRouter);
app.use('/judges', judgesRouter);
app.use('/episodes', episodesRouter);
app.use('/scores', scoresRouter);
app.use('/dancers', dancersRouter);
app.use('/tours', toursRouter);
app.use('/tour_cast', tourCastRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
