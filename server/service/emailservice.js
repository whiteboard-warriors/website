const AWS = require('aws-sdk');
const config = require('../../awsconfig');
AWS.config.update({
	accessKeyId: config.aws.key,
	secretAccessKey: config.aws.secret,
	region: config.aws.ses.region,
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

const { jobApplicationEmail } = require('../HTMLEmail/jobApplicationEmail');
const { passwordResetEmail } = require('../HTMLEmail/passwordResetEmail');
const { welcomeToWWEmail } = require('../HTMLEmail/welcomeToWWEmail');

/**
 *
 */
const sendWelcomeConfirmation = (userEmail) => {
	sendEmail(
		userEmail,
		'Welcome to Whiteboard Warriors',
		// 'Welcome to Whiteboard Warriors!',
		welcomeToWWEmail(),
		'Whiteboard Warriors <noreply@whiteboardwarriors.org>'
	);
};
/**
 *
 */
const sendJobApplicationEmail = (applicantName, applicantEmail, linkedIn, githubUsername, employerName, employerEmail) => {
	sendEmail(
		employerEmail,
		`New Job application from ${applicantName}`,
		// `Hi ${employerName} \n\n\n\n
		// Here is a new job application from ${applicantName}.\n\n
		// Please visit this LinkedIn link to learn more about ${applicantName} --> ${linkedIn}\n\n
		// Please click REPLY if you'd like to contact ${applicantName}. \n\n\n\n
		// Kind regards, \n\n
		// Whiteboard Warriors Team`,
		jobApplicationEmail(employerName, applicantName, linkedIn, githubUsername),
		applicantEmail
	);
};

/**
 *
 * @param {*} userEmail
 */
const sendPasswordResetEmail = (userEmail, resetToken) => {
	sendEmail(
		userEmail,
		'Password Reset 🔐',
		// 'You have requested to reset your Whiteboard Warriors password, please use the following link: \n\n' +
		// 	process.env.HTTP_PROTOCOL +
		// 	process.env.HOST_NAME +
		// 	'/reset-password?token=' +
		// 	resetToken +
		// 	'\n\n🔴 If you did not request this change please ignore this email! 🔴',
		passwordResetEmail(process.env.HTTP_PROTOCOL, process.env.HOST_NAME, resetToken),
		'Whiteboard Warriors <noreply@whiteboardwarriors.org>'
	);
};

/**
 *
 * @param {*} to
 * @param {*} subject
 * @param {*} message
 * @param {*} from
 */
const sendEmail = (to, subject, message, from) => {
	const params = {
		Destination: {
			ToAddresses: [to],
		},
		ReplyToAddresses: [from],
		Message: {
			Body: {
				Html: {
					Charset: 'UTF-8',
					Data: message,
				},
				//replace Html attribute with the following if you want to send plain text emails.
				// Text: {
				// 	Charset: 'UTF-8',
				// 	Data: message,
				// },
			},
			Subject: {
				Charset: 'UTF-8',
				Data: subject,
			},
		},
		ReturnPath: config.aws.ses.from.default,
		Source: config.aws.ses.from.default,
	};

	ses.sendEmail(params, (err, data) => {
		if (err) {
			return console.log(err, err.stack);
		} else {
			console.log('Email sent.', data);
		}
	});
};

module.exports = { sendWelcomeConfirmation, sendPasswordResetEmail, sendJobApplicationEmail };
