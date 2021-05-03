import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

// Components
import JobCard from './JobCard';
import Spinner from '../../Spinner';
// Bootstrap
import { Container, Row, Col } from 'react-bootstrap';
// State
import JobsContext from '../../../context/jobs/jobsContext';
import AuthContext from '../../../context/auth/authContext';
//Util
import getDaysAgoData from '../../../utils/getDaysAgoData';

const Jobs = () => {
	const jobsContext = useContext(JobsContext);
	const authContext = useContext(AuthContext);
	const { loading, jobs, getJobs } = jobsContext;
	const { user } = authContext;

	let sortedJobs = getDaysAgoData(jobs, 30);
	let validJobs = sortedJobs.filter((item) => item.active === 'true');

	// sortedJobs = [];

	useEffect(() => {
		getJobs();
		//eslint-disable-next-line
	}, []);

	if (jobs === []) {
		sortedJobs = false;
	}

	return (
		<Fragment>
			<Container>
				<div className='text-center'>
					<h2 className='mt-5 mb-3'>Awesome Entry Level Jobs</h2>
				</div>
				<Row>
					<Col
						// lg={{ span: 2, offset: 8 }}
						className='admin-buttons-container'
					>
						<Link to='/jobs/post' className='btn btn-primary btn-md '>
							<b>Create a job post</b>
						</Link>
						{user.jobPosting === 'yes' && (
							<Link to={`/jobs/user/${user._id}`} className='btn btn-secondary btn-md mr-3'>
								<b>My job posts</b>
							</Link>
						)}
					</Col>
				</Row>
				<Row className='mt-3 job-post-container'>
					<Col lg={{ span: 8, offset: 2 }}>
						{loading ? (
							<div className='text-center'>
								<Spinner className='my-5' />
							</div>
						) : jobs.length !== 0 ? (
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
