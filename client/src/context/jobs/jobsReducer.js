import {
	GET_JOBS_SUCCESS,
	GET_JOBS,
	GET_JOB_SUCCESS,
	GET_JOB,
	GET_MY_JOBS,
	GET_MY_JOBS_SUCCESS,
	CREATE_JOB,
	CREATE_JOB_SUCCESS,
	CLEAR_JOB_FLAGS,
	SET_CURRENT_JOB,
	CLEAR_CURRENT_JOB,
	UPDATE_JOB_SUCCESS,
	UPDATE_JOB,
	FILTER_JOBS,
	CLEAR_FILTER,
	GET_JOBS_ERROR,
	CREATE_JOB_ERROR,
	CLEAR_JOB_ERROR,
	CLEAR_JOBS,
	APPLY_FOR_JOB,
	APPLY_FOR_JOB_SUCCESS,
	APPLY_FOR_JOB_ERROR,
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case GET_JOBS_SUCCESS:
			return {
				...state,
				jobs: action.payload,
				loading: false,
				current: null,
			};
		case GET_JOB_SUCCESS:
			// localStorage.removeItem('currentJob');
			localStorage.setItem('currentJob', JSON.stringify(action.payload));
			let currentJob = JSON.parse(localStorage.getItem('currentJob'));
			return {
				...state,
				job: action.payload,
				loading: false,
				current: currentJob,
			};
		case GET_MY_JOBS_SUCCESS:
			return {
				...state,
				myJobs: action.payload,
				loading: false,
			};
		case GET_JOBS:
		case GET_JOB:
		case GET_MY_JOBS: {
			return {
				...state,
				loading: true,
			};
		}
		case APPLY_FOR_JOB: {
			return {
				...state,
				applying: true,
			};
		}
		case CREATE_JOB: {
			return {
				...state,
				saving: true,
			};
		}
		case UPDATE_JOB: {
			return {
				...state,
				updating: true,
			};
		}
		case APPLY_FOR_JOB_SUCCESS: {
			console.log('apply for job success -- ', action.payload);
			return {
				...state,
				applying: false,
				applyingSuccess: true,
			};
		}
		case CREATE_JOB_SUCCESS:
			console.log('create job success -- ', action.payload);
			return {
				...state,
				saving: false,
				saveSuccess: true,
			};
		case UPDATE_JOB_SUCCESS:
			return {
				...state,
				jobs: state.jobs.map((job) => (job._id === action.payload._id ? action.payload : job)),
				updating: false,
				updateSuccess: true,
			};

		case CLEAR_JOBS:
			return {
				...state,
				jobs: null,
				filtered: null,
				error: null,
				current: null,
			};
		case CLEAR_JOB_FLAGS: {
			return {
				...state,
				error: null,
				saveSuccess: false,
				loading: false,
				saving: false,
				updating: false,
				updateSuccess: false,
				deleting: false,
				deleteSuccess: false,
				applying: false,
				applyingSuccess: false,
			};
		}
		case SET_CURRENT_JOB:
			return {
				...state,
				current: state.jobs.filter((job) => job._id === action.payload),
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
		case APPLY_FOR_JOB_ERROR:
		case GET_JOBS_ERROR:
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
