const { Strategy, ExtractJwt } = require('passport-jwt')
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy
var db = require('../models')
const utilService = require('../service/utilservice')
const secret = process.env.SECRET || 'secret'
const LINKEDIN_KEY = process.env.LINKEDIN_KEY || ''
const LINKEDIN_SECRET = process.env.LINKEDIN_SECRET || ''

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
	passport.use(
		new LinkedInStrategy(
			{
				clientID: LINKEDIN_KEY,
				clientSecret: LINKEDIN_SECRET,
				callbackURL:
					process.env.HTTP_PROTOCOL +
					process.env.HOST_SERVER_NAME +
					'/oauth/linkedin/callback',
				scope: ['r_emailaddress', 'r_liteprofile'],
				state: true,
			},
			async function (token, tokenSecret, profile, done) {
				// first attempt to find an existing user with this LinkedIn Profile
				// or an email on their LinkedIn in our database
				var user = await db.User.findOne({
					$or: [{ linkedIn: profile.id }, { email: profile.emails[0].value }],
				})
				if (!user) {
					console.log('creating user')
					user = new db.User({
						firstName: profile.name.givenName,
						lastName: profile.name.familyName,
						email: profile.emails[0].value,
						password: utilService.generateRandomString(16),
						avatar: profile.photos[0].value,
						linkedIn: profile.id,
						admin: false,
						active: true,
					})

					await user.save()
				} else if(user.linkedIn !== profile.id){
					// set this user's profile to use this LinkedIn
					user.linkedIn = profile.id;
					await user.save();
				}

				return done(null, user)
			}
		)
	)
}
