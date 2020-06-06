const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

const Schema = mongoose.Schema

const JobSchema = new Schema({
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	title: {
		type: String,
	},
})

const Job = mongoose.model('Job', JobSchema)

module.exports = Job
