import React, { Fragment, useContext, useState, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext'
import AlertContext from '../../context/alert/alertContext'
import { Col, Row, Form, Button } from 'react-bootstrap'

export default function LoginForm({handleSubmit}) {
	const authContext = useContext(AuthContext)
	const { login, authError, clearErrors, isAuthenticated } = authContext
	const alertContext = useContext(AlertContext)
	const { setAlert } = alertContext

	// useEffect(() => {
	// 	if (authError === 'Invalid Credentials') {
	// 		console.log('error')
	// 		setAlert(
	// 			"Hmmm, that didn't work please re-enter your username and password or click 'Forgot Password'",
	// 			'danger'
	// 		)
	// 		clearErrors()
	// 	}
	// 	// eslint-disable-next-line
	// }, [authError, isAuthenticated, props.history])

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

	const handleActionClick = e => {
		console.log('now submit the form')
	}

	/**
	 *
	 * @param {*} e
	 */ 
	const onSubmit = (e) => {
		e.preventDefault()
		console.log('got submit')
		// login({
		// 	email,
		// 	password,
		// })
	}

	return (
		<Fragment>
			<Row>
				<Col>
					<Form
						onSubmit={onSubmit}
						className="form-custom-margin"
						id="myForm"
					>
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
						{/* <div className="text-center">
							<Button variant="primary" type="submit" size="lg">
								Sign In
							</Button>
						</div> */}
					</Form>
				</Col>
			</Row>
		</Fragment>
	)
}
