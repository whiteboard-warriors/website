import React, { Fragment, useContext, useState, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext'
import AlertContext from '../../context/alert/alertContext'
import { Modal, Button, Tabs, Tab, Col, Row, Form } from 'react-bootstrap'
import Alert from '../Alerts'
import './style.scss'
import LoginForm from '../LoginForm'

export default function LoginModal(props) {
	const authContext = useContext(AuthContext)
	const { login, authError, clearErrors } = authContext
	const alertContext = useContext(AlertContext)
	const { setAlert } = alertContext
	const [key, setKey] = useState('log-in')

	useEffect(() => {
		if (authError === 'Invalid Credentials') {
			setAlert(
				"Hmmm, that didn't work please re-enter your username and password or click 'Forgot Password'",
				'danger',25000
			)
			clearErrors()
		}
	}, [authError, clearErrors, setAlert])

	const [user, setUser] = useState({
		email: '',
		password: '',
	})
	const { email, password } = user

	/**
	 *
	 * @param {*} e
	 */
	const onChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value })
	}

	// const handleActionClick = (e) => {
		// console.log()
		// e.preventDefault()
		// if (key === 'log-in') {
		// 	login({ email, password })
		// } else {
		// }
	// }
	const handleSubmit = (e) => {
		e.preventDefault();
    console.log("Form was submitted, now the modal can be closed");
	}

	return (
		<Fragment>
			<Modal {...props}>
				<Modal.Header closeButton>
					<Modal.Title>Login to Whiteboard Warriors</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Alert />
					<Tabs id="controlled-tab" activeKey={key} onSelect={(k) => setKey(k)}>
						<Tab className="p-4" eventKey="log-in" title="Log In">
							<LoginForm></LoginForm>
							{/* <Row>
								<Col>
									<Form className="form-custom-margin">
										<Row>
											<Col>
												<Form.Group controlId="formEmail">
													<Form.Control
														type="text"
														placeholder="E-Mail"
														name="email"
														value={email}
														onChange={onChange}
														required
													/>
												</Form.Group>
											</Col>
										</Row>
										<Row>
											<Col>
												<Form.Group controlId="formPassword">
													<Form.Control
														type="password"
														placeholder="Password"
														name="password"
														value={password}
														onChange={onChange}
														required
													/>
												</Form.Group>
												<a href="/forgot-password">Forgot Password?</a>
											</Col>
										</Row>
									</Form>
								</Col>
							</Row> */}
						</Tab>
						<Tab className="p-4" eventKey="register" title="Register"></Tab>
					</Tabs>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="secondary" onClick={props.onHide}>
						Close
					</Button>
					<Button variant="primary" type="submit"  form="myForm">
						{key === 'log-in' ? 'Login' : 'Register'}
					</Button>
				</Modal.Footer>
			</Modal>
		</Fragment>
	)
}
