import React, { Fragment, useContext, useState, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext'
import { Modal, Button } from 'react-bootstrap'

import './style.scss'

export default function LoginModal(props) {
	const authContext = useContext(AuthContext)
	const { login, error, clearErrors, isAuthenticated } = authContext

	useEffect(() => {
		// if (error === 'Invalid Credentials') {
		// 	setAlert(
		// 		"Hmmm, that didn't work please re-enter your username and password or click 'Forgot Password'",
		// 		'danger'
		// 	)
		// 	clearErrors()
		// }
		// eslint-disable-next-line
	}, [error, isAuthenticated, props.history])

	const [user, setUser] = useState({
		email: '',
		password: '',
	})

	const { email, password } = user
	const handleClose = () => {}
	const onChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value })
	}

	const onSubmit = (e) => {
		e.preventDefault()
		login({
			email,
			password,
		})
	}

	return (
		<Fragment>
			<Modal {...props}>
				<Modal.Header closeButton>
					<Modal.Title>Modal title</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<p>Modal body text goes here.</p>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="secondary">Close</Button>
					<Button variant="primary">Save changes</Button>
				</Modal.Footer>
			</Modal>
		</Fragment>
	)
}
