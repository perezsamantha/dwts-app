import { combineReducers } from 'redux';

import auth from './auth';
import loading from './loading';
import errors from './errors';

import celebs from './celebs';
import pros from './pros';
import seasons from './seasons';
import teams from './teams';
import episodes from './episodes';
import dances from './dances';
import judges from './judges';
import scores from './scores';
import dancers from './dancers';
import tours from './tours';
import users from './users';
import activity from './activity';
import polls from './polls';

export const reducers = combineReducers({
    auth,
    loading,
    errors,
    celebs,
    pros,
    seasons,
    teams,
    episodes,
    dances,
    judges,
    scores,
    dancers,
    tours,
    users,
    activity,
    polls,
});
