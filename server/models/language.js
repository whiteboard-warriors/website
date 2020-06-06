const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

const LanguageSchema = new Schema({
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},

	language: { type: String, required: true },
});

const Language = mongoose.model('Language', LanguageSchema);

module.exports = Language;
