module.exports = {
	aws: {
		key: process.env.AWS_SES_KEY || '',
		secret: process.env.AWS_SES_SECRET || '',
		ses: {
			from: {
				// replace with actual email address
				default: 'Whiteboard Warriors <noreply@whiteboardwarriors.org>',
			},
			// e.g. us-west-2
			region: 'us-east-1',
		},
	},
}
