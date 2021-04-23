const express = require('express');
const router = express.Router();

const db = require('../models');
const isAuthenticated = require('../config/middleware/isAuthenticated');

// @route   GET /api/jobs
// @desc    Retrieves all jobs
router.get('/', async (req, res) => {
	try {
		const jobs = await db.Job.find().populate('createdBy');
		res.json(jobs);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

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
		res.status(500).send('Server Error');
	}
});

// @route   GET /api/jobs/created-by/user/
// @desc    Retrieves job by user who created it.
router.get('/created-by/user/', async (req, res) => {
	console.log('get job by created by called');
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
		res.status(500).send('Server Error');
	}
});

// @route   POST /api/jobs
// @desc     creates a job
router.post('/', async (req, res) => {
	let { company, title, city, state, salary, about } = req.body;
	console.log(req.body);
	console.log(req.user);

	try {
		// check to make sure user making updates has job posting rights.
		let user = await db.User.findOne({ _id: req.user.id });
		if (user.jobPosting !== 'yes') {
			return res.status(401).json({
				msg:
					'You are not authorized to create a job post. Please update your profile to create job posts.',
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
			postDate: new Date(),
		});
		await job.save();
		res.send('Your job was created!');
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
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
		if (postDate) job.postDate = new Date();

		await db.Job.findOneAndUpdate({ _id: req.params.id }, { $set: job });
		res.send('Your job was updated!');
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
