import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
// bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import logo from './ww_logo.svg';
import './style.scss';

const Footer = () => {
	const date = new Date();
	const year = date.getFullYear();

	return (
		<Fragment>
			<footer className='footer'>
				<Container>
					<Row className='footer-top'>
						<Col md={6} className='footer-content-left'>
							<div className='footer-title'>
								<div className='footer-logo'>
									<img src={logo} alt='logo' />
								</div>
								<h4>Whiteboard Warriors</h4>
							</div>
							<div className='footer-social'>
								<h5>Follow us</h5>
								<ul>
									<li>
										<a
											href='https://www.facebook.com/whiteboardwarriors'
											target='_blank'
											rel='noopener noreferrer'
										>
											<i className='fab fa-facebook-f fa-2x footer-social-icon'></i>
										</a>
									</li>
									<li>
										<a
											href='https://www.instagram.com/whiteboardwarriors/'
											target='_blank'
											rel='noopener noreferrer'
										>
											<i className='fab fa-instagram fa-2x footer-social-icon'></i>
										</a>
									</li>
									<li>
										<a
											href='https://www.twitter.com/wbwarriorscode'
											target='_blank'
											rel='noopener noreferrer'
										>
											<i className='fab fa-twitter fa-2x footer-social-icon'></i>
										</a>
									</li>
								</ul>
							</div>
						</Col>
						<Col md={6} className='footer-content-right'>
							<div className='footer-links'>
								<div className='text-center'></div>
								<h5>Organization</h5>
								<ul>
									<li>
										<Link to='/about'>About</Link>
									</li>
									<li>
										<a href='https://github.com/whiteboard-warriors/war-time/graphs/contributors'>
											Contributors
										</a>
									</li>
									<li>
										<Link to='/nonprofit'>Non Profit</Link>
									</li>
									<li>
										<Link to='/testimonials'>
											Testimonials
										</Link>
									</li>
								</ul>
							</div>
							<div className='footer-links'>
								<h5>Get involved</h5>

								<ul>
									<li>
										<Link to='/meetups'>Meetups</Link>
									</li>
									<li>
										<Link to='/volunteer'>Volunteer</Link>
									</li>
								</ul>
							</div>
						</Col>
					</Row>
				</Container>
				<section className='footer-bottom text-center'>
					&copy; {year} Whiteboard Warriors.
				</section>
			</footer>
		</Fragment>
	);
};

export default Footer;
