const { Strategy, ExtractJwt } = require('passport-jwt');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var db = require('../models');
const utilService = require('../service/utilservice');
const secret = process.env.SECRET || 'secret';
const LINKEDIN_KEY = process.env.LINKEDIN_KEY || '';
const LINKEDIN_SECRET = process.env.LINKEDIN_SECRET || '';

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: secret,
};

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
						});
					}
					return done(null, false);
				})
				.catch((err) => console.error(err));
		})
	);
	passport.use(
		new LinkedInStrategy(
			{
				clientID: LINKEDIN_KEY,
				clientSecret: LINKEDIN_SECRET,
				callbackURL:
					process.env.HTTP_PROTOCOL +
					(process.env.NODE_ENV === 'production' ? process.env.HOST_NAME : process.env.HOST_SERVER_NAME) +
					'/oauth/linkedin/callback',
				scope: ['r_emailaddress', 'r_liteprofile'],
				state: true,
				passReqToCallback: true,
			},
			async function (req, token, tokenSecret, profile, done) {
				// first attempt to find an existing user with this LinkedIn Profile
				// or an email on their LinkedIn in our database
				var user = await db.User.findOne({
					$or: [{ linkedInProfileId: profile.id }, { email: profile.emails[0].value }],
				});
				if (!user) {
					console.log('Create user from LinkedIn');
					user = new db.User({
						firstName: profile.name.givenName,
						lastName: profile.name.familyName,
						email: profile.emails[0].value,
						password: utilService.generateRandomString(16),
						avatar: profile.photos[0].value,
						linkedInProfileId: profile.id,
						linkedInToken: token,
						linkedIn: '',
						admin: false,
						active: true,
					});

					await user.save();
				} else if (user.linkedInProfileId !== profile.id) {
					console.log('Existing user adding LinkedIn');
					// set this user's profile to use this LinkedIn
					user.linkedInProfileId = profile.id;
					user.linkedInToken = token;
					user.avatar = user.avatar ? user.avatar : profile.photos[0].value;
					await user.save();
				}

				return done(null, user);
			}
		)
	);
};
