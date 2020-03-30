import React, { Fragment } from 'react';
// bootstrap
// import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './footer.scss';

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <Fragment>
            <footer className='footer'>
                <Container className='footer-top'>
                    <Row>
                        <Col xs={12} md={6} className='footer-social'>
                            <h5 className='text-uppercase'>Follow us:</h5>
                            <ul>
                                <li>FB</li>
                                <li>TW</li>
                                <li>INST</li>
                            </ul>
                        </Col>
                        <Col xs={6} md={3}>
                            <h5 className='text-uppercase'>Links</h5>

                            <ul className='list-unstyled'>
                                <li>
                                    <a href='#!'>Link 1</a>
                                </li>
                                <li>
                                    <a href='#!'>Link 2</a>
                                </li>
                                <li>
                                    <a href='#!'>Link 3</a>
                                </li>
                                <li>
                                    <a href='#!'>Link 4</a>
                                </li>
                            </ul>
                        </Col>
                        <Col xs={6} md={3}>
                            <h5 className='text-uppercase'>Links</h5>

                            <ul className='list-unstyled'>
                                <li>
                                    <a href='#!'>Link 1</a>
                                </li>
                                <li>
                                    <a href='#!'>Link 2</a>
                                </li>
                                <li>
                                    <a href='#!'>Link 3</a>
                                </li>
                                <li>
                                    <a href='#!'>Link 4</a>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
                <section className='footer-bottom text-center'>&copy; {year} Whiteboard Warriors.</section>
            </footer>
        </Fragment>
    );
};

export default Footer;
