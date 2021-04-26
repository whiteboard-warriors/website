import React, { useContext, useState, useEffect } from 'react';
import AlertContext from '../../../../context/alert/alertContext';
import AuthContext from '../../../../context/auth/authContext';
import JobsContext from '../../../../context/jobs/jobsContext';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

import './style.scss';

const PostJobs = (props) => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);
	const jobsContext = useContext(JobsContext);

	const { setAlert } = alertContext;
	const {
		createJob,
		error,
		clearJobError,
		saveSuccess,
		clearCreateJobFlags,
	} = jobsContext;
	const { user, isAuthenticated } = authContext;

	useEffect(() => {
		if (!isAuthenticated) {
			props.history.push('/');
			setAlert(
				error,
				"Oops, you're not logged in. Please login before to perform this action."
			);
		}

		if (error) {
			setAlert(error, 'danger');
			clearJobError();
		}
		if (saveSuccess) {
			setAlert('Your new job has been posted.', 'success');
			clearCreateJobFlags();
			// debugger;
			props.history.push('/jobs');
		}
		if (user.jobPosting === 'no') {
			setAlert(
				'Please update your profile to be able to post jobs :)',
				'warning'
			);
			props.history.push('/profile');
		}

		// eslint-disable-next-line
	}, [error, isAuthenticated, clearCreateJobFlags, props.history]);

	const [job, setJob] = useState({
		company: '',
		title: '',
		city: '',
		state: '',
		salary: '',
		about: '',
	});

	let { company, title, city, state, salary, about } = job;

	const onChange = (e) => {
		setJob({ ...job, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		createJob({
			company,
			title,
			city,
			state,
			salary,
			about,
		});
	};

	return (
		<Container className='mt-5 mb-3'>
			<Row>
				<Col lg={{ span: 6, offset: 3 }} className='job-posting-card'>
					<div className='text-center'>
						<h4>Let's creat your entry level br job posting</h4>
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
							<Form.Control
								type='text'
								placeholder='Title*'
								name='title'
								value={title}
								onChange={onChange}
								required
							/>
						</Form.Group>
						<Form.Group controlId='formCity'>
							<Form.Control
								type='text'
								placeholder='City*'
								name='city'
								value={city}
								onChange={onChange}
								required
							/>
						</Form.Group>

						<Form.Group controlId='formState'>
							<Form.Control
								type='text'
								placeholder='State*'
								onChange={onChange}
								name='state'
								value={state}
								required
							/>
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
						<Form.Text className='text-muted'>
							Please abbreviate. Eg. 70k to 90K.
						</Form.Text>
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
						<Form.Text className='text-muted'>
							Please keep it Brief. 80 char max.
						</Form.Text>

						<div className='text-center my-3'>
							<Button variant='primary' type='submit' size='lg'>
								Post Job
							</Button>
						</div>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default PostJobs;