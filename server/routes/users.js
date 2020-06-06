const express = require('express');
const router = express.Router();
// const passport = require('../config/passport');
const async = require('async');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const { check, validationResult } = require('express-validator');

// const isAuthenticated = require('../config/middleware/isAuthenticated');

const db = require('../models');

// @route   POST api/users
// @desc - Sign up
router.post(
	'/signup',
	[
		check('firstName', 'Please add your first name.').not().isEmpty(),
		check('lastName', 'Please add your last name.').not().isEmpty(),

		check('email', 'Please include a valid email').isEmail(),
		check(
			'password',
			'Please enter a password with 6 or more characters'
		).isLength({ min: 6 }),
	],

	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		let {
			firstName,
			lastName,
			email,
			password,
			slackUsername,
			linkedIn,
			primaryLanguage,
			secondaryLanguage,
			admin,
		} = req.body;

		try {
			let user = await db.User.findOne({ email });

			if (user) {
				return res.status(400).json({ msg: 'User already exists' });
			}
			user = new db.User({
				firstName,
				lastName,
				email,
				password,
				slackUsername,
				linkedIn,
				primaryLanguage,
				secondaryLanguage,
				admin,
			});

			await user.save();
			res.status(200).send('User Saved');
			// res.redirect(307, 'api/auth/login'); // api login
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route   PUT /api/users
// @desc - Update user's info except password
router.put('/:id', async (req, res) => {
	const {
		email,
		firstName,
		lastName,
		slackUsername,
		linkedIn,
		primaryLanguage,
		secondaryLanguage,
		active,
	} = req.body;
	try {
		if (req.user._id !== req.params.id) {
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
		if (primaryLanguage) updatedUser.primaryLanguage = primaryLanguage;
		if (secondaryLanguage)
			updatedUser.secondaryLanguage = secondaryLanguage;
		if (active) updatedUser.active = active;

		await db.User.findByIdAndUpdate(
			{ _id: req.params.id },
			{ $set: updatedUser }
		);
		res.status(200).send('Your account has been updated.');
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

// @TODO
// @route  POST /api/users
// @desc - Sends a password reset email.
router.post('/forgot-password', async (req, res) => {
	const { password } = req.body;
	try {
		if (req.user._id !== req.params.id) {
			return res.status(401).json({
				msg: 'You are not authorized to perform this action.',
			});
		}
		const user = await db.User.findById(req.params.id);
		user.password = password;

		await user.save();
		res.status(200).send('Your password has been updated.');
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   PUT /api/users
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
