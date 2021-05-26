import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import wwLogo from '../../../img/logo/ww_logo.svg';

import './style.scss';

const PageNotFound = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col lg={{ span: 6, offset: 3 }}>
                        <div className='PNF-card'>
                            <h1> 404</h1>
                            <h2 className='text-center'>oops.. not even the ninjas could find this page</h2>
                            <img src={wwLogo} alt='whiteboard warrior ninjas' />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default PageNotFound;
