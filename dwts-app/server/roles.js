import { AccessControl } from 'accesscontrol';

const ac = new AccessControl();

ac.grant('fan')
    //.readOwn('profile')
    .updateOwn('profile')
    //.deleteOwn('profile')
    // temp until auth actions separated
    .updateAny('user')
    .readAny('user')
    .readAny('celeb')
    .readAny('pro')
    .updateAny('pro_like')
    .readAny('team')
    .updateAny('team_like')
    .readAny('season')
    .readAny('episode')
    .readAny('judge')
    .readAny('dance')
    .updateAny('dance_like')
    .readAny('score')
    .readAny('dancer')
    .readAny('tour')
    .readAny('tour_cast');

ac.grant('pro')
    .extend('fan')
    .createAny('user')
    //.updateAny('user')
    .createAny('celeb')
    .updateAny('celeb')
    .createAny('pro')
    .updateAny('pro')
    .createAny('team')
    .updateAny('team')
    .createAny('season')
    .updateAny('season')
    .createAny('episode')
    .updateAny('episode')
    .createAny('judge')
    .updateAny('judge')
    .createAny('dance')
    .updateAny('dance')
    .createAny('score')
    .updateAny('score')
    .createAny('dancer')
    .updateAny('dancer')
    .createAny('tour')
    .updateAny('tour')
    .createAny('tour_cast')
    .updateAny('tour_cast');

ac.grant('moderator')
    .extend(['fan', 'pro'])
    .deleteAny('celeb')
    .deleteAny('pro')
    .deleteAny('team')
    .deleteAny('season')
    .deleteAny('episode')
    .deleteAny('judge')
    .deleteAny('dance')
    .deleteAny('score')
    .deleteAny('dancer')
    .deleteAny('tour')
    .deleteAny('tour_cast');

ac.grant('admin').extend(['fan', 'pro', 'moderator']).deleteAny('user');

export default ac;
