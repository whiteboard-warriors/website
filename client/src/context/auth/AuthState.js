import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import * as HTTP from '../../service/HTTP';
// import setAuthToken from '../../utils/setAuthToken';
import {
	SIGNUP_SUCCESS,
	SIGNUP_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_FAIL,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_RESET_SUCCESS,
	FORGOT_RESET_FAIL,
	CLEAR_SUCCESS,
	CLEAR_LOGIN_FLAGS,
	// RESET_PASSWORD_SUCCESS,
	// RESET_PASSWORD_FAIL,
} from '../types';

/**
 *
 * @param {*} props
 */
const AuthState = (props) => {
	const initialState = {
		isAuthenticated: localStorage.getItem('token'),
		loading: true,
		token: null,
		user: localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')) : {},
		authError: null,
		registrationSuccess: null,
		registrationError: null,
		forgotResetSuccess: false,
		forgotRequestSuccess: false,
		updateProfileSuccess: false,
		loginSuccess: false,
	};

	const [state, dispatch] = useReducer(authReducer, initialState);

	// Load User
	const loadUser = async () => {
		// if (localStorage.token) {
		// 	setAuthToken(localStorage.token);
		// }
		try {
			const res = await HTTP.get('/api/users');

			dispatch({
				type: USER_LOADED,
				payload: res.data,
			});
		} catch (err) {
			dispatch({ type: AUTH_ERROR });
		}
	};

	/**
	 * Register User
	 * @param {*} formData
	 */
	const register = async (formData) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post('/api/auth/', formData, config);

			dispatch({
				type: SIGNUP_SUCCESS,
				payload: res.data,
			});

			await login(formData);
		} catch (err) {
			dispatch({
				type: SIGNUP_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	/**
	 * Update User Profile
	 * @param {*} formData
	 */
	const updateUserProfile = async (formData) => {
		try {
			const res = await HTTP.put('/api/users/' + formData.id, formData);

			dispatch({
				type: UPDATE_PROFILE_SUCCESS,
				payload: res.data,
			});

			loadUser();
		} catch (err) {
			dispatch({
				type: UPDATE_PROFILE_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	/**
	 * Login User
	 * @param {*} formData
	 */
	const login = async (formData) => {
		try {
			const res = await HTTP.post('/api/auth/login', formData);

			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			});

			loadUser();
		} catch (err) {
			dispatch({
				type: LOGIN_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	/**
	 *
	 * @param {*} formData
	 */
	const forgotPassword = async (formData) => {
		try {
			const res = await HTTP.post('/api/auth/forgot-password-init', formData);

			dispatch({
				type: FORGOT_PASSWORD_SUCCESS,
				payload: res.body,
			});
		} catch (err) {
			console.error(err.response.data.msg);
			dispatch({
				type: FORGOT_RESET_FAIL,
				payload: { error: err.response.data.msg },
			});
		}
	};

	/**
	 *
	 * @param {*} formData
	 */
	const forgotPasswordComplete = async (formData) => {
		try {
			const res = await HTTP.post('/api/auth/forgot-password-complete', formData);

			dispatch({
				type: FORGOT_RESET_SUCCESS,
				payload: res.body,
			});
		} catch (err) {
			console.error(err);
			dispatch({
				type: FORGOT_RESET_FAIL,
				payload: { error: err.response.data.msg },
			});
		}
	};

	/**
	 *
	 * @param {*} token
	 */
	const setToken = async (token) => {
		dispatch({
			type: LOGIN_SUCCESS,
			payload: {
				token: token,
			},
		});

		loadUser();
	};

	// Logout
	const logout = () => dispatch({ type: LOGOUT });

	// Clear Auth Errors
	const clearAuthErrors = () => dispatch({ type: CLEAR_ERRORS });

	//
	const clearSuccess = () => dispatch({ type: CLEAR_SUCCESS });

	const clearLoginFlags = () => dispatch({ type: CLEAR_LOGIN_FLAGS });

	return (
		<AuthContext.Provider
			value={{
				// token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				authError: state.authError,
				token: state.token,
				forgotResetSuccess: state.forgotResetSuccess,
				forgotRequestSuccess: state.forgotRequestSuccess,
				updateProfileSuccess: state.updateProfileSuccess,
				registrationError: state.registrationError,
				registrationSuccess: state.registrationSuccess,
				loginSuccess: state.loginSuccess,
				register,
				loadUser,
				updateUserProfile,
				login,
				logout,
				clearAuthErrors,
				forgotPassword,
				forgotPasswordComplete,
				clearSuccess,
				setToken,
				clearLoginFlags,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
