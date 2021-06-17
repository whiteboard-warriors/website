const express = require('express');
const router = express.Router();
const db = require('../models');

// @route   GET /api/users
// @desc - Get the current users' info
router.get('/', async (req, res) => {
	try {
		const user = await db.User.findOne({
			_id: req.user.id,
		});
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   GET /api/users/:id
// @desc - Get users info except password
router.get('/:id', async (req, res) => {
	try {
		const user = await db.User.find({
			_id: req.params.id,
		});
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   PUT /api/users
// @desc - Update user's info except password
router.put('/:id', async (req, res) => {
	const {
		email,
		firstName,
		lastName,
		slackUsername,
		linkedIn,
		githubUsername,
		primaryLanguage,
		secondaryLanguage,
		skillLevel,
		active,
		jobPosting,
	} = req.body;
	try {
		if (req.user.id !== req.params.id) {
			return res.status(401).json({
				msg: 'You are not authorized to perform this action.',
			});
		}
		const updatedUser = {};
		if (email) updatedUser.email = email;
		if (firstName) updatedUser.firstName = firstName;
		if (lastName) updatedUser.lastName = lastName;
		if (slackUsername) updatedUser.slackUsername = slackUsername;
		if (linkedIn) updatedUser.linkedIn = linkedIn;
		if (githubUsername) updatedUser.githubUsername = githubUsername;
		if (primaryLanguage) updatedUser.primaryLanguage = primaryLanguage;
		if (secondaryLanguage) updatedUser.secondaryLanguage = secondaryLanguage;
		if (active) updatedUser.active = active;
		if (skillLevel) updatedUser.skillLevel = skillLevel;
		if (jobPosting) updatedUser.jobPosting = jobPosting;

		await db.User.findByIdAndUpdate({ _id: req.params.id }, { $set: updatedUser });

		let user = await db.User.find({
			_id: req.params.id,
		});

		res.status(204).json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @TODO
// @route   PUT /api/users
// @desc - Update user's password
router.put('/update-password/:id', async (req, res, next) => {
	const { email } = req.body;

	try {
		crypto.randomBytes(20, function (err, buf) {
			let token = buf.toString('hex');
			done(err, token);
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   DELETE /api/users
// @desc - Delete User
router.put('/delete/:id', async (req, res) => {
	try {
		if (req.user._id !== req.params.id) {
			return res.status(401).json({
				msg: 'You are not authorized to perform this action.',
			});
		}
		await db.User.findByIdAndUpdate(
			{ _id: req.params.id },
			{
				$set: {
					active: false,
				},
			}
		);
		res.status(200).send('Your account has been deleted.');
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
