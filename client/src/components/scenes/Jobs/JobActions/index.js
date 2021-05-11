import React from 'react';
import { Link } from 'react-router-dom';
// Bootstrap
import { Row, Col } from 'react-bootstrap';
// Style
import './style.scss';

const JobActions = (props) => {
	const { user } = props;
	return (
		<Row>
			<Col
				// lg={{ span: 2, offset: 8 }}
				className='admin-buttons-container'
			>
				<Link to='/jobs/post' className='btn btn-primary btn-md '>
					<b>Create a job post</b>
				</Link>
				{user && user.jobPosting === 'yes' && (
					<Link to={`/jobs/user/${user._id}`} className='btn btn-secondary btn-md mr-3'>
						<b>My job posts</b>
					</Link>
				)}
			</Col>
		</Row>
	);
};

export default JobActions;
