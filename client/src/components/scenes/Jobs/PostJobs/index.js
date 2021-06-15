import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AlertContext from '../../../../context/alert/alertContext';
import AuthContext from '../../../../context/auth/authContext';
import JobsContext from '../../../../context/jobs/jobsContext';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

import './style.scss';

const PostJobs = (props) => {
	const history = useHistory();
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);
	const jobsContext = useContext(JobsContext);

	const { setAlert } = alertContext;
	const { createJob, error, clearJobError, saveSuccess, clearJobFlags } = jobsContext;
	const { user, isAuthenticated } = authContext;

	useEffect(() => {
		if (!isAuthenticated) {
			history.push('/');
			setAlert("Oops, unfortunately you're not logged in 😱. Please login or sign up to perform this action.", 'danger');
		}

		if (error) {
			setAlert(error, 'danger');
			clearJobError();
		}
		if (saveSuccess) {
			setAlert('Your new job has been posted.', 'success');
			clearJobFlags();
			// debugger;
			history.push('/jobs');
		}
		if (user.jobPosting === 'no') {
			setAlert('Please update your profile to be able to post jobs :)\n\nScroll down to the job posting section.', 'warning');
			history.push('/profile');
		}

		// eslint-disable-next-line
	}, [error, isAuthenticated, clearJobFlags, history]);
	const [page, setPage] = useState(1);

	const [job, setJob] = useState({
		company: '',
		title: '',
		city: '',
		state: '',
		salary: '',
		about: '',
		remote: '',
		visaSponsorship: '',
		hardRequirement1: '',
		hardRequirement2: '',
		hardRequirement3: '',
		softRequirement1: '',
		softRequirement2: '',
		softRequirement3: '',
	});

	let {
		company,
		title,
		city,
		state,
		salary,
		about,
		remote,
		visaSponsorship,
		hardRequirement1,
		hardRequirement2,
		hardRequirement3,
		softRequirement1,
		softRequirement2,
		softRequirement3,
	} = job;

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
			remote,
			visaSponsorship,
			hardRequirement1,
			hardRequirement2,
			hardRequirement3,
			softRequirement1,
			softRequirement2,
			softRequirement3,
		});
	};

	const title1 = (
		<>
			<div className='text-center'>
				<h4>Let's creat your entry level job posting</h4>
			</div>
		</>
	);
	const title2 = (
		<>
			<div className='text-center'>
				<h4>Qualification requirements</h4>
			</div>
		</>
	);

	const firstPage = (
		<>
			<Form.Group controlId='formCompany'>
				<Form.Control type='text' placeholder='Company*' name='company' value={company} onChange={onChange} required />
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
				<Form.Control type='text' placeholder='Salary Per Year' onChange={onChange} name='salary' value={salary} maxLength='15' />
			</Form.Group>
			<Form.Text className='text-muted'>Please abbreviate. Eg. 70k to 90K.</Form.Text>
			<Form.Group controlId='formAbout'>
				<Form.Control
					type='text'
					placeholder='About - (short description)'
					onChange={onChange}
					name='about'
					value={about}
					maxLength='80'
				/>
			</Form.Group>
			<Form.Text className='text-muted'>Please keep it Brief. 80 char max.</Form.Text>
			<Row>
				<Col>
					<fieldset>
						<Col sm={12}>
							<Form.Group>
								<Form.Label className='my-2'>Is this job remote?</Form.Label>
								<Form.Check
									onChange={onChange}
									type='radio'
									label='Yes'
									name='remote'
									id='remoteTrue'
									value='Yes'
									checked={remote === 'Yes'}
								/>
								<Form.Check
									onChange={onChange}
									type='radio'
									label='No'
									name='remote'
									id='remoteFalse'
									value='No'
									checked={remote === 'No'}
								/>
							</Form.Group>
						</Col>
					</fieldset>
				</Col>
				<Col>
					<fieldset>
						<Col sm={12}>
							<Form.Group>
								<Form.Label className='my-2'>Visa Sponsorship?</Form.Label>
								<Form.Check
									onChange={onChange}
									type='radio'
									label='Yes'
									name='visaSponsorship'
									id='visaSponsorshipTrue'
									value='Yes'
									checked={visaSponsorship === 'Yes'}
								/>
								<Form.Check
									onChange={onChange}
									type='radio'
									label='No'
									name='visaSponsorship'
									id='visaSponsorshipFalse'
									value='No'
									checked={visaSponsorship === 'No'}
								/>
							</Form.Group>
						</Col>
					</fieldset>
				</Col>
			</Row>
			<div className='text-center my-3 d-flex justify-content-around'>
				<Button variant='secondary' size='lg' className='mr-3' onClick={() => setPage(2)}>
					Next &#62;
				</Button>
			</div>
		</>
	);

	const secondPage = (
		<>
			<Row>
				<Col sm={12}>
					<Form.Group controlId='formHardRequirement1'>
						<Form.Control
							type='text'
							placeholder='Hard requirement 1 (40 char max)*'
							onChange={onChange}
							name='hardRequirement1'
							value={hardRequirement1}
							required
						/>
					</Form.Group>
					<Form.Group controlId='formHardRequirement2'>
						<Form.Control
							type='text'
							placeholder='Hard requirement 2 (40 char max)*'
							onChange={onChange}
							name='hardRequirement2'
							value={hardRequirement2}
							required
						/>
					</Form.Group>
					<Form.Group controlId='formHardRequirement3'>
						<Form.Control
							type='text'
							placeholder='Hard requirement 3 (40 char max)*'
							onChange={onChange}
							name='hardRequirement3'
							value={hardRequirement3}
							required
						/>
					</Form.Group>
					<Form.Group controlId='formSoftRequirement1'>
						<Form.Control
							type='text'
							placeholder='Soft requirement 1 (40 char max)'
							onChange={onChange}
							name='softRequirement1'
							value={softRequirement1}
						/>
					</Form.Group>
					<Form.Group controlId='formSoftRequirement2'>
						<Form.Control
							type='text'
							placeholder='Soft requirement 2 (40 char max)'
							onChange={onChange}
							name='softRequirement2'
							value={softRequirement2}
						/>
					</Form.Group>
					<Form.Group controlId='formSoftRequirement3'>
						<Form.Control
							type='text'
							placeholder='Soft requirement 3 (40 char max)'
							onChange={onChange}
							name='softRequirement3'
							value={softRequirement3}
						/>
					</Form.Group>
				</Col>
			</Row>

			<div className='text-center my-3 d-flex justify-content-around'>
				<Button variant='secondary' size='lg' className='mr-3' onClick={() => setPage(1)}>
					&#60; Back
				</Button>
				<Button variant='primary' type='submit' size='lg'>
					Post Job
				</Button>
			</div>
		</>
	);

	return (
		<Container className='mt-5 mb-3'>
			<Row className='px-3'>
				<Col lg={{ span: 6, offset: 3 }} sm={{ span: 8, offset: 2 }} className='job-posting-card'>
					{page === 1 ? title1 : title2}
					<Form onSubmit={onSubmit} className='form-custom-margin'>
						{page === 1 ? firstPage : secondPage}
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default PostJobs;
