import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import queryString from 'query-string';
import AuthContext from '../../../context/auth/authContext';

/**
 * Pulls our User's newly issue JWT Token after they have
 * completed OAuth flow
 * @returns
 */
const Authenticate = (props) => {
	const location = useLocation();
	const authContext = useContext(AuthContext);
	const { isAuthenticated, setToken } = authContext;
	const [finishAuthenticate, setFinishAuthenticate] = useState(false); // your state value to manipulate

	/**
	 *
	 */
	useEffect(() => {
		if (!isAuthenticated) {
			setToken('Bearer ' + queryString.parse(location.search).token);
		}
		// redirect user
		if (isAuthenticated) {
			setFinishAuthenticate(true);
		}
	}, [isAuthenticated, location, setToken]);

	if (finishAuthenticate) {
		return <Redirect to='/'></Redirect>;
	} else {
		return <Fragment></Fragment>;
	}
};

export default Authenticate;
