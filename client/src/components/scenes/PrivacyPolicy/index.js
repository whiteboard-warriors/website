import React, { Fragment } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap/';

import wwLogo from '../../../img/logo/ww_logo.svg';
import './style.scss';

const PrivacyPolicy = () => {
	return (
		<Fragment>
			<h1 className='mt5r mb3r text-center'>Privacy Policy</h1>

			<Container>
				<div className='text-center'>
					<Image className='privacy-policy-ww-logo' src={wwLogo} />
				</div>
				<Row>
					<Col md={{ span: 8, offset: 2 }} className='mt4r about'>
						<h4>Excepteur sint occaecat non proident?</h4>
						<p className='lead'>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
							aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
							Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
						</p>
						<h4>Lorem ipsum dolor sit amet?</h4>
						<p className='lead'>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
							aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
							Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
							occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</p>
						<h4>Excepteur sint occaecat non proident?</h4>
						<p className='lead'>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
							aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
							Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
						</p>
						<h4>Lorem ipsum dolor sit amet?</h4>
						<p className='lead'>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
							aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
							Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
							occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</p>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default PrivacyPolicy;
