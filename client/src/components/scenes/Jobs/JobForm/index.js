import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const JobForm = (props) => {
	const { action } = props;
	const { _id } = props.job;
	const [currentJob, setCurrentJob] = useState(props.job);
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
	} = currentJob;
	const [page, setPage] = useState(1);

	const onChange = (e) => {
		setCurrentJob({ ...currentJob, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		action({
			_id,
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
				<h4>Edit your {title} job</h4>
			</div>
		</>
	);
	const title2 = (
		<>
			<div className='text-center'>
				<h4>Edit the job qualification requirements</h4>
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
									value={remote}
									checked={remote === 'Yes'}
								/>
								<Form.Check
									onChange={onChange}
									type='radio'
									label='No'
									name='remote'
									id='remoteFalse'
									value={remote}
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
									value={visaSponsorship}
									checked={visaSponsorship === 'Yes'}
								/>
								<Form.Check
									onChange={onChange}
									type='radio'
									label='No'
									name='visaSponsorship'
									id='visaSponsorshipFalse'
									value={visaSponsorship}
									checked={visaSponsorship === 'No'}
								/>
							</Form.Group>
						</Col>
					</fieldset>
				</Col>
			</Row>
			<div className='text-center my-3 d-flex justify-content-around'>
				<Button variant='primary' type='submit' size='lg'>
					Save
				</Button>
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
					Save
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
JobForm.defaultProps = {
	job: {
		_id: '',
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
	},
	action: (data) => {
		console.log(data);
	},
};

export default JobForm;
