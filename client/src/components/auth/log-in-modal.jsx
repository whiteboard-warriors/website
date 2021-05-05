import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';

export default function LogIn(props) {
	const [key, setKey] = useState('log-in');
	return (
		<Modal {...props} size='md' aria-labelledby='contained-modal-title-vcenter' centered>
			<Tabs id='controlled-tab-example' activeKey={key} onSelect={(k) => setKey(k)}>
				<Tab className='p-4' eventKey='log-in' title='Log In'>
					<Form>
						<Form.Group controlId='log-in'>
							<Form.Label>Log In</Form.Label>
							<Form.Control type='text' placeholder='Email' />
						</Form.Group>
						<Form.Group controlId='log-in-password'>
							<Form.Label>Password</Form.Label>
							<Form.Control type='password' placeholder='Password' />
						</Form.Group>
						<Button variant='primary' type='submit'>
							Submit
						</Button>
					</Form>
				</Tab>
				<Tab className='p-4' eventKey='sign-up' title='Sign Up'>
					<Form>
						<Form.Group controlId='formBasicEmail'>
							<Form.Label>First Name</Form.Label>
							<Form.Control type='text' placeholder='Enter first name' />
						</Form.Group>
						<Form.Group controlId='sign-up-email'>
							<Form.Label>Email address</Form.Label>
							<Form.Control type='email' placeholder='Enter email' />
							<Form.Text className='text-muted'>We'll never share your email with anyone else.</Form.Text>
						</Form.Group>
						<Form.Group controlId='sign-up-password'>
							<Form.Label>Password</Form.Label>
							<Form.Control type='password' placeholder='Password' />
							<Form.Text className='text-muted'>
								Password must have:
								<br />
								1 uppercase letter
								<br />
								1 lowercase letter
								<br />
								1 number
								<br />8 characters or longer
							</Form.Text>
						</Form.Group>
						<Form.Group controlId='confirm-password'>
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control type='password' placeholder='Confirm Password' />
						</Form.Group>
						<Button variant='primary' type='submit'>
							Submit
						</Button>
					</Form>
				</Tab>
			</Tabs>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}
