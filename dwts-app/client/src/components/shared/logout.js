import { useState } from 'react';

import * as actionType from '../../constants/actionTypes';
import decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CheckJWT = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (user?.token) {
        const decodedToken = decode(user.token);

        if (decodedToken.exp * 1000 < new Date().getTime()) {
            dispatch({ type: actionType.LOGOUT });

            navigate("/");

            setUser(null);
        }
    }
};

export default CheckJWT;