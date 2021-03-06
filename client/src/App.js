import React, { Fragment, useState } from 'react';
// router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import JobsState from './context/jobs/JobsState';
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
import PageNotFound from './components/scenes/PageNotFound';
import ForgotPassword from './components/scenes/ForgotPassword';
import ResetPassword from './components/scenes/ResetPassword';

// components
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Volunteer from './components/scenes/Volunteer';
import withTracker from './tracker/withTracker';
import Alerts from './components/Alerts';
import ScrollToTop from './components/ScrollToTop';
import Authenticate from './components/scenes/Authenticate';

// css
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

// images
export default function App() {
	const [navExpanded, setNavExpanded] = useState(false);
	const closeNav = () => {
		setNavExpanded(false);
	};

	return (
		<Fragment>
			<AlertState>
				<AuthState>
					<JobsState>
						<Router>
							<ScrollToTop>
								<NavBar navExpanded={navExpanded} setNavExpanded={setNavExpanded}></NavBar>
								<Alerts />
								<div onClick={closeNav}>
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
										<Route exact path='/forgot-password' component={ForgotPassword} />
										<Route exact path='/reset-password' component={ResetPassword} />
										<Route exact path='*' component={withTracker(PageNotFound)} />
									</Switch>
								</div>
								<Footer></Footer>
							</ScrollToTop>
						</Router>
					</JobsState>
				</AuthState>
			</AlertState>
		</Fragment>
	);
}
