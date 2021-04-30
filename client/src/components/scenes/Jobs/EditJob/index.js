import React, { useContext, useState, useEffect } from 'react';
import AlertContext from '../../../../context/alert/alertContext';
import AuthContext from '../../../../context/auth/authContext';
import JobsContext from '../../../../context/jobs/jobsContext';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
//components
import Spinner from '../../../Spinner';

import './style.scss';

const EditJob = (props) => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);
	const jobsContext = useContext(JobsContext);

	const { setAlert } = alertContext;
	const { job, updateJob, error, clearJobError, saveSuccess, clearCreateJobFlags, getJob } = jobsContext;
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
		if (job) setCurrentJob(job);
		// eslint-disable-next-line
	}, [error, isAuthenticated, props.history, saveSuccess]);

	const [currentJob, setCurrentJob] = useState({
		company: job && job.company,
		title: job && job.title,
		city: job && job.city,
		state: job && job.state,
		salary: job && job.salary,
		about: job && job.about,
	});
	let { company, title, city, state, salary, about } = currentJob;
	const onChange = (e) => {
		setCurrentJob({ ...currentJob, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		updateJob({
			_id: props.match.params.jobID,
			company,
			title,
			city,
			state,
			salary,
			about,
		});
	};

	return (
		<>
			{job ? (
				<Container className='mt-5 mb-3'>
					<Row>
						<Col lg={{ span: 6, offset: 3 }} className='job-posting-card'>
							<div className='text-center'>
								<h4>Edit your {title} job</h4>
							</div>

							<Form onSubmit={onSubmit} className='form-custom-margin'>
								<Form.Group controlId='formCompany'>
									<Form.Control
										type='text'
										placeholder='Company*'
										name='company'
										value={company}
										onChange={onChange}
										required
									/>
								</Form.Group>
								<Form.Group controlId='formTitle'>
									<Form.Control type='text' placeholder='Title*' name='title' value={title} onChange={onChange} required />
								</Form.Group>
								<Form.Group controlId='formCity'>
									<Form.Control type='text' placeholder='City*' name='city' value={city} onChange={onChange} required />
								</Form.Group>

								<Form.Group controlId='formState'>
									<Form.Control type='text' placeholder='State*' onChange={onChange} name='state' value={state} required />
								</Form.Group>
								<Form.Group controlId='formSalary'>
									<Form.Control
										type='text'
										placeholder='Salary Per Year'
										onChange={onChange}
										name='salary'
										value={salary}
										maxLength='15'
									/>
								</Form.Group>
								<Form.Text className='text-muted'>Please abbreviate. Eg. 70k to 90K.</Form.Text>
								<Form.Group controlId='formAbout'>
									<Form.Control
										type='text'
										placeholder='About'
										onChange={onChange}
										name='about'
										value={about}
										maxLength='80'
									/>
								</Form.Group>
								<Form.Text className='text-muted'>Please keep it Brief. 80 char max.</Form.Text>

								<div className='text-center my-3'>
									<Button variant='primary' type='submit' size='lg'>
										Save
									</Button>
								</div>
							</Form>
						</Col>
					</Row>
				</Container>
			) : (
				<Spinner />
			)}
		</>
		// <>{job && <p>{job.title}</p>}</>
	);
};

export default EditJob;
