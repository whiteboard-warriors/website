import React, { Fragment } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';

const Header = () => {
    return (
        <Fragment>
            <Jumbotron fluid>
                <Container>
                    <h1>Fluid jumbotron</h1>
                    <p>
                        This is a modified jumbotron that occupies the entire
                        horizontal space of its parent.
                    </p>
                </Container>
            </Jumbotron>
        </Fragment>
    );
};

export default Header;
