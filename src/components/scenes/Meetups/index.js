import React, { Fragment } from 'react';
import Header from '../../Header';
import Footer from '../../Footer';
import MeetupMap from '../../MeetupMap';
import Container from 'react-bootstrap/Container';
// import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Meetup from './Meetup.svg';
import './style.scss';

const Meetups = () => {
	return (
		<Fragment>
			<Header></Header>
			<div className='scene-content meetups'>
				<Container className='mt4r'>
					<h1 className='mb5r text-center'>Meetups</h1>
					<Row>
						<Col md={{ span: 4, offset: 2 }}>
							<div className='meetup-link'>
								<a href='https://www.meetup.com/whiteboard-warriors' target='_blank' rel='noopener noreferrer'>
									<img className='meetup-logo' src={Meetup} alt='meetup logo'></img>
									<span className='meetup-location-title'>Irvine, CA</span>
								</a>
							</div>
							<div className='meetup-link'>
								<a href='https://www.meetup.com/whiteboard-warriors-silicon-valley' target='_blank' rel='noopener noreferrer'>
									<img className='meetup-logo' src={Meetup} alt='meetup logo'></img>
									<span className='meetup-location-title'>San Mateo, CA</span>
								</a>
							</div>
						</Col>
						<Col md='4'>
							<div className=' text-center'>
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
