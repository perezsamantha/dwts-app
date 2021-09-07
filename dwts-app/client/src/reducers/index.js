import { combineReducers } from "redux";

import auth from './auth';
import fans from './fans';
import teams from './teams';
import pros from './pros';

export const reducers = combineReducers({ auth, fans, teams, pros });