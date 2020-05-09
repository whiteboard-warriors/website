import React, { Fragment } from 'react'
import Header from '../Header'
import Footer from '../Footer'
// import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Media from 'react-bootstrap/Media'

import TaiMaiProfile from '../../img/testimonials/tye-mai/tye-mai.jpeg'
import testimonoials from './testimonials.scss'

const Testimonials = () => {
	return (
		<Fragment>
			<Header></Header>
			<div className='scene-content'>
				<Container>
					<Row>
						<Col>
							<div>
								<Media>
									<img width={128} height={128} src={TaiMaiProfile} alt='Tye Mai' className='mr-3' />
									<Media.Body>
										<h5>Tye Mai</h5>
										<p>
											Tye was just starting her journey into a career in technology when she joined Whiteboard Warriors.
											Prior to working in technology she had worked as a Financial Analyst, and an English teacher in
											Spain. Her family immigrated to the United States from Vietnam, and neither of her parents attended a
											4-year university
											<br />
											<br />
											Tye decided to pursue a career in software development because of the new challenge and her love of
											technology. When reflecting on her previous professional experience & current job in technology she
											states:
											<br />
											<br />
											<p>
												<blockquote>
													Every job challenges you in a different way: different rules, goals & targets to meet,
													however, working with software is like solving a different puzzle everyday... I've never felt
													so empowered in my professional work.
												</blockquote>
											</p>
											<p>
												When starting her journey into coding Tye started small doing tutorials online, and
												self-teaching.
											</p>
										</p>
									</Media.Body>
								</Media>
								<hr />
							</div>
						</Col>
					</Row>
				</Container>
			</div>

			<Footer />
		</Fragment>
	)
}

export default Testimonials
