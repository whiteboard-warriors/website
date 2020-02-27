import React, { Fragment } from 'react';
// bootstrap
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

// image
import logo from '../../img/logo/ww_logo.svg';

const Header = () => {
    return (
        <Fragment>
            <Jumbotron fluid>
                <Container>
                    <Row>
                        <Col md={{ span: 4, offset: 4 }}>
                            <Image src={logo} fluid />
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
        </Fragment>
    );
};

export default Header;
