import React, { Fragment, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AlertContext from '../../../context/alert/alertContext';
import AuthContext from '../../../context/auth/authContext';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import './style.scss';

/**
 *
 * @param {*} props
 */
const ForgotPassword = () => {
	const history = useHistory();
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);

	const { forgotPassword, forgotRequestSuccess, error } = authContext;
	const { setAlert } = alertContext;

	const [user, setUser] = useState({
		email: '',
	});

	const { email } = user;

	const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		forgotPassword({
			email,
		});
	};

	/**
	 *
	 */
	useEffect(() => {
		if (forgotRequestSuccess) {
			history.push('/');
			setAlert('Please check your email, if we found it in our database we will send you a reset link.', 'success');
		}
	}, [error, forgotRequestSuccess, history, setAlert]);

	return (
		<Fragment>
			<Container>
				<Row className='forgot-password-form'>
					<Col lg={{ span: 6, offset: 3 }}>
						<div className='text-center mb-5'>
							<h1 className='mt-5'>Forgot Password</h1>
						</div>
						<Form onSubmit={onSubmit}>
							<Row>
								<Col>
									<Form.Group controlId='formEmail'>
										<Form.Label>Please enter the email address associated with your account</Form.Label>
										<Form.Control type='text' placeholder='E-Mail' name='email' value={email} onChange={onChange} required />
									</Form.Group>
								</Col>
							</Row>
							<div className='text-center'>
								<Button variant='primary' type='submit'>
									Forgot Password
								</Button>
							</div>
						</Form>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default ForgotPassword;