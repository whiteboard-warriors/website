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
		res.status(500).json({
			msg: 'Oops, there was a server error. Please try again.',
		});
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
		res.status(500).json({
			msg: 'Oops, there was a server error. Please try again.',
		});
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
		let user = await db.User.find({
			_id: req.params.id,
		});
		if (email) {
			console.log(email);
			if (user[0].email === email) {
				return res.status(400).json({
					msg: "You're already using this email.",
				});
			}
			let emailTaken = await db.User.find({
				email: email,
			});
			// if (Object.keys(emailTaken).length > 1) {
			if (emailTaken[0]) {
				// if (emailTaken[0].email === email) {
				return res.status(401).json({
					msg: 'Someone is already using this email.',
				});
				// }
			}
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

		user = await db.User.find({
			_id: req.params.id,
		});

		res.status(204).json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({
			msg: 'Oops, there was a server error. Please try again.',
		});
	}
});

// @TODO
// @route   PUT /api/users
// @desc - Update user's password
router.put('/update-password/:id', async (req, res, next) => {
	if (req.user.id !== req.params.id) {
		return res.status(401).json({
			msg: 'You are not authorized to perform this action.',
		});
	}
	const { password } = req.body;

	try {
		const user = await db.User.findOne({ _id: req.params.id });
		user.email = user.email;
		user.password = password;
		user.save();
		res.send('Password updated.');
	} catch (err) {
		console.error(err.message);
		res.status(500).json({
			msg: 'Oops, there was a server error. Please try again.',
		});
	}
});

// @route   DELETE /api/users
// @desc - Delete User
router.delete('/delete/:id', async (req, res) => {
	try {
		console.log(req.user);
		if (req.user.id !== req.params.id) {
			return res.status(401).json({
				msg: 'You are not authorized to perform this action.',
			});
		}
		await db.Job.deleteMany({ createdBy: req.params.id });

		await db.User.deleteOne({ _id: req.params.id });

		res.status(200).json({
			msg: 'The profile and data has been deleted.',
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).json({
			msg: 'Oops, there was a server error. Please try again.',
		});
	}
});

module.exports = router;
