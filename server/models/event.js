const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

const EventSchema = new Schema({
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	location: {
		type: String,
		required: 'Event location is required',
	},
	date: {
		type: Date,
		required: true,
	},
	startTime: {
		type: Date,
		required: true,
	},
	endTime: {
		type: Date,
		required: true,
	},
	languages: {
		type: Array,
		required: true,
	},

	levels: [
		{
			type: Number,
			required: 'Array of levels is required',
			enums: [
				1, //'easy',
				2, //'medium',
				3, //'hard'
			],
		},
	],
	attendees: [
		{
			attendee: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
			isMatched: {
				type: Boolean,
				default: false,
			},
			level: {
				type: Number,
				required: 'You must enter problem level',
			},
		},
	],
	matches: [
		{
			user1: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
			user2: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
			user3: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
			user4: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
			docLink: {
				type: String,
			},
			level: {
				type: Number,
				required: 'You must enter problem level',
			},
		},
	],
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
