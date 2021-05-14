import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
// bootstrap
import { Container, Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
// state
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
// components
import LoginModal from '../LoginModal';
// styles
import './navbar.scss';
import logo from './ww_text_logo.svg';
// import logo from './ww_logo.svg';

export default function NavBar() {
	const [show, setShow] = useState(false);
	const [navExpanded, setNavExpanded] = useState(false);
	const authContext = useContext(AuthContext);
	const alertContext = useContext(AlertContext);
	const { setAlert } = alertContext;
	const { isAuthenticated, logout, user, registrationSuccess, clearErrors } = authContext;

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
		closeNav();
	};

	const toggleNav = () => {
		setNavExpanded((prev) => {
			return !prev;
		});
	};

	const closeNav = () => {
		setNavExpanded(false);
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
					<NavDropdown title={user.firstName ? user.firstName : ''} id='collasible-nav-dropdown'>
						<Link data-rb-event-key='/profile' className='dropdown-item' to='/profile' onClick={closeNav}>
							Profile
						</Link>

						<Link onClick={logout} className='dropdown-item' to='/' onClick={closeNav}>
							Log Out
						</Link>
					</NavDropdown>
					<ul className='navbar-nav'>
						<li className='nav-item avatar'>
							<Link className='nav-link p-0' to='/profile' onClick={closeNav}>
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
			<Navbar bg='light' expand='lg' className='d-flex justify-content-lg-around' onToggle={toggleNav} expanded={navExpanded}>
				<Link to='/' className='navbar-brand' onClick={closeNav}>
					{/* <b>Whiteboard</b> <img src={logo} alt='whiteboard warriors logo' className='nav-logo' /> <b>Warriors</b> */}
					<img src={logo} alt='whiteboard warriors logo' className='nav-logo' />
				</Link>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Container>
						<Nav>
							<Link className='nav-link' to='/donate' onClick={closeNav}>
								<i className='navbar-icon fas fa-donate'></i>
								Donate
							</Link>
							<Link className='nav-link' to='/volunteer' onClick={closeNav}>
								<i className='navbar-icon fas fa-hand-paper'></i>
								Volunteer
							</Link>
							<Link className='nav-link' to='/meetups' onClick={closeNav}>
								<i className='navbar-icon fab fa-meetup'></i>
								Meetups
							</Link>
						</Nav>
					</Container>
					<Container className='d-flex justify-content-lg-end'>
						<Nav>
							<Link className='nav-link' to='/jobs' onClick={closeNav}>
								<i className='navbar-icon fa fa-briefcase'></i>
								Jobs
							</Link>
							<NavDropdown title={aboutTitle} id='basic-nav-dropdown'>
								<NavDropdown.Item as='div'>
									<Link className='nav-link' to='/about' onClick={closeNav}>
										<i className='navbar-icon fas fa-info'></i>
										Our Story
									</Link>
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item as='div'>
									<Link className='nav-link' to='/testimonials' onClick={closeNav}>
										<i className='navbar-icon fas fa-bullhorn'></i>
										Testimonials
									</Link>
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item as='div'>
									<Link className='nav-link' to='/nonprofit' onClick={closeNav}>
										<i className='navbar-icon fas fa-users'></i>
										Non-Profit
									</Link>
								</NavDropdown.Item>
							</NavDropdown>

							<Link className='nav-link' to='/' onClick={closeNav}>
								<i className='navbar-icon fas fa-user-ninja'></i>
								Home
							</Link>
						</Nav>
						{authLinks}
					</Container>
				</Navbar.Collapse>
			</Navbar>

			<LoginModal show={show} setShow={setShow}></LoginModal>
		</Fragment>
	);
}
