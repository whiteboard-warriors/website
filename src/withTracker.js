import React, { useEffect } from 'react'
import ReactGA from 'react-ga'

ReactGA.initialize('UA-163815162-1')

// https://github.com/react-ga/react-ga/wiki/React-Router-v4-withTracker
export const withTracker = (WrappedComponent, options = {}) => {
	const trackPage = (page) => {
		ReactGA.set({
			page,
			...options,
		})
		// only track on production domain
		if (window.location.hostname === 'whiteboardwarriors.org') {
			ReactGA.pageview(page)
		}
	}

	const HOC = (props) => {
		useEffect(() => trackPage(props.location.pathname), [props.location.pathname])

		return <WrappedComponent {...props} />
	}

	return HOC
}
export default withTracker
