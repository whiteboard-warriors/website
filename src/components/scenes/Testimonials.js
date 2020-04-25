import React, { Fragment } from 'react';
import Header from '../Header';
import Footer from '../Footer';
// import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const Testimonials = () => {
	return (
		<Fragment>
			<Header></Header>
			<div className='scene-content'>
				<Container>
					<Row>
						<Col className='m-5'>
							<h1 className='m-5'> -</h1>
							<h1 className='m-5'>-</h1>
							<h1 className='m-5'></h1>
							<h1 className='m-5'></h1>
						</Col>
					</Row>
				</Container>
			</div>

			<Footer />
		</Fragment>
	);
};

export default Testimonials;
