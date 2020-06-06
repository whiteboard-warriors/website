const express = require('express')
const router = express.Router()

const db = require('../models')
const isAuthenticated = require('../config/middleware/isAuthenticated')

// @route   GET /api/jobs
// @desc    Retrieves all events
router.get('/', async (req, res) => {
	try {
		const jobs = await db.Job.find()
		res.json(jobs)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

// @route   POST /api/events
// @desc    Admin creates an event
router.post('/', async (req, res) => {
	let { title } = req.body

	try {
		// check to make sure user making updates has admin rights.
		// let user = await db.User.findOne({ _id: req.user._id });
		// if (user.admin !== true) {
		// 	return res.status(401).json({
		// 		msg: 'You are not authorized to edit this event.',
		// 	});
		// }

		const job = new db.Job({
			// createdBy: req.user._id,
			title: title,
		})
		await job.save()
		res.send('Your job was created!')
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

module.exports = router
