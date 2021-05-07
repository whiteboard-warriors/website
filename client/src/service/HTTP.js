/**
 * Combine HTTP Operations for cohesiveness
 */
import axios from 'axios';

export const get = async (url) => {
	const config = {
		headers: {
			Accept: 'application/json',
			Authorization: localStorage.getItem('token'),
		},
		url: url,
		method: 'get',
	};
	try {
		const response = await axios(config);
		return response;
	} catch (err) {
		throw err;
	}
};

/**
 *
 * @param {*} url
 * @param {*} body
 */
export const post = async (url, body) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('token'),
		},
	};
	try {
		const response = await axios.post(url, body, config);
		return response;
	} catch (err) {
		throw err;
	}
};

export const put = async (url, body) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('token'),
		},
	};
	try {
		const response = await axios.put(url, body, config);
		return response;
	} catch (err) {
		throw err;
	}
};

export const remove = async (url) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('token'),
		},
	};
	try {
		const response = await axios.delete(url, config);
		return response;
	} catch (err) {
		throw err;
	}
};
