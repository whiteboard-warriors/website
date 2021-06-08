import React, { Fragment, useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import { Col, Form } from 'react-bootstrap';

export default function RegistrationForm() {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);
	const { register, registrationError, clearAuthErrors } = authContext;
	const { setAlert } = alertContext;
	const [passwordValid, setPasswordValid] = useState(false);
	const [validated, setValidated] = useState(false);

	useEffect(() => {
		if (registrationError) {
			setAlert('Hmmm, there was an error registering for a new account!', 'danger');
			clearAuthErrors();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [registrationError]);

	const [user, setUser] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		password2: '',
		linkedIn: '',
		githubUsername: '',
	});

	let { firstName, lastName, email, password, password2, linkedIn, githubUsername } = user;

	/**
	 *
	 * @param {*} e
	 */
	const onChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });

		if (validated) {
			if (e.target.name === 'password' || e.target.name === 'password2') {
				const form = e.currentTarget.form;
				const passwordInput = form.elements['password'];
				const passwordConfirmInput = form.elements['password2'];
				if (!passwordInput.checkValidity()) {
					passwordInput.setCustomValidity('');
					passwordInput.reportValidity();
				}
				if (!passwordConfirmInput.checkValidity()) {
					passwordConfirmInput.setCustomValidity('');
					passwordConfirmInput.reportValidity();
				}
			}
		}
	};
	/**
	 *
	 * @param {*} e
	 */
	const handleSubmit = (e) => {
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
				console.log(e.currentTarget);
				// passwordInput.setValidated = false
				passwordInput.setCustomValidity("Passwords don't match");
				passwordInput.reportValidity();
				passwordConfirmInput.setCustomValidity("Passwords don't match");
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
			register({
				firstName,
				lastName,
				password,
				email,
				linkedIn,
				githubUsername,
			});
		}

		setValidated(true);
	};

	return (
		<Fragment>
			<Form noValidate validated={validated} onSubmit={handleSubmit} id='registrationForm'>
				<Form.Row>
					<Form.Group as={Col} md='6' controlId='firstName'>
						<Form.Label>First Name</Form.Label>
						<Form.Control type='text' placeholder='First Name' onChange={onChange} name='firstName' required />
						<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>
					<Form.Group as={Col} md='6' controlId='lastName'>
						<Form.Label>Last Name</Form.Label>
						<Form.Control type='text' placeholder='Last Name' onChange={onChange} name='lastName' required />
						<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>
				</Form.Row>
				<Form.Row>
					<Form.Group as={Col} md='12' controlId='email'>
						<Form.Label>Email</Form.Label>
						<Form.Control
							type='email'
							placeholder='Email'
							onChange={onChange}
							name='email'
							pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
							required
						/>
						<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>
				</Form.Row>
				<Form.Row>
					<Form.Group as={Col} md='6' controlId='password1'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							isValid={passwordValid}
							placeholder='Password'
							onChange={onChange}
							name='password'
							required
						/>
						<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>
					<Form.Group as={Col} md='6' controlId='password2'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							isValid={passwordValid}
							placeholder='Confirm Password'
							onChange={onChange}
							name='password2'
							required
						/>
						<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>
				</Form.Row>
				<Form.Row>
					<Form.Group as={Col} md='12' controlId='linkedIn'>
						<Form.Label>LinkedIn profile link</Form.Label>
						<Form.Control
							type='text'
							placeholder='LinkedIn profile link'
							onChange={onChange}
							name='linkedIn'
							pattern='^http(s)?:\/\/(www\.)?linkedin\.com\/in\/.*$'
							required
						/>
						<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>
				</Form.Row>
				<Form.Row>
					<Form.Group as={Col} md='12' controlId='githubUsername'>
						<Form.Label>Github username</Form.Label>
						<Form.Control type='text' placeholder='Github username' onChange={onChange} name='githubUsername' required />
						<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>
				</Form.Row>
			</Form>
		</Fragment>
	);
}
