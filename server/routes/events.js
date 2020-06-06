const express = require('express');
const router = express.Router();
// const passport = require('../config/passport');

const db = require('../models');
const isAuthenticated = require('../config/middleware/isAuthenticated');

// @route   POST /api/events
// @desc    Admin creates an event
router.post('/', async (req, res) => {
	let {
		location,
		date,
		startTime,
		endTime,
		languages,
		levels,
		attendees,
		matches,
	} = req.body;

	if (!attendees) attendees = [];
	if (!matches) matches = [];

	try {
		// check to make sure user making updates has admin rights.
		let user = await db.User.findOne({ _id: req.user._id });
		if (user.admin !== true) {
			return res.status(401).json({
				msg: 'You are not authorized to edit this event.',
			});
		}

		const event = new db.Event({
			createdBy: req.user._id,
			location,
			date: new Date(date),
			startTime: new Date(startTime),
			endTime: new Date(endTime),
			languages,
			levels,
			attendees,
			matches,
		});
		await event.save();
		res.send('Your event was created!');
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   GET /api/events
// @desc    Retrieves all events
router.get('/', async (req, res) => {
	try {
		const event = await db.Event.find()
			.populate('attendees.attendee')
			.populate('matches.user1')
			.populate('matches.user2')
			.populate('matches.user3')
			.populate('matches.user4');
		res.json(event);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   GET /api/events
// @desc    Retrieves one event
router.get('/:id', async (req, res) => {
	try {
		const event = await db.Event.find({
			_id: req.params.id,
		})
			.populate('attendees.attendee')
			.populate('matches.user1')
			.populate('matches.user2')
			.populate('matches.user3')
			.populate('matches.user4');
		res.json(event);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   PUT /api/events
// @desc    Allows Admin to update event
router.put('/:id', async (req, res) => {
	const { location, date, startTime, endTime, languages, levels } = req.body;
	try {
		const event = {};
		if (location) event.location = location;
		if (date) event.date = date;
		if (startTime) event.startTime = startTime;
		if (endTime) event.endTime = endTime;
		if (languages) event.languages = languages;
		if (levels) event.levels = levels;

		// check to make sure user making updates has admin rights.
		let user = await db.User.findOne({ _id: req.user._id });
		if (user.admin !== true) {
			return res.status(401).json({
				msg: 'You are not authorized to edit this event.',
			});
		}

		await db.Event.findOneAndUpdate(
			{ _id: req.params.id },
			{ $set: event }
		);
		res.send('Your event was updated!');
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// Currently Unnecessary
// @route   PUT /api/events
// @desc    Adds attendees to event once they sign in.
// router.put('/attendees/:userId/:eventId', async (req, res) => {
// 	const { level } = req.body;
// 	try {
// 		// // check to make sure user making updates has admin rights.
// 		// let user = await db.User.findOne({ _id: req.user._id });
// 		// if (user.admin !== true) {
// 		// 	return res.status(401).json({
// 		// 		msg: 'You are not authorized to edit this event.',
// 		// 	});
// 		// }

// 		const attendee = await db.User.findOne({ _id: req.params.userId });
// 		await db.Event.findOneAndUpdate(
// 			{ _id: req.params.eventId },
// 			{
// 				$push: {
// 					attendees: { attendee, level },
// 				},
// 			}
// 		);
// 		res.send('Your event was updated!');
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send('Server Error');
// 	}
// });

// @route   PUT /api/events
// @desc    Adds attendees to event once they sign in.
// isAuthenticated
router.put('/attendees/:eventId', isAuthenticated, async (req, res) => {
	const { level, _id, docLink } = req.body;

	try {
		// fetch current list of attendees
		const event = await db.Event.findOne({ _id: req.params.eventId })
			.populate('attendees.attendee')
			.populate('matches.user1')
			.populate('matches.user2')
			.populate('matches.user3')
			.populate('matches.user4');
		// console.log('event......=', event);
		const currentAttendees = event.attendees;
		// console.log(currentAttendees.length);
		// find user in db by _id
		const newAttendee = await db.User.findOne({ _id });
		for (let i = 0; i < currentAttendees.length; i++) {
			// check if attendees match isMatch is false, if primaryLanguage matches and if levels match.
			if (
				currentAttendees[i].isMatched === false &&
				currentAttendees[i].attendee.primaryLanguage ===
					newAttendee.primaryLanguage &&
				currentAttendees[i].level === level
			) {
				console.log('new attendee just added  ====', _id);
				console.log(
					'attendee match found ====',
					currentAttendees[i].attendee._id
				);
				// store users to matches field on db.event
				const newMatch = {
					user1: newAttendee._id,
					user2: currentAttendees[i].attendee._id,
					docLink,
					level,
				};
				console.log(newMatch);
				await db.Event.findOneAndUpdate(
					{ _id: req.params.eventId },
					{
						$push: {
							matches: newMatch,
						},
					}
				);
				// add newAttendee to list of attendees
				await db.Event.findOneAndUpdate(
					{ _id: req.params.eventId },
					{
						$push: {
							attendees: { attendee: newAttendee._id, level },
						},
					}
				);
				// set matched users' isMatched to true
				await db.Event.findByIdAndUpdate(
					{ _id: req.params.eventId },
					{
						$set: {
							'attendees.$[item].isMatched': true,
						},
					},
					{
						arrayFilters: [{ 'item.attendee': newAttendee._id }], // user that was just added.
						new: true,
					}
				);
				await db.Event.findByIdAndUpdate(
					{ _id: req.params.eventId },
					{
						$set: {
							'attendees.$[item].isMatched': true,
						},
					},
					{
						arrayFilters: [
							{
								'item.attendee':
									currentAttendees[i].attendee._id, // user which was perfectly matched to user just added.
							},
						], // user that was just added.
						new: true,
					}
				);
			}
			// break out of the loop once match is found
			break;
			//if no match found, just store new user to
		}

		res.send('Attendee added!');
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @TODO 	When User signs into to event, run algo that:
// 			-	matches new user with user that attendee.isMatched === false,
// 				if they match primaryLanguage and problem level.
//			-	update matched users attendee.isMatched to true by keeping track
//				of their attendee._id
// 			-	store new matches to db
// @route   PUT /api/events
// @desc    Adds matches to event.
router.put('/matches/:eventId/', async (req, res) => {
	const { matches } = req.body;
	try {
		// stores matches array from current event into variable 'matches'
		const event = await db.Event.findOne(
			{_id: req.params.event}
		)
		// runs autopair function to see if can match by lvl & 1st language
		function autoPair(arr, counter) {
			// stores array passed through arguments to new array & renamed 
			// back to arr
			let newArr = [];
			newArr = arr;
			let arrayCounter = counter;
			let currIndex = 0;
			let level = 0;
			let primaryLang = '';
		
			// loops through 'matches', finds first index where isMatches=false
			// & stores level & 1st lang into function variables as well as 
			// current index #
			for (let i = 0; i < newArr.length; i++) {
				let attendee = newArr[i];
				if (attendee.isMatched === false) {
					currIndex = i;
					level = attendee.level;
					primaryLang = attendee.attendee.primaryLanguage;
					break;
				}
			}
			
			// loops through 
			for (let j = currIndex + 1; j < newArr.length; j++) {
				if (
					newArr[j].isMatched === false &&
					level === newArr[j].level &&
					primaryLang === newArr[j].attendee.primaryLanguage
				) {
					let match = {
						user1: newArr[currIndex].attendee._id,
						user2: newArr[j].attendee._id,
					};
					// db//
					await db.Event.findByIdAndUpdate(
						{_id: matches._id},
						{ $set: {'attendees.$[el].isMatched': true }},
						{
							arrayFilters: [{ 'el._id': newArr[j]._id}],
							new:true
						}
					);
					await db.Event.findByIdAndUpdate(
						{_id: matches._id},
						{ $set: {'attendees.$[el].isMatched': true }},
						{
							arrayFilters: [{ 'el._id': newArr[currIndex]._id}],
							new:true
						}
					);
					// update to event.matches
					await db.Event.findByIdAndUpdate(
						{_id: matches._id},
						{ $push: { matches: { match }}}
					);
				}
			}
			if (arrayCounter <= newArr.length) {
				arrayCounter = arrayCounter + 1;
				autoPair(newArr, arrayCounter);
			} else {
				return;
			}
		}
		
		autoPair(event.attendees, 1);
		res.send('Your event was updated!');
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

////////////////////////////////////
let matches = [];

function autoPair(arr, counter) {
	let newArr = [];
	newArr = arr;
	let arrayCounter = counter;
	let currIndex = 0;
	let level = 0;
	let primaryLang = '';

	for (let i = 0; i < newArr.length; i++) {
		let attendee = newArr[i];
		if (attendee.isMatched === false) {
			currIndex = i;
			level = attendee.level;
			primaryLang = attendee.attendee.primaryLanguage;
			break;
		}
	}

	for (let j = currIndex + 1; j < newArr.length; j++) {
		if (
			newArr[j].isMatched === false &&
			level === newArr[j].level &&
			primaryLang === newArr[j].attendee.primaryLanguage
		) {
			let match = {
				user1: newArr[currIndex].attendee._id,
				user2: newArr[j].attendee._id,
			};
			// db//
			// update to event.attendees
			newArr[j].isMatched = true;
			newArr[currIndex].isMatched = true;
			// update to event.matches
			matches.push(match);
			// db//
		}
	}

	if (arrayCounter <= newArr.length) {
		arrayCounter = arrayCounter + 1;
		autoPair(newArr, arrayCounter);
	} else {
		return;
	}
}

autoPair(attendees, 1);
console.log('Paired Matches:', matches);
////////////////////////////////////////////////////////

// @TODO
// @route   PUT /api/events
// @desc    Updates match pair by adding additional people to group.
router.put('/matches/update/:eventId/userId', async (req, res) => {
	// find event by id
	// loop through event.matches
	// const { _id, level, primaryLanguage, secondaryLanguage } = req.body;
	try {
		await db.Event.findOneAndUpdate(
			{ _id: req.params.eventId }
			// { TODO
			// 	$push: {
			// 		'matches.$[item].user3': req.params
			// 	},
			// }
		);
		res.send('Your event was updated!');
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   DELETE /api/events
// @desc    Delete event if user is admin.
router.delete('/:id', async (req, res) => {
	try {
		// check to make sure user making updates has admin rights.
		let user = await db.User.findOne({ _id: req.user._id });
		if (user.admin !== true) {
			return res.status(401).json({
				msg: 'You are not authorized to edit this event.',
			});
		}
		await db.Event.findOneAndDelete({
			_id: req.params.id,
		});
		res.send('Your event was deleted!');
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
