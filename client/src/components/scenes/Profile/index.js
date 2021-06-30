import React, { Fragment, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './style.scss';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import DeleteModal from '../../DeleteModal';
import AuthContext from '../../../context/auth/authContext';
import AlertContext from '../../../context/alert/alertContext';
import placeholder from './placeholder.jpeg';

const Profile = () => {
	const history = useHistory();
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);
	const { setAlert } = alertContext;
	const {
		user,
		updateUserProfile,
		updateProfileSuccess,
		updatePasswordSuccess,
		updateUserEmail,
		updateUserPassword,
		updateEmailSuccess,
		deleteProfileSuccess,
		clearSuccess,
		authError,
		clearLoginFlags,
		deleteUserProfile,
		logout,
	} = authContext;
	/**
	 *
	 */

	useEffect(() => {
		if (deleteProfileSuccess) {
			history.push('/');
			setAlert(
				`We're sorry to see you go. Your profile and all of your data has been deleted and never shared with anyone. Feel free to come back at any time!`,
				'info',
				7000
			);

			clearLoginFlags();
		}
		if (updateProfileSuccess) {
			setAlert('Your profile has been updated.', 'success', 2000);
			clearSuccess();
		}
		if (updateEmailSuccess) {
			setAlert('Your email has been updated. Remember to login with your updated email next time.', 'success', 4500);
			clearSuccess();
		}
		if (updatePasswordSuccess) {
			setAlert('Your password has been updated. Remember to login with your updated password next time.', 'success', 4500);
			clearSuccess();
		}

		if (authError) {
			setAlert(authError, 'danger', 4000);
			history.push('/profile');
			clearLoginFlags();
		}
		// eslint-disable-next-line
	}, [updateProfileSuccess, updateEmailSuccess, updatePasswordSuccess, deleteProfileSuccess, authError, history, user]);

	const [profile, setProfile] = useState({
		id: user._id || '',
		firstName: user.firstName || '',
		lastName: user.lastName || '',
		slackUsername: user.slackUsername || '',
		linkedIn: user.linkedIn || '',
		githubUsername: user.githubUsername || '',
		primaryLanguage: user.primaryLanguage || '',
		secondaryLanguage: user.secondaryLanguage || '',
		skillLevel: user.skillLevel || '',
		jobPosting: user.jobPosting || '',
	});
	const [showModal, setShowModal] = useState(false);
	const [userEmail, setUserEmail] = useState({
		email: '',
	});
	const { email } = userEmail;
	const [userPassword, setUserPassword] = useState({
		password: '',
		password2: '',
	});
	const { password, password2 } = userPassword;
	const [passwordValid, setPasswordValid] = useState(false);
	const [validated, setValidated] = useState(false);
	const [emailValid, setEmailValid] = useState(false);

	const { id, firstName, lastName, slackUsername, linkedIn, githubUsername, primaryLanguage, secondaryLanguage, skillLevel, jobPosting } =
		profile;

	const openModal = () => {
		setShowModal((prev) => {
			return !prev;
		});
	};

	const onChangeProfile = (e) => {
		setProfile({ ...profile, [e.target.name]: e.target.value });
	};
	const onChangeEmail = (e) => {
		setUserEmail({ ...userEmail, [e.target.name]: e.target.value });
		const form = e.currentTarget.form;
		const emailInput = form.elements['email'];
		if (emailInput.checkValidity()) {
			emailInput.checkValidity();
			emailInput.reportValidity();
			setEmailValid(true);
		}
	};
	const onChangePassword = (e) => {
		setUserPassword({ ...userPassword, [e.target.name]: e.target.value });
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

	const saveProfile = (e) => {
		e.preventDefault();
		updateUserProfile({
			id,
			firstName,
			lastName,
			slackUsername,
			linkedIn,
			githubUsername,
			primaryLanguage,
			secondaryLanguage,
			skillLevel,
			jobPosting,
		});
	};
	const updateEmail = (e) => {
		e.preventDefault();
		const form = e.currentTarget;
		const emailInput = form.elements['email'];
		// console.log('emailInput: ', emailInput.value);
		// console.log('check validity', form.checkValidity());
		// form.checkValidity();
		// form.reportValidity();
		let valid = true;
		if (emailInput.checkValidity() === false) {
			e.stopPropagation();
		} else {
			if (!emailInput.checkValidity()) {
				emailInput.setCustomValidity('Email format not valid. Please enter a valid email');
				emailInput.reportValidity();
				valid = false;
			} else if (emailValid) {
				emailInput.setCustomValidity('');
				emailInput.reportValidity();
				setEmailValid(true);
				valid = true;
			}
		}
		if (valid) {
			updateUserEmail({
				id,
				email,
			});
		}

		setEmailValid(true);
	};

	const updatePassword = (e) => {
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
			updateUserPassword({
				id,
				password,
			});
		}

		setValidated(true);
	};

	return (
		<Fragment>
			<Container className='mb-5'>
				<div className='text-center mb-5'>
					<h1 className='mt-5'>Profile</h1>
				</div>
				<div className='profile-img-container '>
					<img src={user.avatar ? user.avatar : placeholder} alt='profile' />
				</div>
				<Row>
					<Col lg={{ span: 6, offset: 3 }}>
						<Form
							onSubmit={saveProfile}
							// className='form-custom-margin'
						>
							<Row>
								<Col xs={12} sm={6}>
									<Form.Group>
										<Form.Label>First Name</Form.Label>
										<Form.Control
											type='text'
											placeholder='What is your preferred name?'
											name='firstName'
											value={firstName}
											onChange={onChangeProfile}
											required
										/>
									</Form.Group>
								</Col>
								<Col xs={12} sm={6}>
									<Form.Group>
										<Form.Label>Last Name</Form.Label>
										<Form.Control
											type='text'
											placeholder='What is your family/last name?'
											name='lastName'
											value={lastName}
											onChange={onChangeProfile}
											required
										/>
									</Form.Group>
								</Col>
							</Row>

							<Form.Group>
								<Form.Label>Whiteboard Warriors Slack Username</Form.Label>
								<Form.Control
									type='text'
									placeholder='Your Whiteboard Warriors Slack user'
									onChange={onChangeProfile}
									name='slackUsername'
									defaultValue={slackUsername}
									id='slackUsername'
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label htmlFor='linkedInVanityUrl'>LinkedIn Profile</Form.Label>
								<Form.Control
									type='text'
									placeholder='https://www.linkedin.com/in/...'
									onChange={onChangeProfile}
									name='linkedIn'
									defaultValue={linkedIn}
									id='linkedInVanityUrl'
								/>
								<Form.Text id='linkedInVanityUrlHelpBlock' muted>
									Your complete LinkedIn Profile url, for example:{' '}
									<a href='https://linkedin.com/in/jordanbaucke/'>https://linkedin.com/in/jordanbaucke/</a>
									<br />
									*Even if you logged in with LinkedIn, <em>we're just not cool enough</em> for them to share this us
									automatically 🤷‍♂
								</Form.Text>
							</Form.Group>
							<Form.Group>
								<Form.Label htmlFor='githubUsernameVanityUrl'>Github Username</Form.Label>
								<Form.Control
									type='text'
									placeholder='Your Github username'
									onChange={onChangeProfile}
									name='githubUsername'
									defaultValue={githubUsername}
									id='githubUsernameVanityUrl'
								/>
							</Form.Group>

							<Row className='mt-5'>
								<Col>
									<fieldset>
										<Form.Group>
											<Form.Label>Primary Language</Form.Label>
											<Col sm={10} onChange={onChangeProfile}>
												<Form.Check
													type='radio'
													label='JavaScript'
													value='javascript'
													name='primaryLanguage'
													id='primarylanguageJavaScript'
													checked={primaryLanguage === 'javascript'}
													onChange={(event) => onChangeProfile(event)}
													disabled={secondaryLanguage === 'javascript'}
												/>
												<Form.Check
													type='radio'
													label='C/C++/Java/Go'
													value='c-cplusplus-java-go'
													name='primaryLanguage'
													id='primarylanguageCJavaGo'
													checked={primaryLanguage === 'c-cplusplus-java-go'}
													onChange={(event) => onChangeProfile(event)}
													disabled={secondaryLanguage === 'c-cplusplus-java-go'}
												/>
												<Form.Check
													type='radio'
													label='Python/Ruby'
													value='python-ruby'
													name='primaryLanguage'
													id='primarylanguagePythonRuby'
													checked={primaryLanguage === 'python-ruby'}
													onChange={(event) => onChangeProfile(event)}
													disabled={secondaryLanguage === 'python-ruby'}
												/>
											</Col>
										</Form.Group>
									</fieldset>
								</Col>

								<Col>
									<fieldset>
										<Form.Group>
											<Form.Label>Secondary Language</Form.Label>
											<Col sm={10}>
												<Form.Check
													type='radio'
													label='JavaScript'
													value='javascript'
													name='secondaryLanguage'
													id='secondarylanguageJavaScript'
													checked={secondaryLanguage === 'javascript'}
													onChange={onChangeProfile}
													disabled={primaryLanguage === 'javascript'}
												/>
												<Form.Check
													type='radio'
													label='C/C++/Java/Go'
													value='c-cplusplus-java-go'
													name='secondaryLanguage'
													id='secondarylanguageCJavaGo'
													checked={secondaryLanguage === 'c-cplusplus-java-go'}
													onChange={onChangeProfile}
													disabled={primaryLanguage === 'c-cplusplus-java-go'}
												/>
												<Form.Check
													type='radio'
													label='Python/Ruby'
													name='secondaryLanguage'
													value='python-ruby'
													id='secondarylanguagePythonRuby'
													checked={secondaryLanguage === 'python-ruby'}
													onChange={onChangeProfile}
													disabled={primaryLanguage === 'python-ruby'}
												/>
											</Col>
										</Form.Group>
									</fieldset>
								</Col>
							</Row>

							<Row>
								<Col>
									<fieldset>
										<Form.Group>
											<Form.Label>Skill Level</Form.Label>
											<Col sm={10} onChange={onChangeProfile}>
												<Form.Check
													onChange={onChangeProfile}
													type='radio'
													label='Beginner (Less than 1-year coding) '
													name='skillLevel'
													id='skillLevelAdvanced'
													value='beginner'
													checked={skillLevel === 'beginner'}
												/>
												<Form.Check
													onChange={onChangeProfile}
													type='radio'
													label='Easy (1-2 Years Coding)'
													name='skillLevel'
													id='skillLevelEasy'
													value='easy'
													checked={skillLevel === 'easy'}
												/>
												<Form.Check
													onChange={onChangeProfile}
													type='radio'
													label='Medium (2-5 years coding)'
													name='skillLevel'
													id='skillLevelMedium'
													value='medium'
													checked={skillLevel === 'medium'}
												/>
												<Form.Check
													onChange={onChangeProfile}
													type='radio'
													label='Hard (5+ years)'
													name='skillLevel'
													id='skillLevelHard'
													value='hard'
													checked={skillLevel === 'hard'}
												/>
											</Col>
										</Form.Group>
									</fieldset>
								</Col>
							</Row>

							{/* job posting */}
							<Row>
								<Col>
									<fieldset>
										<Form.Group>
											<h4 className='my-4'>Job Posting </h4>
											<Col sm={10} onChange={onChangeProfile}>
												<Form.Check
													onChange={onChangeProfile}
													type='radio'
													label='I want to post jobs'
													name='jobPosting'
													id='jobPostingTrue'
													value='yes'
													checked={jobPosting === 'yes'}
												/>
												<Form.Check
													onChange={onChangeProfile}
													type='radio'
													label="I don't want to post jobs"
													name='jobPosting'
													id='jobPostingFalse'
													value='no'
													checked={jobPosting === 'no'}
												/>
											</Col>
										</Form.Group>
									</fieldset>
								</Col>
							</Row>
							{/* job posting */}

							<Button variant='primary' type='submit'>
								Save
							</Button>
						</Form>

						<hr className='my-4' />
						<h4 className='my-4'>Change Password</h4>
						<Form noValidate validated={passwordValid} className='form-custom-margin' onSubmit={updatePassword}>
							<Form.Group>
								<Form.Control
									type='password'
									isValid={passwordValid}
									placeholder='Password'
									onChange={onChangePassword}
									name='password'
									value={password}
									required
								/>

								<Form.Control
									type='password'
									isValid={passwordValid}
									placeholder='Confirm Password'
									onChange={onChangePassword}
									name='password2'
									value={password2}
									required
								/>
							</Form.Group>
							<Button variant='primary' type='submit'>
								Reset
							</Button>
						</Form>
						<hr className='my-4' />
						<h4>Change E-Mail</h4>
						<Form noValidate validated={emailValid} className='form-custom-margin' onSubmit={updateEmail}>
							<Form.Group>
								<Form.Control
									name='email'
									type='email'
									placeholder='Enter new email'
									onChange={onChangeEmail}
									pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
									value={email}
									required
								/>
							</Form.Group>
							<Button variant='primary' type='submit'>
								Update
							</Button>
						</Form>
						<hr className='my-4' />
						<h4>Danger Zone</h4>
						<p className='mt2r btn btn-danger btn-md' onClick={openModal}>
							<b>Delete profile and personal data</b>
						</p>
					</Col>
				</Row>
			</Container>
			<DeleteModal
				showModal={showModal}
				setShowModal={setShowModal}
				id={user._id}
				action={deleteUserProfile} //
				message={'Are you sure you want to delete your profile and data? This action cannot be reversed.'}
				type={'DELETE_PROFILE'}
				logout={logout}
			/>
		</Fragment>
	);
};

export default Profile;
