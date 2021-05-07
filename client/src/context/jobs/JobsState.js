import React, { useContext, useReducer } from 'react';
import JobsContext from './jobsContext';
import jobsReducer from './jobsReducer';
import * as HTTP from '../../service/HTTP';
import axios from 'axios';
import AuthContext from '../auth/authContext';
import {
	GET_JOBS_SUCCESS,
	GET_JOBS,
	GET_JOB_SUCCESS,
	GET_JOB,
	GET_MY_JOBS,
	GET_MY_JOBS_SUCCESS,
	CREATE_JOB,
	CREATE_JOB_SUCCESS,
	SET_CURRENT_JOB,
	CLEAR_CURRENT_JOB,
	UPDATE_JOB_SUCCESS,
	UPDATE_JOB,
	FILTER_JOBS,
	CLEAR_JOBS,
	CLEAR_FILTER,
	CREATE_JOB_ERROR,
	GET_JOBS_ERROR,
	UPDATE_JOB_ERROR,
	CLEAR_CREATE_JOB_FLAGS,
	APPLY_FOR_JOB,
	APPLY_FOR_JOB_ERROR,
	APPLY_FOR_JOB_SUCCESS,
} from '../types';

const JobsState = (props) => {
	const initialState = {
		jobs: [],
		myJobs: [],
		current: null,
		filtered: null,
		error: null,
		loading: true,
		saving: false,
		applying: false,
		applyingSuccess: false,
		saveSuccess: false,
		updating: false,
		updateSuccess: false,
		deleting: false,
		deleteSuccess: false,
		job: null,
	};

	const authContext = useContext(AuthContext);
	const { authError } = authContext;
	const [state, dispatch] = useReducer(jobsReducer, initialState);

	/**
	 * Get Jobs
	 */
	const getJobs = async () => {
		dispatch({
			type: GET_JOBS,
			payload: null,
		});
		try {
			let res = await axios.get('/api/all/jobs');
			dispatch({
				type: GET_JOBS_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: GET_JOBS_ERROR,
				payload: err.response.msg,
			});
		}
	};
	/**
	 * Get Jobs
	 */
	const getJob = async (id) => {
		dispatch({
			type: GET_JOB,
			payload: null,
		});
		try {
			let res = await HTTP.get(`/api/jobs/${id}`);
			dispatch({
				type: GET_JOB_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			if (err.response.status === 401) {
				authError();
			}
			dispatch({
				type: GET_JOBS_ERROR,
				payload: err.response.msg,
			});
		}
	};
	/**
	 * Get MY Jobs
	 */
	const getMyJobs = async () => {
		dispatch({
			type: GET_MY_JOBS,
			payload: null,
		});
		try {
			let res = await HTTP.get(`/api/jobs/created-by/user/`);
			dispatch({
				type: GET_MY_JOBS_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			if (err.response.status === 401) {
				authError();
			}
			dispatch({
				type: GET_JOBS_ERROR,
				payload: err.response.msg,
			});
		}
	};

	/**
	 *
	 * @param {*} job
	 */
	const createJob = async (job) => {
		dispatch({
			type: CREATE_JOB,
			payload: null,
		});
		try {
			let res = await HTTP.post('/api/jobs', job);
			dispatch({
				type: CREATE_JOB_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: CREATE_JOB_ERROR,
				payload: err.response.data.msg,
			});
		}
	};
	/**
	 * Apply for a job
	 */
	const applyForJob = async (jobID) => {
		dispatch({
			type: APPLY_FOR_JOB,
			payload: null,
		});
		try {
			let res = await HTTP.post('/api/jobs/apply-for-job', jobID);
			dispatch({
				type: APPLY_FOR_JOB_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: APPLY_FOR_JOB_ERROR,
				payload: err.response.data.msg,
			});
		}
	};
	// Clear job flags
	const clearCreateJobFlags = async () => {
		dispatch({
			type: CLEAR_CREATE_JOB_FLAGS,
		});
	};

	// Update Job
	const updateJob = async (job) => {
		console.log('updateJob > ', job);
		dispatch({
			type: UPDATE_JOB,
			payload: null,
		});
		try {
			const res = await HTTP.put(`/api/jobs/${job._id}`, job);

			dispatch({
				type: UPDATE_JOB_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: UPDATE_JOB_ERROR,
				payload: err.response.msg,
			});
		}
	};

	//Clear Jobs
	const clearJobs = () => {
		dispatch({ type: CLEAR_JOBS });
	};

	// Set Current Job
	const setCurrentJob = (id) => {
		dispatch({ type: SET_CURRENT_JOB, payload: id });
	};

	// Clear Current Job
	const clearCurrentJob = () => {
		dispatch({ type: CLEAR_CURRENT_JOB });
	};

	// Filter Jobs
	const filterJobs = (text) => {
		dispatch({ type: FILTER_JOBS, payload: text });
	};

	// Clear Filter
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	};

	// Clear Error
	const clearJobError = () => {
		dispatch({ type: CREATE_JOB_ERROR });
	};

	return (
		<JobsContext.Provider
			value={{
				jobs: state.jobs,
				myJobs: state.myJobs,
				current: state.current,
				filtered: state.filtered,
				error: state.error,
				job: state.job,
				loading: state.loading,
				applying: state.applying,
				applyingSuccess: state.applyingSuccess,
				saving: state.saving,
				saveSuccess: state.saveSuccess,
				updating: state.updating,
				updateSuccess: state.updateSuccess,
				createJob,
				clearJobs,
				setCurrentJob,
				clearCurrentJob,
				updateJob,
				filterJobs,
				clearFilter,
				getJobs,
				getJob,
				getMyJobs,
				applyForJob,
				clearCreateJobFlags,
				clearJobError,
			}}
		>
			{props.children}
		</JobsContext.Provider>
	);
};

export default JobsState;
