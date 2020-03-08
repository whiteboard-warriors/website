import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

import {
    SET_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    RESET_PASSWORD,
    RESET_PASSWORD_FAIL,
    VERIFY_EMAIL,
    VERIFY_EMAIL_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from './types';

// Logout

// Load user
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

// Login user
export const login = () => async formData => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        setLoading();
        const res = await axios.post('/login-path', formData, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        loadUser();
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.msg // test to verify the right payload is being sent.
        });
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
        const res = await axios.post('/register-path', formData, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        loadUser();
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL,
            payload: err.response.data.msg // verify correct source
        });
    }
};

// Verify email
export const verifyEmail = async email => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get('/verify-email-path', email, config);

        dispatch({
            type: VERIFY_EMAIL,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: VERIFY_EMAIL_FAIL,
            payload: err.response.data.msg // verify correct source
        });
    }
};

// Reset password
export const resetPassword = async (id, password) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.patch('/reset-path', { id, password }, config);

        dispatch({
            type: RESET_PASSWORD,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: err.response.data.msg // verify correct source
        });
    }
};

// Logout
export const logout = () => dispatch({ type: LOGOUT });

// Clear Errors
export const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

// Set loading to true
export const setLoading = () => {
    return {
        type: SET_LOADING
    };
};

// // Login User
// export const login = async formData => {
//     const config = {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     };

//     try {
//         const res = await axios.post('/api/auth', formData, config);

//         dispatch({
//             type: LOGIN_SUCCESS,
//             payload: res.data
//         });

//         loadUser();
//     } catch (err) {
//         dispatch({
//             type: LOGIN_FAIL,
//             payload: err.response.data.msg
//         });
//     }
// };

// // Clear Errors
// export const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
