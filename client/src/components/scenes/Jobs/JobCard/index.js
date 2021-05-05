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
	const { jobID, company, title, city, state, salary, about, postDate, admin, active } = props;
	const jobsContext = useContext(JobsContext);
	const { setCurrentJob, updateJob } = jobsContext;

	const [showModal, setShowModal] = useState(false);

	const openModal = () => {
		setShowModal((prev) => {
			console.log(prev);
			return !prev;
		});
	};

	const renewJobPosting = (e) => {
		e.preventDefault();
		updateJob({
			_id: jobID,
			postDate: true,
			active: 'true',
		});
	};

	let activeMsg = 'Not Active';
	let activeColor = false;
	if (active === 'true') {
		activeMsg = 'Active';
		activeColor = true;
	}

	return (
		<>
			<div className='job-card-container mb-3'>
				<div className='job-card-content'>
					<p className='headline'>
						<b>{company}</b> is hiring a <b>{title}</b>{' '}
						{active && activeColor === true && <b style={{ color: '#04afee' }}>{`  | ${activeMsg}`} </b>}
						{active && activeColor === false && <b style={{ color: '#f57f91' }}>{`  | ${activeMsg}`} </b>}
					</p>
					<p className='details'>
						<b>Location:</b> {city}, {state} <b> - Salary:</b> {salary} <b> - Posted: </b> <i>{dateDifference(postDate)}</i>
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
						<Link to='/' onClick={renewJobPosting} className='btn btn-primary btn-sm '>
							<b>Renew</b>
						</Link>
					) : (
						<Link to='/' className='btn btn-primary btn-sm '>
							<b>Apply</b>
						</Link>
					)}

					{admin && (
						<Button onClick={openModal} className='btn btn-danger btn-sm '>
							<b>Deactivate</b>
						</Button>
					)}
				</div>
			</div>
			<DeleteModal
				showModal={showModal}
				setShowModal={setShowModal}
				id={jobID}
				action={updateJob}
				title={title}
				type={'Job'}
				message={'Are you sure you want to deactivate this job?'}
				company={company}
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
	active: false,
};

export default JobCard;
