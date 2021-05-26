import React, { Fragment, useState } from 'react';
import { Modal, Button, Tabs, Tab } from 'react-bootstrap';
import Alert from '../Alerts';
import './style.scss';
import LoginForm from '../LoginForm';
import RegistrationForm from '../RegistrationForm';

export default function LoginModal(props) {
	const { show, setShow } = props;
	const [key, setKey] = useState('log-in');

	return (
		<Fragment>
			<Modal show={show}>
				<Modal.Header closeButton>
					<Modal.Title>Login to Whiteboard Warriors</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Alert />

					<Tabs id='controlled-tab' activeKey={key} onSelect={(k) => setKey(k)}>
						<Tab className='p-4' eventKey='log-in' title='Log In'>
							<LoginForm></LoginForm>
						</Tab>
						<Tab className='p-4' eventKey='register' title='Register'>
							<RegistrationForm></RegistrationForm>
						</Tab>
					</Tabs>
				</Modal.Body>

				<Modal.Footer>
					<Button variant='secondary' onClick={() => setShow(false)}>
						Close
					</Button>
					<Button
						onClick={() => setShow(false)}
						variant='primary'
						type='submit'
						form={key === 'log-in' ? 'loginForm' : 'registrationForm'}
						className='ml-2'
					>
						{key === 'log-in' ? 'Login' : 'Register'}
					</Button>
				</Modal.Footer>
			</Modal>
		</Fragment>
	);
}
