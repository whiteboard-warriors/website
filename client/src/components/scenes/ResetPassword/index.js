import React, { Fragment, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AlertContext from '../../../context/alert/alertContext';
import AuthContext from '../../../context/auth/authContext';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import qs from 'qs';
import './style.scss';

const ResetPassword = (props) => {
	const history = useHistory();
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);

	const { forgotPasswordComplete, forgotResetSuccess, error, clearLoginFlags } = authContext;
	const { setAlert } = alertContext;

	const [passwordValid, setPasswordValid] = useState(false);
	const [validated, setValidated] = useState(false);

	const [user, setUser] = useState({
		password: '',
		password2: '',
	});

	const [token, setToken] = useState({
		token: '',
	});

	const { password, password2 } = user;

	useEffect(() => {
		let token = qs.parse(props.location.search, {
			ignoreQueryPrefix: true,
		}).token;
		setToken(token);

		if (error === 'INVALID_TOKEN') {
			setAlert('The was an error resetting your password, please try again, or request another reset.', 'danger');
		}

		if (forgotResetSuccess) {
			setAlert('Your password has been reset, you can now use it to login.', 'success');
			history.push('/');
			clearLoginFlags();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error, forgotResetSuccess, history, props.location.search, setAlert, setToken]);

	const onChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
		const form = e.currentTarget.form;
		const passwordInput = form.elements['password'];
		const passwordConfirmInput = form.elements['password2'];
		if (passwordInput.value === passwordConfirmInput.value) {
			setValidated(true);
		}
		if (validated) {
			if (e.target.name === 'password' || e.target.name === 'password2') {
				if (!passwordInput.checkValidity()) {
					passwordInput.setCustomValidity('');
					passwordInput.reportValidity();
				}
				if (!passwordConfirmInput.checkValidity()) {
					passwordConfirmInput.setCustomValidity('');
					passwordConfirmInput.reportValidity();
				}
				if (passwordInput.value !== passwordConfirmInput.value) {
					setValidated(false);
				}
			}
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const form = e.currentTarget;
		let valid = true;
		if (form.checkValidity() === false) {
			e.stopPropagation();
			valid = false; // might not be needed
		} else {
			const passwordInput = form.elements['password'];
			const passwordConfirmInput = form.elements['password2'];
			if (password !== password2) {
				// passwordInput.setValidated = false
				passwordInput.setCustomValidity("The passwords don't match");
				passwordInput.reportValidity();
				passwordConfirmInput.setCustomValidity("The passwords don't match");
				passwordConfirmInput.reportValidity();
				valid = false;
			} else if (validated) {
				passwordInput.setCustomValidity('');
				passwordInput.reportValidity();
				passwordConfirmInput.setCustomValidity('');
				passwordConfirmInput.reportValidity();
				setPasswordValid(true);
			}
		}
		if (valid) {
			forgotPasswordComplete({
				password,
				token,
			});
		}

		setValidated(true);
	};

	return (
		<Fragment>
			<Container>
				<Row className='reset-password-form'>
					<Col lg={{ span: 6, offset: 3 }}>
						<div className='text-center mb-5'>
							<h1 className='mt-5'>Reset Password</h1>
						</div>
						<Form noValidate validated={validated} onSubmit={onSubmit}>
							<Row>
								<Col sm={'12'}>
									<Form.Group controlId='formEmail'>
										<Form.Label>Password</Form.Label>
										<Form.Control
											type='password'
											placeholder='Password'
											name='password'
											isValid={passwordValid}
											value={password}
											onChange={onChange}
											required
										/>
									</Form.Group>
								</Col>
								<Col>
									<Form.Group controlId='formEmail'>
										<Form.Label>Confirm Password</Form.Label>
										<Form.Control
											type='password'
											placeholder='Confirm Password'
											name='password2'
											isValid={passwordValid}
											value={password2}
											onChange={onChange}
											required
										/>
									</Form.Group>
								</Col>
							</Row>
							<div className='text-center'>
								<Button variant='primary' type='submit'>
									Reset Password
								</Button>
							</div>
						</Form>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default ResetPassword;
