import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

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

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

mongoose.set('useFindAndModify', false);