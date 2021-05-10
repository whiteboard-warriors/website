import React, { Fragment } from 'react';
// router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import JobsState from './context/jobs/JobsState';
import { Container } from 'react-bootstrap';
// bootstrap
// pages
import Landing from './components/scenes/Landing/index';
import About from './components/scenes/About/index';
import Meetups from './components/scenes/Meetups/index';
import Jobs from './components/scenes/Jobs/index';
import Resources from './components/scenes/Resources/index';
import Testimonials from './components/scenes/Testimonials/index';
import NonProfit from './components/scenes/NonProfit/index';
import Donate from './components/scenes/Donate/index';
import Profile from './components/scenes/Profile/index';
import EditJob from './components/scenes/Jobs/EditJob';
import MyJobs from './components/scenes/Jobs/MyJobs';
import PostJobs from './components/scenes/Jobs/PostJobs';
import Authenticate from './components/scenes/Authenticate';
// components
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Volunteer from './components/scenes/Volunteer';
import withTracker from './tracker/withTracker';
import Alerts from './components/Alerts';
import ScrollToTop from './components/ScrollToTop';

// css
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

// images
export default function App() {
	return (
		<Fragment>
			<AlertState>
				<AuthState>
					<JobsState>
						<Router>
							<ScrollToTop>
								<NavBar></NavBar>
								<Container>
									<Alerts />
								</Container>
								<Switch>
									<Route exact path='/' component={withTracker(Landing)} />
									<Route exact path='/about' component={withTracker(About)} />
									<Route exact path='/donate' component={withTracker(Donate)} />
									<Route exact path='/meetups' component={withTracker(Meetups)} />
									<Route exact path='/jobs' component={withTracker(Jobs)} />
									<Route exact path='/jobs/user/:userID' component={withTracker(MyJobs)} />
									<Route exact path='/jobs/post' component={withTracker(PostJobs)} />
									<Route exact path='/jobs/edit/:jobID' component={withTracker(EditJob)} />
									<Route exact path='/profile' component={withTracker(Profile)} />
									<Route exact path='/resources' component={withTracker(Resources)} />
									<Route exact path='/volunteer' component={withTracker(Volunteer)} />
									<Route exact path='/testimonials' component={withTracker(Testimonials)} />
									<Route exact path='/nonprofit' component={withTracker(NonProfit)} />
									<Route exact path='/501c3' component={withTracker(NonProfit)} />
									<Route exact path='/authenticate' component={Authenticate} />
								</Switch>
								<Footer></Footer>
							</ScrollToTop>
						</Router>
					</JobsState>
				</AuthState>
			</AlertState>
		</Fragment>
	);
}
