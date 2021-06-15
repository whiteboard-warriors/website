import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './style.scss';

// Components
import DeleteModal from '../../../DeleteModal';
// Bootstrap
import { Button } from 'react-bootstrap';
// Utils
import dateDifference from '../../../../utils/dateDifference';
// State
import JobsContext from '../../../../context/jobs/jobsContext';
import AuthContext from '../../../../context/auth/authContext';
import AlertContext from '../../../../context/alert/alertContext';

const JobCard = (props) => {
	const history = useHistory();
	const {
		jobID,
		company,
		title,
		city,
		state,
		salary,
		about,
		postDate,
		admin,
		active,
		remote,
		visaSponsorship,
		hardRequirement1,
		hardRequirement2,
		hardRequirement3,
		softRequirement1,
		softRequirement2,
		softRequirement3,
	} = props;
	const jobsContext = useContext(JobsContext);
	const authContext = useContext(AuthContext);
	const alertContext = useContext(AlertContext);

	const { setCurrentJob, updateJob, applyForJob, clearJobFlags } = jobsContext;
	const { user, isAuthenticated } = authContext;
	const { setAlert } = alertContext;

	const [showModal, setShowModal] = useState(false);

	const openModal = () => {
		setShowModal((prev) => {
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
	const applyForJobPosting = (e) => {
		e.preventDefault();
		if (!isAuthenticated) {
			setAlert('Please signup or login to apply for a jobs! Also, please be sure to include your LinkedIn link!', 'warning');
			clearJobFlags();
		} else if (!user.linkedIn) {
			history.push('/profile');
			setAlert('Please update your profile and include your LinkedIn link to be able to apply for jobs', 'warning');
			clearJobFlags();
		} else if (!user.githubUsername) {
			history.push('/profile');
			setAlert('Please update your profile and include your Github username to be able to apply for jobs', 'warning');
			clearJobFlags();
		} else {
			applyForJob({ jobID });
			clearJobFlags();
		}
	};
	// Job validity logic
	let postedDaysAgo = dateDifference(postDate).match(/\d+/g);
	let activeMsg = 'Not Active';
	let activeColor = false;
	if (active === 'true') {
		activeMsg = 'Active';
		activeColor = true;
	}
	if (active === 'true' && postedDaysAgo !== null && parseInt(postedDaysAgo[0]) > 30) {
		activeMsg = 'Expired';
		activeColor = false;
	}

	return (
		<>
			<div className='job-card-container mb-3'>
				<div className='job-card-content'>
					{active && (
						<div className='job-status-container'>
							<p className='job-status'>
								{active && activeColor === true && <b style={{ color: '#04afee' }}>{activeMsg}</b>}
								{active && activeColor === false && <b style={{ color: '#f57f91' }}>{activeMsg} </b>}
							</p>
						</div>
					)}

					<p className='headline'>
						<b>{company}</b> is hiring: <b>{title}</b>
					</p>
					<p className='details'>
						<b>Location:</b> {city}, {state}
						{remote && (
							<>
								{'\u00A0\u00A0\u00A0'} <b> Remote:</b> {remote}
							</>
						)}
						{visaSponsorship && (
							<>
								{'\u00A0\u00A0\u00A0'} <b> Visa Sponsorship:</b> {visaSponsorship}
							</>
						)}
					</p>
					<p className='details'>
						<b> Salary:</b> {salary}
						{'\u00A0\u00A0\u00A0'} <b> Posted: </b> <i>{dateDifference(postDate)}</i>
					</p>
					<p className='about'>
						<i>“{about}”</i>
					</p>
					{hardRequirement1 && (
						<>
							<p>
								<b>Hard Requirements</b>
							</p>
							<div className='requirement-list'>
								<p className='flag-hard-requirement'>
									<span>{hardRequirement1}</span>
								</p>
								<p className='flag-hard-requirement'>
									<span>{hardRequirement2}</span>
								</p>
								<p className='flag-hard-requirement '>
									<span>{hardRequirement3}</span>
								</p>
							</div>
						</>
					)}

					{softRequirement2 && (
						<>
							<p className='mt-4'>
								<b>Soft Requirements</b>
							</p>
							<div className='requirement-list'>
								<p className='flag-soft-requirement'>
									<span>{softRequirement1}</span>
								</p>
								<p className='flag-soft-requirement'>
									<span>{softRequirement2}</span>
								</p>
								<p className='flag-soft-requirement'>
									<span>{softRequirement3}</span>
								</p>
							</div>
						</>
					)}
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
						<Link to={`/jobs/user/${user._id}`} onClick={renewJobPosting} className='btn btn-primary btn-sm '>
							<b>Renew</b>
						</Link>
					) : (
						<Link to='/jobs' onClick={applyForJobPosting} className='btn btn-primary btn-sm '>
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
	admin: 'true',
	active: false,
	remote: 'No',
	visaSponsorship: 'No',
};

export default JobCard;
