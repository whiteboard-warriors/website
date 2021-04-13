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

// @route   POST /api/jobs
// @desc     creates a job
router.post('/', async (req, res) => {
	let { company, title, city, state, salary, about } = req.body;

	try {
		// check to make sure user making updates has job posting rights.
		let user = await db.User.findOne({ _id: req.user.id });
		if (user.jobPosting !== true) {
			return res.status(401).json({
				msg: 'You are not authorized to edit this job.',
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
		if (user.jobPosting !== true) {
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
		if (active === 'true') job.active = true;
		if (active === 'false') job.active = false;
		if (postDate) job.postDate = new Date();

		await db.Job.findOneAndUpdate({ _id: req.params.id }, { $set: job });
		res.send('Your job was updated!');
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
