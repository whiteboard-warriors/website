import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import LogIn from '../auth/log-in-modal';
// bootstrap
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import './navbar.scss';

export default function NavBar(props) {
	const [show, setShow] = useState(false);
	const aboutTitle = (
		<Fragment>
			<i className='navbar-icon fas fa-info-circle'></i>
			About
		</Fragment>
	);
	// const meetupTitle = (
	// 	<Fragment>
	// 		<i className='navbar-icon fab fa-meetup'></i>
	// 		Meetups
	// 	</Fragment>
	// )
	// const resourcesTitle = (
	// 	<Fragment>
	// 		<i className='navbar-icon fas fa-globe'></i>
	// 		Resources
	// 	</Fragment>
	// );
	return (
		<Fragment>
			<Navbar bg='light' expand='lg' className='d-flex justify-content-lg-around'>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Container>
						<Nav>
							<Link className='nav-link' to='/'>
								<i className='navbar-icon fas fa-user-ninja'></i>
								Home
							</Link>
							<NavDropdown title={aboutTitle} id='basic-nav-dropdown'>
								<NavDropdown.Item as='div'>
									<Link className='nav-link' to='/about'>
										<i className='navbar-icon fas fa-info'></i>
										Our Story
									</Link>
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item as='div'>
									<Link className='nav-link' to='/testimonials'>
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
							{/* <NavDropdown
								title={meetupTitle}
								id="basic-nav-dropdown">
								<NavDropdown.Item as="div">
									<Link className="nav-link" to="/meetups">
										<i className="navbar-icon fas fa-microchip"></i>
										Palo Alto, CA
									</Link>
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item as="div">
									<Link className="nav-link" to="/meetups">
										<i className="navbar-icon fas fa-umbrella-beach"></i>
										Orange County, CA
									</Link>
								</NavDropdown.Item>
							</NavDropdown> */}
							<Link className='nav-link' to='/meetups'>
								<i className='navbar-icon fab fa-meetup'></i>
								Meetups
							</Link>
						</Nav>
					</Container>
					<Container className='d-flex justify-content-lg-end'>
						<Nav>
						<Link className='nav-link' to='/donate'>
								<i className='navbar-icon fas fa-donate'></i>
								Donate
							</Link>
							<Link className='nav-link' to='/volunteer'>
								<i className='navbar-icon fas fa-hand-paper'></i>
								Volunteer
							</Link>
							{/* <NavDropdown title={resourcesTitle} id='basic-nav-dropdown'>
								<NavDropdown.Item as='div'>
									<Link className='nav-link' to='/jobs'>
										<i className='navbar-icon fas fa-briefcase'></i>
										Jobs
									</Link>
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item as='div'>
									<Link className='nav-link' to='/jobs'>
										<i className='navbar-icon fas fa-file'></i>
										Resume Uploader
									</Link>
								</NavDropdown.Item>
							</NavDropdown>
							<span className='nav-link log-in' onClick={() => setShow(true)}>
								<i className='navbar-icon fas fa-user'></i>
								Sign Up/Log In
							</span> */}
						</Nav>
					</Container>
				</Navbar.Collapse>
			</Navbar>
			<LogIn show={show} onHide={() => setShow(false)} />
		</Fragment>
	);
}
