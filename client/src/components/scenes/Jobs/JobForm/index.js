import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const JobForm = (props) => {
	const { action } = props;
	const { _id } = props.job;
	const [currentJob, setCurrentJob] = useState(props.job);
	let { company, title, city, state, salary, about } = currentJob;

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
		});
	};
	return (
		<Container className='mt-5 mb-3'>
			<Row className='px-3'>
				<Col lg={{ span: 6, offset: 3 }} sm={{ span: 8, offset: 2 }} className='job-posting-card'>
					<div className='text-center'>
						<h4>Edit your {title} job</h4>
					</div>

					<Form onSubmit={onSubmit} className='form-custom-margin'>
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
							<Form.Control type='text' placeholder='About' onChange={onChange} name='about' value={about} maxLength='80' />
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
	},
	action: (data) => {
		console.log(data);
	},
};

export default JobForm;
