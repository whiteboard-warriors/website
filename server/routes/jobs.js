const express = require('express');
const router = express.Router();

const db = require('../models');
// const isAuthenticated = require('../config/middleware/isAuthenticated');
const { sendJobApplicationEmail } = require('../service/emailservice');

// @route   GET /api/jobs
// @desc    Retrieves one job
router.get('/:id', async (req, res) => {
	try {
		const job = await db.Job.findOne({
			_id: req.params.id,
		}).populate('createdBy');
		res.json(job);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({
			msg: 'Oops, there was a server error. Please try again.',
		});
	}
});

// @route   GET /api/jobs/created-by/user/
// @desc    Retrieves job by user who created it.
router.get('/created-by/user/', async (req, res) => {
	try {
		// check to make sure user making updates has job posting rights.
		let user = await db.User.findOne({ _id: req.user.id });
		if (user.jobPosting !== 'yes') {
			return res.status(401).json({
				msg: 'You are not authorized to edit this job.',
			});
		}
		const jobs = await db.Job.find({
			createdBy: req.user.id,
		}).populate('createdBy');
		console.log('jobs: ', jobs);
		res.json(jobs);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({
			msg: 'Oops, there was a server error. Please try again.',
		});
	}
});

// @route   POST /api/jobs
// @desc     creates a job
router.post('/', async (req, res) => {
	let {
		company,
		title,
		city,
		state,
		salary,
		about,
		remote,
		visaSponsorship,
		hardRequirement1,
		hardRequirement2,
		hardRequirement3,
		softRequirement1,
		softRequirement2,
		softRequirement3,
	} = req.body;

	try {
		// check to make sure user making updates has job posting rights.
		let user = await db.User.findOne({ _id: req.user.id });
		if (user.jobPosting !== 'yes') {
			return res.status(401).json({
				msg: 'You are not authorized to create a job post. Please update your profile to create job posts.',
			});
		}

		const job = new db.Job({
			createdBy: req.user.id,
			company,
			title,
			city,
			state,
			salary,
			about,
			remote,
			visaSponsorship,
			hardRequirement1,
			hardRequirement2,
			hardRequirement3,
			softRequirement1,
			softRequirement2,
			softRequirement3,
			postDate: new Date(),
		});
		await job.save();
		res.send('Your job was created!');
	} catch (err) {
		console.error(err.message);
		res.status(500).json({
			msg: 'Oops, there was a server error. Please try again.',
		});
	}
});

// @route   PUT /api/jobs/admin
// @desc    Allows Admin to update job
router.put('/:id', async (req, res) => {
	let {
		company,
		title,
		city,
		state,
		salary,
		about,
		active,
		remote,
		visaSponsorship,
		hardRequirement1,
		hardRequirement2,
		hardRequirement3,
		softRequirement1,
		softRequirement2,
		softRequirement3,
		postDate,
	} = req.body;
	try {
		// check to make sure user making updates has job posting rights.
		let user = await db.User.findOne({ _id: req.user.id });
		if (user.jobPosting !== 'yes') {
			return res.status(401).json({
				msg: 'You are not authorized to edit this job.',
			});
		}
		const job = {};
		if (company) job.company = company;
		if (title) job.title = title;
		if (city) job.city = city;
		if (state) job.state = state;
		if (salary) job.salary = salary;
		if (about) job.about = about;
		if (active) job.active = active;
		if (remote) job.remote = remote;
		if (visaSponsorship) job.visaSponsorship = visaSponsorship;
		if (hardRequirement1) job.hardRequirement1 = hardRequirement1;
		if (hardRequirement2) job.hardRequirement2 = hardRequirement2;
		if (hardRequirement3) job.hardRequirement3 = hardRequirement3;
		if (softRequirement1) job.softRequirement1 = softRequirement1;
		if (softRequirement2) job.softRequirement2 = softRequirement2;
		if (softRequirement3) job.softRequirement3 = softRequirement3;
		if (postDate) job.postDate = new Date();

		await db.Job.findOneAndUpdate({ _id: req.params.id }, { $set: job });
		res.json({
			msg: 'Job has been updated',
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).json({
			msg: 'Oops, there was a server error. Please try again.',
		});
	}
});

// @route   POST /api/jobs/apply-for-job
// @desc    Applicant applies for job application
router.post('/apply-for-job', async (req, res) => {
	const { jobID } = req.body;
	// console.log(jobID);
	// console.log(req.user);
	try {
		const job = await db.Job.findOne({ _id: jobID }).populate('createdBy');
		console.log(job.createdBy.firstName);
		console.log(job.createdBy.email);
		const user = await db.User.findOne({ _id: req.user.id });
		console.log(user.linkedIn);
		if (!user) {
			return res.status(401).json({
				msg: 'Please login to apply for jobs',
			});
		}
		if (!user.linkedIn) {
			return res.status(400).json({
				msg: 'Please update your user profile and include your LinkedIn link to apply for jobs',
			});
		}
		// sendJobApplicationEmail = (applicantName, applicantEmail, linkedIn, githubUsername, employerName, employerEmail)
		sendJobApplicationEmail(user.firstName, user.email, user.linkedIn, user.githubUsername, job.createdBy.firstName, job.createdBy.email);

		res.send('Your job application was submitted successfully');
	} catch (err) {
		console.error(err.message);
		res.status(500).json({
			msg: 'Oops, there was a server error. Please try again.',
		});
	}
});

module.exports = router;
