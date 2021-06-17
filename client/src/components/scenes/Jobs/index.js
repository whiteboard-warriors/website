import React, { Fragment, useContext, useEffect } from 'react';
import './style.scss';

// Components
import JobCard from './JobCard';
import JobActions from './JobActions';
import Spinner from '../../Spinner';
// Bootstrap
import { Container, Row, Col } from 'react-bootstrap';
// State
import JobsContext from '../../../context/jobs/jobsContext';
import AuthContext from '../../../context/auth/authContext';
import AlertContext from '../../../context/alert/alertContext';
//Util
import getDaysAgoData from '../../../utils/getDaysAgoData';

const Jobs = () => {
	const jobsContext = useContext(JobsContext);
	const authContext = useContext(AuthContext);
	const alertContext = useContext(AlertContext);
	const { loading, jobs, getJobs, applyingSuccess, error, clearJobError, clearJobFlags } = jobsContext;
	const { user } = authContext;
	const { setAlert } = alertContext;

	let sortedJobs = getDaysAgoData(jobs, 30);
	let validJobs = sortedJobs.filter((item) => item.active === 'true');

	// sortedJobs = [];

	useEffect(() => {
		getJobs();
		if (applyingSuccess) {
			setAlert('Thanks! Your job application was submitted successfully', 'success');
			clearJobFlags();
		}
		if (error) {
			setAlert(error, 'danger');
			clearJobError();
		}
		//eslint-disable-next-line
	}, [applyingSuccess]);

	if (jobs === []) {
		sortedJobs = false;
	}

	return (
		<Fragment>
			<Container>
				<div className='text-center'>
					<h2 className='my-5'>Awesome Entry Level Jobs</h2>
				</div>
				<JobActions user={user} />
				<Row className='mt-3 job-post-container'>
					<Col lg={{ span: 8, offset: 2 }}>
						{loading ? (
							<div className='text-center'>
								<Spinner className='my-5' />
							</div>
						) : validJobs.length !== 0 ? (
							validJobs.map((job) => {
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
										remote={job.remote}
										visaSponsorship={job.visaSponsorship}
										hardRequirement1={job.hardRequirement1}
										hardRequirement2={job.hardRequirement2}
										hardRequirement3={job.hardRequirement3}
										softRequirement1={job.softRequirement1}
										softRequirement2={job.softRequirement2}
										softRequirement3={job.softRequirement3}
										postDate={job.postDate}
										admin={false}
									/>
								);
							})
						) : (
							<div className='text-center px-1'>
								<h4 className='jobs-notification'>I'm sorry, no jobs have been posted in the last 30 days.</h4>
							</div>
						)}
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default Jobs;
