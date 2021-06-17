const getDaysAgoData = (data, daysAgo) => {
	// Get current date
	let currentTime = new Date();
	// Create UTC date for daysAgo
	let daysAgoTime = new Date(Date.UTC(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate() - daysAgo));
	// Filter and sort data
	return data.filter((item) => new Date(item.postDate) >= daysAgoTime).sort((a, b) => b.postDate.localeCompare(a.postDate));
};

export default getDaysAgoData;
