import React, { Fragment } from 'react';
// bootstrap
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import './header.scss';

// image
import logo from '../../img/logo/ww_logo.svg';

const Header = () => {
  return (
    <Fragment>
      <header>
        <Jumbotron fluid>
          <Container>
            <Row>
              <Col
                sm={{ span: 6, offset: 3 }}
                xs={{ span: 6, offset: 3 }}
                md={{ span: 4, offset: 4 }}
                lg={{ span: 4, offset: 4 }}
                xl={{ span: 4, offset: 4 }}
              >
                <div>
                  <Image className='masthead-logo' src={logo} />
                </div>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </header>
    </Fragment>
  );
};

export default Header;
