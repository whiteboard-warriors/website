import React, { Fragment, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './style.scss';

// Components
import JobCard from '../JobCard';
import JobActions from '../JobActions';
import Spinner from '../../../Spinner';
// Bootstrap
import { Container, Row, Col } from 'react-bootstrap';
// State
import JobsContext from '../../../../context/jobs/jobsContext';
import AuthContext from '../../../../context/auth/authContext';
import AlertContext from '../../../../context/alert/alertContext';
//Util
import getDaysAgoData from '../../../../utils/getDaysAgoData';

const MyJobs = (props) => {
	const history = useHistory();
	const jobsContext = useContext(JobsContext);
	const authContext = useContext(AuthContext);
	const alertContext = useContext(AlertContext);

	const { loading, myJobs, getMyJobs, updateSuccess, clearJobFlags, error, clearJobError } = jobsContext;
	const { user, isAuthenticated } = authContext;
	const { setAlert } = alertContext;

	let sortedJobs = getDaysAgoData(myJobs, 365);

	useEffect(() => {
		getMyJobs();
		if (!isAuthenticated) {
			history.push('/');
			setAlert("Oops, looks like you're not logged in 😱. Please login or sign up to perform this action.", 'danger');
		}

		if (error) {
			setAlert(error, 'danger');
			clearJobError();
		}
		if (updateSuccess) {
			setAlert('Your job posting has been updated!', 'warning');
			clearJobFlags();
			history.push(`/jobs/user/${user._id}`);
		}
		//eslint-disable-next-line
	}, [isAuthenticated, updateSuccess, history]);

	if (myJobs === []) {
		sortedJobs = false;
	}

	return (
		<Fragment>
			<Container>
				<div className='text-center my-jobs-title'>
					<h4 className='my-5 px-1'>Hi {user.firstName}, here are your job posts:</h4>
				</div>
				<JobActions />
				<Row className='mt-3 job-post-container'>
					<Col lg={{ span: 8, offset: 2 }}>
						{loading ? (
							<div className='text-center'>
								<Spinner className='my-5' />
							</div>
						) : myJobs.length !== 0 ? (
							sortedJobs.map((job) => {
								return (
									<JobCard
										key={job._id}
										jobID={job._id}
										company={job.company}
										title={job.title}
										city={job.city}
										state={job.state}
										salary={job.salary}
										about={job.about}
										postDate={job.postDate}
										admin={true}
										active={job.active}
									/>
								);
							})
						) : (
							<div className='text-center px-1'>
								<h5 className='jobs-notification'>Oops, Looks like you haven't posted any jobs this past year.</h5>
							</div>
						)}
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default MyJobs;
