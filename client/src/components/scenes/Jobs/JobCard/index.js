import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

// Components
import DeleteModal from '../../../DeleteModal';
// Bootstrap
import { Button } from 'react-bootstrap';
// Utils
import dateDifference from '../../../../utils/dateDifference';
// State
import JobsContext from '../../../../context/jobs/jobsContext';

const JobCard = (props) => {
	const { jobID, company, title, city, state, salary, about, postDate, admin } = props;
	const jobsContext = useContext(JobsContext);
	const { setCurrentJob } = jobsContext;

	const [showModal, setShowModal] = useState(false);

	const openModal = () => {
		setShowModal((prev) => {
			console.log(prev);
			return !prev;
		});
	};

	//temp
	const deleteJob = () => console.log('job deleted');

	return (
		<>
			<div className='job-card-container mb-3'>
				<div className='job-card-content'>
					<p className='headline'>
						<b>{company}</b> is hiring a <b>{title}</b>
					</p>
					<p className='details'>
						<b>Location:</b> {city}, {state} <b> - Salary:</b> {salary} <b> - </b> <i>{dateDifference(postDate)} ago</i>
					</p>
					<p className='about'>
						<i>“{about}”</i>
					</p>
				</div>
				<div className='job-card-buttons'>
					{admin && (
						<Link
							to={`/jobs/edit/${jobID}`}
							className='btn btn-secondary btn-sm '
							onClick={() => {
								setCurrentJob(jobID);
							}}
						>
							<b>Edit</b>
						</Link>
					)}
					{admin ? (
						<Link to='/' className='btn btn-primary btn-sm '>
							<b>Renew</b>
						</Link>
					) : (
						<Link to='/' className='btn btn-primary btn-sm '>
							<b>Apply</b>
						</Link>
					)}

					{admin && (
						<Button onClick={openModal} className='btn btn-danger btn-sm '>
							<b>Delete</b>
						</Button>
					)}
				</div>
			</div>
			<DeleteModal
				showModal={showModal}
				setShowModal={setShowModal}
				id={jobID}
				action={deleteJob}
				title={title}
				type={'Job'}
				message={'Are you sure you want to delete this event?'}
			/>
		</>
	);
};

JobCard.defaultProps = {
	company: 'Company',
	title: 'Job Title',
	city: 'City',
	state: 'ST',
	salary: '80K to 100K',
	about: 'We are looking for a junior Engineer, passionate about learning and growing',
	postDate: '2 days',
	admin: true,
};

export default JobCard;
