import React, { Fragment, Component } from 'react'
// router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// bootstrap
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Image from 'react-bootstrap/Image';
// pages
import Landing from './components/scenes/Landing'
import About from './components/scenes/About'
import Meetups from './components/scenes/Meetups'
import Jobs from './components/scenes/Jobs'
import Resources from './components/scenes/Resources'
// components
import NavBar from './components/NavBar'
import Volunteer from './components/scenes/Volunteer'
import withTracker from './withTracker'

// css
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'

// images
class App extends Component {
	render() {
		return (
			<Fragment>
				<Router>
					<NavBar></NavBar>
					<Switch>
						<Route exact path='/' component={withTracker(Landing)} />
						<Route exact path='/about' component={withTracker(About)} />
						<Route exact path='/meetups' component={withTracker(Meetups)} />
						<Route exact path='/jobs' component={withTracker(Jobs)} />
						<Route exact path='/resources' component={withTracker(Resources)} />
						<Route exact path='/volunteer' component={withTracker(Volunteer)} />
					</Switch>
				</Router>
			</Fragment>
		)
	}
}

export default App
