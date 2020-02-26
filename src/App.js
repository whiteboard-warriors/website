import React, { Fragment } from 'react';
// bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
// components
import NavBar from './components/layout/NavBar';
// css
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// images
// import logo from './img/logo/ww_logo./svg';
import wireframe from './img/wireframes/wireframe_1.png';

function App() {
    return (
        <Fragment>
            <NavBar></NavBar>;
            <Container>
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        <Image src={wireframe} fluid />
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

export default App;
