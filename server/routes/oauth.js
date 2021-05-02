const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

/**
 *
 */
router.get('/linkedin', passport.authenticate('linkedin'))

/**
 * Callback from LinkedIn SSO
 */
router.get(
	'/linkedin/callback',
	passport.authenticate('linkedin', { session: false }),
	function (req, res) {
		console.log('req.user: ' + req.user)
		const payload = {
			id: req.user.id,
			name: req.user.name,
		}
		// Sign token
		jwt.sign(
			payload,
			'secret',
			{
				expiresIn: 31556926, // 1 year in seconds
			},
			(err, token) => {
				res.redirect('http://localhost:3000/authenticate?token=' + token)
				// res.json({
				// 	success: true,
				// 	token: 'Bearer ' + token,
				// })
			}
		)
	}
)
module.exports = router
