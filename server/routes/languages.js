const express = require('express');
const router = express.Router();
// const passport = require('../config/passport');

const db = require('../models');
// var isAuthenticatedData = require('../config/middleware/isAuthenticatedData');

// @route   POST /add language
// @desc    Admin can add a language

router.post('/', async (req, res) => {
	const { createdBy, language } = req.body;
	try {
		// check to make sure user making updates has admin rights.
		let user = await db.User.findOne({ _id: req.user._id });
		if (user.admin !== true) {
			return res.status(401).json({
				msg: 'You are not authorized to perform this action.',
			});
		}
		const item = new db.Language({
			createdBy,
			language,
		});
		await item.save();
		res.send('A new language was added!');
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   GET / get languages
// @desc    Admin can get all languages

router.get('/', async (req, res) => {
	try {
		// check to make sure user making updates has admin rights.
		let user = await db.User.findOne({ _id: req.user._id });
		if (user.admin !== true) {
			return res.status(401).json({
				msg: 'You are not authorized to perform this action.',
			});
		}
		const languages = await db.Language.find();
		res.send(languages);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   DELETE /:id -
// @desc    Admin can delete languages

router.delete('/:id', async (req, res) => {
	try {
		// check to make sure user making updates has admin rights.
		let user = await db.User.findOne({ _id: req.user._id });
		if (user.admin !== true) {
			return res.status(401).json({
				msg: 'You are not authorized to perform this action.',
			});
		}
		await db.Language.findOneAndDelete({ _id: req.params.id });
		res.send('Your language was deleted!');
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
