import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
// bootstrap
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

import './navbar.scss';
import LoginModal from '../LoginModal';

export default function NavBar(props) {
	const [show, setShow] = useState(false);
	const authContext = useContext(AuthContext);
	const alertContext = useContext(AlertContext);
	const { setAlert } = alertContext;
	const {
		isAuthenticated,
		logout,
		user,
		registrationSuccess,
		clearErrors,
	} = authContext;

	useEffect(() => {
		if (registrationSuccess) {
			setAlert('Great Success! Welcome!', 'success');
			setShow(false);
			clearErrors();
		}
		// eslint-disable-next-line
	}, [registrationSuccess]);

	const displayModal = (e) => {
		e.preventDefault();
		setShow(true);
	};

	const aboutTitle = (
		<Fragment>
			<i className='navbar-icon fas fa-info-circle'></i>
			About
		</Fragment>
	);

	const authLinks = (
		<Fragment>
			{isAuthenticated ? (
				<Fragment>
					<NavDropdown
						title={user.firstName ? user.firstName : ''}
						id='collasible-nav-dropdown'
					>
						<Link
							data-rb-event-key='/profile'
							className='dropdown-item'
							to='/profile'
						>
							Profile
						</Link>

						<Link onClick={logout} className='dropdown-item' to='/'>
							Log Out
						</Link>
					</NavDropdown>
					<ul className='navbar-nav'>
						<li className='nav-item avatar'>
							<Link className='nav-link p-0' to='/profile'>
								<img
									src='https://mdbootstrap.com/img/Photos/Avatars/avatar-5.jpg'
									className='profile-pic rounded-circle z-depth-0'
									alt='avatar'
								></img>
							</Link>
						</li>
					</ul>
				</Fragment>
			) : (
				<Link onClick={displayModal} className='nav-link' to='/'>
					<i className='navbar-icon fas fa-sign-in-alt'></i>
					Login
				</Link>
			)}
		</Fragment>
	);

	return (
		<Fragment>
			<Navbar
				bg='light'
				expand='lg'
				className='d-flex justify-content-lg-around'
			>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Container>
						<Nav>
							<Link className='nav-link' to='/donate'>
								<i className='navbar-icon fas fa-donate'></i>
								Donate
							</Link>
							<Link className='nav-link' to='/volunteer'>
								<i className='navbar-icon fas fa-hand-paper'></i>
								Volunteer
							</Link>
							<Link className='nav-link' to='/meetups'>
								<i className='navbar-icon fab fa-meetup'></i>
								Meetups
							</Link>
						</Nav>
					</Container>
					<Container className='d-flex justify-content-lg-end'>
						<Nav>
							<Link className='nav-link' to='/jobs'>
								<i className='navbar-icon fa fa-briefcase'></i>
								Jobs
							</Link>
							<NavDropdown
								title={aboutTitle}
								id='basic-nav-dropdown'
							>
								<NavDropdown.Item as='div'>
									<Link className='nav-link' to='/about'>
										<i className='navbar-icon fas fa-info'></i>
										Our Story
									</Link>
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item as='div'>
									<Link
										className='nav-link'
										to='/testimonials'
									>
										<i className='navbar-icon fas fa-bullhorn'></i>
										Testimonials
									</Link>
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item as='div'>
									<Link className='nav-link' to='/nonprofit'>
										<i className='navbar-icon fas fa-users'></i>
										Non-Profit
									</Link>
								</NavDropdown.Item>
							</NavDropdown>

							<Link className='nav-link' to='/'>
								<i className='navbar-icon fas fa-user-ninja'></i>
								Home
							</Link>
						</Nav>
						{authLinks}
					</Container>
				</Navbar.Collapse>
			</Navbar>

			<LoginModal show={show} onHide={() => setShow(false)}></LoginModal>
		</Fragment>
	);
}
