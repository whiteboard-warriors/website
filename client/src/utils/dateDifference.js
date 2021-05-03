import dayjs from 'dayjs';

const dateDifference = (date) => {
	// console.log('job date creation: ', dayjs(date).format('MM/DD/YYYY'));
	let newDate = Date.now();
	let today = dayjs(newDate);
	let diffDate = today.diff(date, 'days');
	if (diffDate === 0) return 'Today';
	if (diffDate > 1) return `${diffDate} days ago`;
	return `${diffDate} day ago`;
};

export default dateDifference;
