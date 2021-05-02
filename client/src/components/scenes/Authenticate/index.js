import React, { Fragment, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import AuthContext from '../../../context/auth/authContext'

import AlertContext from '../../../context/alert/alertContext'
/**
 * Pulls our User's newly issue JWT Token after they have
 * completed OAuth flow
 * @returns
 */
const Authenticate = (props) => {
	const location = useLocation()
  const authContext = useContext(AuthContext);
	const { clearErrors, isAuthenticated, setToken } = authContext
	const alertContext = useContext(AlertContext)
	const { setAlert } = alertContext
	/**
	 *
	 */
	useEffect(() => {
		// console.log()

		setToken('Bearer ' +queryString.parse(location.search).token)


	}, [location])

	return <Fragment></Fragment>
}

export default Authenticate
