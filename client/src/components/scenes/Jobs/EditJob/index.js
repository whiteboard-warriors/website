import React, { useContext, useEffect } from 'react';
import AlertContext from '../../../../context/alert/alertContext';
import AuthContext from '../../../../context/auth/authContext';
import JobsContext from '../../../../context/jobs/jobsContext';
//components
import Spinner from '../../../Spinner';
import JobForm from '../JobForm';

import './style.scss';

const EditJob = (props) => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);
	const jobsContext = useContext(JobsContext);

	const { setAlert } = alertContext;
	const { job, updateJob, error, clearJobError, saveSuccess, clearCreateJobFlags, getJob, loading } = jobsContext;
	const { user, isAuthenticated } = authContext;

	useEffect(() => {
		getJob(props.match.params.jobID);

		if (!isAuthenticated) {
			props.history.push('/');
			setAlert("Oops, looks like you're not logged in 😱. Please login or sign up to perform this action.", 'danger');
		}

		if (error) {
			setAlert(error, 'danger');
			clearJobError();
		}
		if (saveSuccess) {
			setAlert('Your job has been updated.', 'success');
			clearCreateJobFlags();
			props.history.push(`/jobs/user/${user._id}`);
		}
		if (user.jobPosting === 'no') {
			setAlert('Please update your profile to be able to post jobs :)', 'warning');
			props.history.push('/profile');
		}
		//eslint-disable-next-line
	}, [error, isAuthenticated, props.history, saveSuccess]);

	return <>{loading ? <Spinner /> : <JobForm action={updateJob} job={job} />}</>;
};

export default EditJob;
