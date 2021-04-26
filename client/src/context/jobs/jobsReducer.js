import {
	GET_JOBS_SUCCESS,
	GET_JOBS,
	GET_JOB_SUCCESS,
	GET_JOB,
	CREATE_JOB,
	CREATE_JOB_SUCCESS,
	CLEAR_CREATE_JOB_FLAGS,
	SET_CURRENT_JOB,
	CLEAR_CURRENT_JOB,
	UPDATE_JOB_SUCCESS,
	UPDATE_JOB,
	FILTER_JOBS,
	CLEAR_FILTER,
	CREATE_JOB_ERROR,
	CLEAR_JOB_ERROR,
	CLEAR_JOBS,
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case GET_JOBS_SUCCESS:
			return {
				...state,
				jobs: action.payload,
				loading: false,
			};
		case GET_JOB_SUCCESS:
			return {
				...state,
				job: action.payload,
				loading: false,
			};
		case GET_JOBS:
		case GET_JOB: {
			return {
				...state,
				loading: true,
			};
		}
		case CREATE_JOB:
		case UPDATE_JOB: {
			return {
				...state,
				saving: true,
			};
		}
		case CREATE_JOB_SUCCESS:
			return {
				...state,
				saving: false,
				saveSuccess: true,
			};
		case UPDATE_JOB_SUCCESS:
			return {
				...state,
				jobs: state.jobs.map((job) =>
					job._id === action.payload._id ? action.payload : job
				),
				saving: false,
				saveSuccess: true,
			};

		case CLEAR_JOBS:
			return {
				...state,
				jobs: null,
				filtered: null,
				error: null,
				current: null,
			};
		case CLEAR_CREATE_JOB_FLAGS: {
			return {
				...state,
				error: null,
				saveSuccess: false,
				loading: false,
				saving: false,
				deleting: false,
				deleteSuccess: false,
			};
		}
		case SET_CURRENT_JOB:
			return {
				...state,
				current: action.payload,
			};
		case CLEAR_CURRENT_JOB:
			return {
				...state,
				current: null,
			};
		case FILTER_JOBS:
			return {
				...state,
				filtered: state.jobs.filter((job) => {
					const regex = new RegExp(`${action.payload}`, 'gi');
					return job.title.match(regex); // <uncomment and this and remove this memo when jobs start meeting in person>       || job.location.name.match(regex) || job.location.city.match(regex) || job.location.state(regex);
				}),
			};
		case CLEAR_FILTER:
			return {
				...state,
				filtered: null,
			};
		case CREATE_JOB_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case CLEAR_JOB_ERROR:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};