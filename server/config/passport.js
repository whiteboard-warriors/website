const { Strategy, ExtractJwt } = require('passport-jwt')

var db = require('../models')

const secret = process.env.SECRET || 'secret'

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: secret,
}

module.exports = (passport) => {
	passport.use(
		new Strategy(opts, (payload, done) => {
			db.User.findById(payload.id)
				.then((user) => {
					if (user) {
						return done(null, {
							id: user.id,
							name: user.name,
							email: user.email,
						})
					}
					return done(null, false)
				})
				.catch((err) => console.error(err))
		})
	)
}
