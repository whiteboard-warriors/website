import React, { Fragment, useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import { Col, Row, Form } from 'react-bootstrap';

export default function LoginForm(props) {
	const { setShow } = props;
	const authContext = useContext(AuthContext);
	const { login, authError, clearAuthErrors, isAuthenticated } = authContext;
	const alertContext = useContext(AlertContext);
	const { setAlert } = alertContext;

	useEffect(() => {
		if (authError === 'Invalid Credentials') {
			setAlert(
				"Hmmm, something went wrong. Please re-enter your username and password or click 'Forgot Password'. If you don't have an account yet, login and select the 'Register' tab.",
				'info',
				8000
			);
			clearAuthErrors();
		}
		// eslint-disable-next-line
	}, [authError, isAuthenticated]);

	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const { email, password } = user;

	/**
	 *
	 * @param {*} e
	 */
	const onChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	/**
	 *
	 * @param {*} e
	 */
	const onSubmit = (e) => {
		e.preventDefault();
		login({
			email,
			password,
		});
		setShow(false);
	};

	let location = window.location.href;

	return (
		<Fragment>
			<Row>
				<Col>
					<div className='text-center'>
						<a
							href={location === 'http://localhost:3000/' ? 'http://localhost:5005/api/auth/linkedin' : '/api/auth/linkedin'}
							className='btn btn-lg btn-linkedIn'
						>
							<i className='fab fa-linkedin-in mr-1'></i> - Sign in with LinkedIn
						</a>
					</div>

					<Form onSubmit={onSubmit} className='form-custom-margin' id='loginForm'>
						<Row>
							<Col>
								<Form.Group controlId='formEmail'>
									<Form.Control type='email' placeholder='E-Mail' name='email' value={email} onChange={onChange} required />
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col>
								<Form.Group controlId='formPassword'>
									<Form.Control
										type='password'
										placeholder='Password'
										name='password'
										value={password}
										onChange={onChange}
										required
									/>
								</Form.Group>
								<Link
									to='/forgot-password'
									onClick={() => {
										setShow(false);
									}}
								>
									Forgot Password?
								</Link>
							</Col>
						</Row>
					</Form>
				</Col>
			</Row>
		</Fragment>
	);
}
