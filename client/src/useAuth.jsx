import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthData } from './actions/auth';

const AuthContext = createContext({
    user: null,
    fetching: true,
});

export const AuthProvider = ({ children }) => {
    const user = useSelector((state) => state.auth.authData);
    const dispatch = useDispatch();
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        dispatch(fetchAuthData()).then(setFetching(false));
    }, [dispatch]);

    const memoedValue = useMemo(
        () => ({
            user,
            fetching,
        }),
        [user, fetching]
    );

    return (
        <AuthContext.Provider value={memoedValue}>
            {!fetching && children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}
