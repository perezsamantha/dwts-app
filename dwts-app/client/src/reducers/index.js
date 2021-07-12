import { combineReducers } from "redux";

import auth from './auth';
import fans from './fans';
import teams from './teams';

export const reducers = combineReducers({ auth, fans, teams });