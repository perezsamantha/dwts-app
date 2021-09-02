import React, { useState } from 'react';

import * as actionType from '../../constants/actionTypes';
import decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

const CheckJWT = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();

    if (user?.token) {
        const decodedToken = decode(user.token);

        if (decodedToken.exp * 1000 < new Date().getTime()) {
            dispatch({ type: actionType.LOGOUT });

            history.push("/");

            setUser(null);
        }
    }
};

export default CheckJWT;