import React, { Fragment } from 'react'
import './style.scss'

import Footer from '../../Footer'
import Container from 'react-bootstrap/esm/Container'
import Header from '../../Header'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
const Donate = () => {
	return (
		<Fragment>
			<Header></Header>
			<div className="scene-content">
				<Container>
					<Row className="mt4r">
						<Col md={{ span: 8, offset: 2 }}>
							<h1 className="text-center mb4r">
								Donating to Whiteboard Warriors
							</h1>
							<p className="text-center">
								If you would like to Donate:{' '}
								<strong>
									Visit our{' '}
									<a
										target="_blank"
										href="https://www.facebook.com/whiteboardwarriors"
									>
										Facebook Page
									</a>{' '}
									and Click the "Donate" Button! 🙏
								</strong>
							</p>
							<p className="text-block-2">
								We founded Whiteboard Warriors with the principle that: "those
								looking to take advantage of the economic and sociological
								opportunity that exists in the 21st Century for coding-jobs
								should have access to high-quality, free or nominally priced
								resources to help them get there in hopes that they will
								pay-it-forward by helping/mentoring/speaking to others who wish
								to gain access to the industry" (Whiteboard Warrior events are
								free and always will be!)
							</p>

							<p>
								We are currently accepting donations through{' '}
								<a href="https://www.facebook.com/nonprofits">
									Facebook's Donation Processing for Non-Profits
								</a>{' '}
								(which allows us to receive donations without paying transaction
								fees!)
							</p>
							<p>
								All Donations are Tax Deductible as we are a{' '}
								<a href="/nonprofit">
									California Incorporated 501(c)(3) Non-Profit.
								</a>{' '}
							</p>
							<p>Donations are used to fund:</p>
							<ol>
								<li>Meetup.com Membership Fees</li>
								<li>Food & Drink for Events when they are hosted in-person</li>
								<li>Resources: Whiteboards, Markers, Erasers</li>
								<li>
									Printing of Promotional Materials: Flyers & Stickers, etc.
								</li>
								<li>Banking and Registration Fees for Non-Profit</li>
								<li>Design Services</li>
								<li>Hosting Services</li>
								<li>
									Compensating volunteers for going above and beyond technical
									contributions
								</li>
								<li>
									Transportation Costs for volunteers to appear in-person to
									promote Whiteboard Warriors
								</li>
							</ol>
						</Col>
					</Row>
				</Container>
			</div>

			<Footer />
		</Fragment>
	)
}

export default Donate
