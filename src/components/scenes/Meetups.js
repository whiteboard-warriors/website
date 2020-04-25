import React, { Fragment } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import MeetupMap from '../MeetupMap';
import Container from 'react-bootstrap/Container';
// import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Meetup from '../../img/icon/Meetup.svg';
import './style.scss';

const Meetups = () => {
	return (
		<Fragment>
			<Header></Header>
			<div className='scene-content meetups'>
				<Container>
					<Row>
						<Col>
							<h1 className='p-5 m-5'>Meetups</h1>
							<div className='meetup-link'>
								<a href='https://www.meetup.com/whiteboard-warriors'>
									<img className='meetup-logo' src={Meetup} alt='meetup logo'></img>
									<span className='meetup-location-title'>Irvine, CA</span>
								</a>
							</div>
							<div className='meetup-link'>
								<a href='https://www.meetup.com/whiteboard-warriors-silicon-valley'>
									<img className='meetup-logo' src={Meetup} alt='meetup logo'></img>
									<span className='meetup-location-title'>San Mateo, CA</span>
								</a>
							</div>
						</Col>
						<Col>
							<div className='p-5 m-5 text-center'>
								<MeetupMap></MeetupMap>
							</div>
						</Col>
					</Row>
				</Container>
			</div>

			<Footer />
		</Fragment>
	);
};

export default Meetups;
