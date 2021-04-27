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
		res.status(500).send('Server Error');
	}
});

module.exports = router;
