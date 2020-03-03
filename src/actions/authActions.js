import {
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    RESET_PASSWORD,
    RESET_PASSWORD_FAIL
} from './types';

// Get techs from server
export const getTechs = () => async dispatch => {
    try {
        setLoading();

        const res = await fetch('/techs');
        const data = await res.json();

        dispatch({
            type: GET_TECHS,
            payload: data
        });
    } catch (err) {
        dispatch({
            type: TECHS_ERROR,
            payload: err.response.statusText
        });
    }
};

// Add tech to server
export const addTech = tech => async dispatch => {
    try {
        setLoading();

        const res = await fetch('/techs', {
            method: 'POST',
            body: JSON.stringify(tech),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();

        dispatch({
            type: ADD_TECH,
            payload: data
        });
    } catch (err) {
        dispatch({
            type: TECHS_ERROR,
            payload: err.response.statusText
        });
    }
};

// Delete tech from server
export const deleteTech = id => async dispatch => {
    try {
        setLoading();

        await fetch(`/techs/${id}`, {
            method: 'DELETE'
        });

        dispatch({
            type: DELETE_TECH,
            payload: id
        });
    } catch (err) {
        dispatch({
            type: TECHS_ERROR,
            payload: err.response.statusText
        });
    }
};

// Set loading to true
export const setLoading = () => {
    return {
        type: SET_LOADING
    };
};

// Load User
export const loadUser = async () => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({ type: AUTH_ERROR });
    }
};

// Register User
export const register = async formData => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post('/api/users', formData, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        loadUser();
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL,
            payload: err.response.data.msg
        });
    }
};
// Login User
export const login = async formData => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post('/api/auth', formData, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        loadUser();
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.msg
        });
    }
};

// Logout
export const logout = () => dispatch({ type: LOGOUT });

// Clear Errors
export const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
