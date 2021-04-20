import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

// Components
import JobCard from './JobCard';
// Bootstrap
import { Container, Row, Col } from 'react-bootstrap';
// State
import JobsContext from '../../../context/jobs/jobsContext';

const Jobs = () => {
	const jobsContext = useContext(JobsContext);
	const { jobs, getJobs } = jobsContext;

	useEffect(() => {
		getJobs();
		//eslint-disable-next-line
	}, []);

	//

	return (
		<Fragment>
			<Container>
				<div className='text-center'>
					<h2 className='mt-5 mb-3'>Jobs</h2>
				</div>
				<Row>
					<Col
						lg={{ span: 2, offset: 8 }}
						className='d-flex flex-row-reverse'
					>
						<Link
							to='/jobs/post'
							className='btn btn-primary btn-lg '
						>
							<b>Post a job</b>
						</Link>
					</Col>
				</Row>
				<Row className='mt-3'>
					<Col lg={{ span: 8, offset: 2 }}>
						{jobs.map((job) => {
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
						})}
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default Jobs;
