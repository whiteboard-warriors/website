import React, { Fragment, useState } from 'react'
import { Modal, Button, Tabs, Tab } from 'react-bootstrap'
import Alert from '../Alerts'
import './style.scss'
import LoginForm from '../LoginForm'
import RegistrationForm from '../RegistrationForm'

import linkedIn from './linkedin-signin.png'

export default function LoginModal(props) {
	const [key, setKey] = useState('log-in')

	return (
		<Fragment>
			<Modal {...props}>
				<Modal.Header closeButton>
					<Modal.Title>Login to Whiteboard Warriors</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Alert />
					<div className="text-center">
						<a href="http://localhost:5005/api/auth/linkedin" className="">
							<img
							className="linkedIn-button mx-auto mb-2"
								alt="Sign-In With LinkedIn"
								src={linkedIn}
							></img>
						</a>
					</div>
					<Tabs id="controlled-tab" activeKey={key} onSelect={(k) => setKey(k)}>
						<Tab className="p-4" eventKey="log-in" title="Log In">
							<LoginForm></LoginForm>
						</Tab>
						<Tab className="p-4" eventKey="register" title="Register">
							<RegistrationForm></RegistrationForm>
						</Tab>
					</Tabs>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="secondary" onClick={props.onHide}>
						Close
					</Button>
					<Button
						variant="primary"
						type="submit"
						form={key === 'log-in' ? 'loginForm' : 'registrationForm'}
					>
						{key === 'log-in' ? 'Login' : 'Register'}
					</Button>
				</Modal.Footer>
			</Modal>
		</Fragment>
	)
}
