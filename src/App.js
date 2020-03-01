import React, { Fragment } from 'react';
// router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// bootstrap
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Image from 'react-bootstrap/Image';
// pages
import Landing from './components/pages/Landing';
// components
import NavBar from './components/layout/NavBar';
// css
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
// images
// import logo from './img/logo/ww_logo./svg';
// import wireframe from './img/wireframes/wireframe_1.png';

function App() {
    return (
        <Fragment>
            <NavBar></NavBar>
            <Router>
                <Switch>
                    <Route exact path='/' component={Landing} />
                </Switch>
            </Router>
        </Fragment>
    );
}

export default App;
