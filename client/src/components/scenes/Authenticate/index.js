import React, { Fragment, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Pulls our User's newly issue JWT Token after they have
 * completed OAuth flow
 * @returns 
 */
 const Authenticate = (props) => {
	const location = useLocation();
	
  useEffect(() => {
    // if(location.)
    console.log(location);
  },[location]);
	
  return (
    <Fragment></Fragment>
  )
}

export default Authenticate;
