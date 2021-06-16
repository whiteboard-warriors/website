import React, { Fragment } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap/';

import wwLogo from '../../../img/logo/ww_logo.svg';
import './style.scss';

const index = () => {
	return (
		<Fragment>
			<h1 className='mt5r mb3r text-center'>Privacy Policy</h1>

			<Container>
				<div className='text-center'>
					<Image className='privacy-policy-ww-logo' src={wwLogo} />
				</div>
				<Row>
					<Col md={{ span: 8, offset: 2 }} className='mt4r about'>
						<h4>Who has access to my personal data?</h4>
						<p className='lead'>
							Even though freeCodeCamp has thousands of volunteers, none of those people have access to your private data.
							freeCodeCamp has a few full-time staff, some of whom work directly on our databases. They have the ability to view
							your private data, but only do so when providing you with technical support. As for the personal data that you choose
							to share on your developer portfolio, anyone on the internet can see it by navigating to your developer portfolio's
							public URL. Again, we've given you full control over what parts of your developer profile are public.
						</p>
						<h4>Who has access to my personal data?</h4>
						<p className='lead'>
							Even though freeCodeCamp has thousands of volunteers, none of those people have access to your private data.
							freeCodeCamp has a few full-time staff, some of whom work directly on our databases. They have the ability to view
							your private data, but only do so when providing you with technical support. As for the personal data that you choose
							to share on your developer portfolio, anyone on the internet can see it by navigating to your developer portfolio's
							public URL. Again, we've given you full control over what parts of your developer profile are public.
						</p>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default index;
