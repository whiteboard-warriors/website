import React, { Fragment } from 'react'
import Header from '../Header'
import Footer from '../layout/Footer'
import MeetupMap from '../meetup-map/MeetupMap'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const Meetups = () => {
	return (
		<Fragment>
			<Header></Header>
			<Container>
				<Row>
					<h1 className="p-5 m-5">Meetups</h1>
					<div className="p-5 m-5 text-center">
						<MeetupMap></MeetupMap>
					</div>
				</Row>
			</Container>

			<Footer />
		</Fragment>
	)
}

export default Meetups
