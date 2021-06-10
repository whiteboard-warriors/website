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
		type: String,
		default: 'true',
	},
	remote: {
		type: String,
		default: 'no',
	},
	visaSponsorship: {
		type: String,
		default: 'no',
	},
	hardRequirement1: {
		type: String,
		maxLength: 40,
	},
	hardRequirement2: {
		type: String,
		maxLength: 40,
	},
	hardRequirement3: {
		type: String,
		maxLength: 40,
	},
	softRequirement1: {
		type: String,
		maxLength: 40,
	},
	softRequirement2: {
		type: String,
		maxLength: 40,
	},
	softRequirement3: {
		type: String,
		maxLength: 40,
	},
	postDate: {
		type: Date,
		required: true,
	},
});

const Job = mongoose.model('Job', JobSchema);

module.exports = Job;
