import React, { Fragment } from 'react';

import Footer from '../Footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
// import ArticleContent from '../ArticleContent';
import Col from 'react-bootstrap/Col';

const Volunteer = () => {
	return (
		<Fragment>
			<Container>
				<Row className='single'>
					<Col>
						<h1 className='p-5 m-5 text-center'>Volunteer </h1>
						{/* TODO Replace with CMS ArticleContent */}
						<div class='volunteer-content'>
							<p>
								Currently the best way to find out how you can help Whiteboard Warriors is to
								<a href='https://join.slack.com/t/whiteboardwarriors/shared_invite/zt-bphxxiuf-Eeo0NOvjzaas2xMIgZ_Z7A'>
									{' '}
									join our Slack
								</a>{' '}
								community and ask how you can contribute!
							</p>
							<p>
								We have a number of active open-source projects for developers of all skill-levels to get involved improving our
								website and meet-up management app.
							</p>
						</div>
					</Col>
				</Row>
			</Container>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<Footer />
		</Fragment>
	);
};

export default Volunteer;
