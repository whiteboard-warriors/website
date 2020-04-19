import React, { Fragment } from 'react'
// bootstrap
// import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './footer.scss'

const Footer = () => {
	const date = new Date()
	const year = date.getFullYear()

	return (
		<Fragment>
			<footer className='footer'>
				<Container className='footer-top'>
					<Row>
						<Col xs={4} md={4} className='footer-social'>
							<h5 className='text-uppercase'>Follow us:</h5>
							<ul>
								<li>
									<a href='https://www.facebook.com/whiteboardwarriors' target='_blank'>
										<i className='fab fa-facebook-f fa-2x'></i>
									</a>
								</li>
								<li>
									<a href='https://www.twitter.com/wbwarriorscode' target='_blank'>
										<i className='fab fa-twitter fa-2x'></i>
									</a>
								</li>
								<li>
									<a href='https://www.instagram.com/whiteboardwarriors/' target='_blank'>
										<i className='fab fa-instagram fa-2x'></i>
									</a>
								</li>
							</ul>
						</Col>
						{/* <Col xs={8} md={8}>
							<Row className='footer-links'>
								<Col xs={4} md={4}>
									<ul>
										<li>
											<a href='#!' target='_blank'>
												Link 1
											</a>
										</li>
										<li>
											<a href='#!' target='_blank'>
												Link 2
											</a>
										</li>
										<li>
											<a href='#!' target='_blank'>
												Link 3
											</a>
										</li>
									</ul>
								</Col>
								<Col xs={4} md={4}>
									<ul>
										<li>
											<a href='#!' target='_blank'>
												Link 1
											</a>
										</li>
										<li>
											<a href='#!' target='_blank'>
												Link 2
											</a>
										</li>
										<li>
											<a href='#!' target='_blank'>
												Link 3
											</a>
										</li>
									</ul>
								</Col>
								<Col xs={4} md={4}>
									<ul>
										<li>
											<a href='#!' target='_blank'>
												Link 1
											</a>
										</li>
										<li>
											<a href='#!' target='_blank'>
												Link 2
											</a>
										</li>
										<li>
											<a href='#!' target='_blank'>
												Link 3
											</a>
										</li>
									</ul>
								</Col>
							</Row>
						</Col> */}
						{/* <Col xs={6} md={3} className='footer-links'></Col> */}
					</Row>
				</Container>
				<section className='footer-bottom text-center'>&copy; {year} Whiteboard Warriors.</section>
			</footer>
		</Fragment>
	)
}

export default Footer
