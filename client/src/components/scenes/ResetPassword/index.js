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

	const { forgotPasswordComplete, forgotResetSuccess, error } = authContext;
	const { setAlert } = alertContext;

	const [user, setUser] = useState({
		password: '',
		passwordConfirm: '',
	});

	const [token, setToken] = useState({
		token: '',
	});

	const { password, passwordConfirm } = user;

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
		}
	}, [error, forgotResetSuccess, history, props.location.search, setAlert, setToken]);

	const onChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		forgotPasswordComplete({
			password,
			token,
		});
	};

	return (
		<Fragment>
			<Container>
				<Row className='reset-password-form'>
					<Col lg={{ span: 6, offset: 3 }}>
						<div className='text-center mb-5'>
							<h1 className='mt-5'>Reset Password</h1>
						</div>
						<Form onSubmit={onSubmit}>
							<Row>
								<Col sm={'12'}>
									<Form.Group controlId='formEmail'>
										<Form.Label>Password</Form.Label>
										<Form.Control
											type='password'
											placeholder='Password'
											name='password'
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
											name='passwordConfirm'
											value={passwordConfirm}
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
