const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();

const PORT = process.env.PORT || 5005;

// Define middleware here

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
	session({
		secret: 'whiteboardwarriors',
		resave: true,
		saveUninitialized: true,
		// cookie: { secure: true }
	})
);
app.use(passport.initialize());
require('./config/passport')(passport);
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('/', (req, res) => {
		res.sendFile(process.cwd() + '/client/build/index.html');
	});

	app.get('/sitemap.xml', (req, res) => {
		res.sendFile(process.cwd() + '/client/public/sitemap.xml');
	});
}
// Add routes, both API and view
app.use('/api/users', passport.authenticate('jwt', { session: false }), require('./routes/users'));
app.use('/api/jobs', passport.authenticate('jwt', { session: false }), require('./routes/jobs'));
app.use('/api/all/jobs', require('./routes/allJobs'));
app.use('/api/auth', require('./routes/auth'));

// Connect to the Mongo DB
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/war-time', {
	useNewUrlParser: true,
	useFindAndModify: false,
});

// Start the API server
app.listen(PORT, function () {
	console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
