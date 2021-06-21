const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../models');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const crypto = require('crypto');
const emailService = require('../service/emailservice');
const passport = require('passport');
const SECRET = process.env.SECRET || 'secret';

// @route   POST api/auth
// @desc - Login
router.post('/login', async function (req, res) {
	const { email, password } = req.body;
	let user = await db.User.findOne({ email: email });
	if (!user) {
		return res.status(400).json({
			msg: 'Invalid Credentials',
		});
	}

	// Check password
	bcrypt.compare(password, user.password).then((isMatch) => {
		if (isMatch) {
			// User matched
			// Create JWT Payload
			const payload = {
				id: user._id,
				name: `${user.firstName} ${user.lastName}`,
			};
			// Sign token
			jwt.sign(
				payload,
				SECRET,
				{
					expiresIn: 31556926, // 1 year in seconds
				},
				(err, token) => {
					res.json({
						success: true,
						token: 'Bearer ' + token,
					});
				}
			);
			console.log(user.firstName, ' is now logged in.');
		} else {
			return res.status(400).json({
				msg: 'Invalid Credentials',
			});
		}
	});
});

// @route   POST api/auth
// @desc - Logout
router.post('/logout', function (req, res) {
	req.logout();
	res.json({}).redirect('/login');
});

// @route   POST api/auth
// @desc - Sign up
router.post(
	'/',
	[
		check('firstName', 'Please add your first name.').not().isEmpty(),
		check('lastName', 'Please add your last name.').not().isEmpty(),

		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
		check('linkedIn', 'Please a valid LinkedIn link').isLength({ min: 25 }),
		check('githubUsername', 'Please add your Github username.').not().isEmpty(),
	],

	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		let { firstName, lastName, email, password, linkedIn, githubUsername } = req.body;

		try {
			let user = await db.User.findOne({ email });

			if (user) {
				console.log(user);
				return res.status(400).json({ msg: 'This email has already been registered. Please login or signup with a different email' });
			}
			user = new db.User({
				firstName,
				lastName,
				email,
				password,
				linkedIn,
				githubUsername,
			});
			// console.log('routes/auth.js - user to be saved >>> ', user);

			await user.save();

			const newUser = await db.User.findOne({ email });
			// console.log('auth.js 128 - newUser >> ', newUser);
			console.log(newUser);
			const payload = {
				id: newUser.id,
				name: `${newUser.firstName} ${newUser.lastName}`,
			};
			jwt.sign(
				payload,
				SECRET,
				{
					expiresIn: 31556926, // 1 year in seconds
				},
				(err, token) => {
					if (err) throw err;
					res.json({
						success: true,
						token: 'Bearer ' + token,
					});
				}
			);

			emailService.sendWelcomeConfirmation(email);
			res.status(200).send('User Saved');
			// res.redirect(307, 'api/auth/login'); // api login
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

/**
 *
 */
router.post('/forgot-password-init', async (req, res) => {
	const { email } = req.body;

	try {
		const user = await db.User.findOne({ email: email });

		if (!user) {
			return res.status(401).json({
				msg: "This email hasn't been registered under a user yet. Please try another email.",
			});
		}

		if (user !== undefined) {
			// generate a token and save it to the users record
			const buf = crypto.randomBytes(20);
			let updatedUser = {};
			updatedUser.token = buf.toString('hex');

			await db.User.findByIdAndUpdate({ _id: user._id }, { $set: updatedUser });

			emailService.sendPasswordResetEmail(user.email, updatedUser.token);
		}
		res.send(200);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({
			msg: 'Oops, something went wrong. Please try again later.',
		});
	}
});

// @route  POST /api/users
// @desc - Sends a password reset email.
router.post('/forgot-password-complete', async (req, res) => {
	const { password, token } = req.body;

	try {
		const user = await db.User.findOne({ token: token });

		if (user === null) {
			res.status(401).json({ msg: 'INVALID_TOKEN' });
		} else {
			user.password = password;
			user.token = null;
			await user.save();
			res.status(200).send('Your password has been updated.');
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

/**
 *
 */
router.get('/linkedin', passport.authenticate('linkedin'));

/**
 * Callback from LinkedIn SSO
 */
router.get('/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), function (req, res) {
	// Successful authentication, redirect home.
	res.redirect('/');
});

module.exports = router;
