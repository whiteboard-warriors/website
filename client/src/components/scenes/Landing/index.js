import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Header';
import Container from 'react-bootstrap/Container';
// import ArticleListing from '../ArticleListing'
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
// state
import AuthContext from '../../../context/auth/authContext';
import AlertContext from '../../../context/alert/alertContext';
// styles
import './style.scss';

const Landing = () => {
	const authContext = useContext(AuthContext);
	const alertContext = useContext(AlertContext);
	const { user, loginSuccess, clearLoginFlags } = authContext;
	const { setAlert } = alertContext;

	useEffect(() => {
		if (loginSuccess && user) {
			console.log(user.firstName);
			setAlert(`Welcome, ${user.firstName}!`, 'success');
			clearLoginFlags();
		}

		// eslint-disable-next-line
	}, [loginSuccess]);

	return (
		<Fragment>
			<Header className=''></Header>
			<div className='banner'>
				<h2>Software engineers of all levels coming together to sharpen their coding interview skills</h2>
				<Link to='/meetups' rel='noopener noreferrer'>
					<Button size='lg' className='btn-xl btn-cta-dark'>
						Join The Meetup
					</Button>
				</Link>
			</div>
			<Container className='text-center'>
				<h3 className='subtitle'>What Happens At Whiteboard Warriors</h3>
				<Row className='mt-5 card-container'>
					<div className='info-card'>
						{/* <img alt='icon' src='https://img.icons8.com/ios/100/000000/interactive-whiteboard.png' /> */}
						<img
							alt='icon'
							src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAAwElEQVRoge2YXQ6AIAyD0Xj/S6nn0heJf4goY9bRL+HNTErpZnSOEPI107KK0pZ+gRYhIaNbT1FieSRr9sdNNwEhxa+BELu9d6kPAhE8aNMZ+SVVCVGZA7mYcSTWtTyo3WuHGUeqEsKwa8Kwo1GVEIZdE4YdjaqEMOyaMOxoUAgasYzAd6otIUcG9V085/TvNwfp+ZJVz0xGKASNlMl+B0R3oyMbpL7Fspw14wiFoGFGyJugXoXybehF6plxhKAxA1Y8PkB7J7YZAAAAAElFTkSuQmCC'
						/>
						<h4>Practice On The Whiteboard</h4>
						<p>Pair up with another engineer of similar language and problem level. Each of you will take a turn for 45 minutes.</p>
					</div>

					<div className='info-card'>
						<img alt='icon' src='https://img.icons8.com/wired/100/000000/code.png' />
						<h4>Improve Coding Skills</h4>
						<p>
							Practice makes perfect. At our War Time events you get to sharpen your coding skills with other engineers of all
							levels.
						</p>
					</div>

					<div className='info-card'>
						<img alt='icon' src='https://img.icons8.com/wired/100/000000/meeting.png' />
						<h4>Meet New People</h4>
						<p>
							They say "it's all about who you know". At the War Time events, you get the chance to meet people in the industry and
							expand your network.
						</p>
					</div>
				</Row>
				{/* <h1>Hi</h1>
				<h2>Hello</h2>
				<h3>Oi</h3>
				<h4>Ola</h4>
				<h5>Tchau</h5> */}
				<Row className='text-center mt-5'>
					<Container className='text-center mt-5'>
						<Link to='/about' rel='noopener noreferrer'>
							<Button size='lg' className='btn-xl btn-cta-light'>
								Learn More
							</Button>
						</Link>
					</Container>
				</Row>
			</Container>
		</Fragment>
	);
};

export default Landing;
