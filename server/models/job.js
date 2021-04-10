const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

const JobSchema = new Schema({
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	company: {
		type: String,
	},
	title: {
		type: String,
	},
	city: {
		type: String,
	},
	state: {
		type: String,
	},
	salary: {
		type: String,
	},
	about: {
		type: String,
	},
	active: {
		type: Boolean,
		default: true,
	},
	postDate: {
		type: Date,
		required: true,
	},
});

const Job = mongoose.model('Job', JobSchema);

module.exports = Job;
