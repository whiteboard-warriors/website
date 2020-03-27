import React, { Fragment, Component } from 'react';
// router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// bootstrap
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Image from 'react-bootstrap/Image';
// pages
import Landing from './components/scenes/Landing';
import About from './components/scenes/About';
import Meetups from './components/scenes/Meetups';
import Jobs from './components/scenes/Jobs';
import Resources from './components/scenes/Resources';
import SignInAndSignUp from './components/scenes/SignInAndSignUp';

// components
import NavBar from './components/NavBar';

// css
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

// images
class App extends Component {
  render() {
    return (
      <Fragment>
        <Router>
          <NavBar></NavBar>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/about" component={About} />
            <Route exact path="/meetups" component={Meetups} />
            <Route exact path="/jobs" component={Jobs} />
            <Route exact path="/resources" component={Resources} />
            <Route exact path="/signin" component={SignInAndSignUp} />
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

export default App;
