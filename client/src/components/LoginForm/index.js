import React, { Fragment, useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import { Col, Row, Form } from 'react-bootstrap';
import linkedinSigninDefault from './Sign-In-Large---Default.png';

export default function LoginForm(props) {
	const { setShow } = props;
	const authContext = useContext(AuthContext);
	const { login, authError, clearErrors, isAuthenticated } = authContext;
	const alertContext = useContext(AlertContext);
	const { setAlert } = alertContext;

	useEffect(() => {
		if (authError === 'Invalid Credentials') {
			console.log('error');
			setAlert("Hmmm, that didn't work please re-enter your username and password or click 'Forgot Password'", 'danger');
			clearErrors();
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
	};

	let location = window.location.href;

	return (
		<Fragment>
			<Row>
				<Col>
					<div className='text-center'>
						<a
							href={location === 'http://localhost:3000/' ? 'http://localhost:5005/api/auth/linkedin' : '/api/auth/linkedin'}
							className=''
						>
							<img className='linkedIn-button mx-auto mb-2' alt='Sign-In With LinkedIn' src={linkedinSigninDefault}></img>
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
