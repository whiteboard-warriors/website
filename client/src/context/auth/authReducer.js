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
	DELETE_PROFILE_SUCCESS,
	DELETE_PROFILE_FAIL,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_RESET_SUCCESS,
	FORGOT_RESET_FAIL,
	UPDATE_PASSWORD_SUCCESS,
	UPDATE_PASSWORD_FAIL,
	UPDATE_EMAIL_SUCCESS,
	UPDATE_EMAIL_FAIL,
	CLEAR_SUCCESS,
	CLEAR_LOGIN_FLAGS,
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case USER_LOADED:
			localStorage.setItem('user', JSON.stringify(action.payload));
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload,
				loginSuccess: true,
			};
		case SIGNUP_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			localStorage.setItem('isAuthenticated', true);
			return {
				...state,
				loading: false,
				registrationSuccess: true,
			};
		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			localStorage.setItem('isAuthenticated', true);
			return {
				...state,
				isAuthenticated: true,
				loading: false,
			};
		case SIGNUP_FAIL:
			return {
				...state,
				registrationError: action.payload,
			};
		case AUTH_ERROR:
			localStorage.removeItem('isAuthenticated');
			localStorage.removeItem('user');
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				authError: action.payload,
				isAuthenticated: false,
			};

		case LOGOUT:
			localStorage.removeItem('isAuthenticated');
			localStorage.removeItem('user');
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: {
					firstName: '',
				},
				authError: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				authError: null,
				registrationSuccess: null,
				registrationError: null,
			};
		case UPDATE_PROFILE_SUCCESS:
			localStorage.setItem('user', JSON.stringify(action.payload));
			return {
				...state,
				user: action.payload,
				updateProfileSuccess: true,
			};
		case UPDATE_EMAIL_SUCCESS:
			localStorage.setItem('user', JSON.stringify(action.payload));
			return {
				...state,
				user: action.payload,
				updateEmailSuccess: true,
			};
		case UPDATE_PASSWORD_SUCCESS:
			return {
				...state,
				updatePasswordSuccess: true,
			};
		case DELETE_PROFILE_SUCCESS:
			localStorage.removeItem('isAuthenticated');
			localStorage.removeItem('user');
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: {},
				deleteProfileSuccess: true,
				authError: null,
			};
		case LOGIN_FAIL:
		case UPDATE_PASSWORD_FAIL:
		case UPDATE_EMAIL_FAIL:
		case UPDATE_PROFILE_FAIL:
		case DELETE_PROFILE_FAIL:
			return {
				...state,
				authError: action.payload,
			};

		case FORGOT_PASSWORD_SUCCESS:
			localStorage.removeItem('isAuthenticated');
			localStorage.removeItem('user');
			return { ...state, authError: null, forgotRequestSuccess: true };
		case FORGOT_RESET_SUCCESS:
			return { ...state, authError: null, forgotResetSuccess: true };
		case FORGOT_RESET_FAIL:
			return { ...state, authError: action.payload };
		case CLEAR_SUCCESS:
			return {
				...state,
				updateProfileSuccess: false,
				updateEmailSuccess: false,
				updatePasswordSuccess: false,
				authError: null,
			};
		case CLEAR_LOGIN_FLAGS:
			return {
				...state,
				loginSuccess: false,
				loading: false,
				forgotRequestSuccess: false,
				forgotResetSuccess: false,
				updatePasswordSuccess: false,
				deleteProfileSuccess: false,
				updateProfileSuccess: false,
				updateEmailSuccess: false,
				authError: null,
			};
		default:
			return state;
	}
};
