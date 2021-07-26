const express = require('express');
const router = express.Router();

const db = require('../models');

// @route   GET /api/jobs/all
// @desc    Retrieves all jobs
router.get('/', async (req, res) => {
	try {
		const jobs = await db.Job.find().populate('createdBy');
		res.json(jobs);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({
			msg: 'Oops, there was a server error. Please try again.',
		});
	}
});

module.exports = router;
