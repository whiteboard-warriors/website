const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

/**
 *
 */
router.get('/linkedin', passport.authenticate('linkedin'));

/**
 * Callback from LinkedIn SSO
 */
router.get('/linkedin/callback', function (req, res, next) {
	passport.authenticate('linkedin', (err, user, info) => {
		if (info) console.log(info);
		if (err) {
			console.log(err);
			// failureRedirect
			return res.redirect(process.env.HTTP_PROTOCOL + process.env.HOST_NAME);
		}

		if (!user) {
			// failureRedirect
			return res.redirect(process.env.HTTP_PROTOCOL + process.env.HOST_NAME);
		}
		const payload = {
			id: user.id,
			name: `${user.firstName} ${user.lastName}`,
		};
		// Sign token
		jwt.sign(
			payload,
			'secret',
			{
				expiresIn: 31556926, // 1 year in seconds
			},
			(err, token) => {
				res.redirect(process.env.HTTP_PROTOCOL + process.env.HOST_NAME + '/authenticate?token=' + token);
				if (err) console.log(err);
			}
		);
	})(req, res, next);
});

module.exports = router;
