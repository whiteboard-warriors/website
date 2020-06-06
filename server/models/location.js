const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	name: {
		type: String,
		required: 'Location name is required',
	},
	street: {
		type: String,
	},
	unit: {
		type: String,
	},
	city: {
		type: String,
		required: 'Location city is required',
	},
	state: {
		type: String,
		required: 'Location state is required',
	},
	zipCode: {
		type: String,
	},
	onlinePlatform: {
		type: String,
	},
});

const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;
