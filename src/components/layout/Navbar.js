import React from 'react';
import { Link } from 'react-router-dom';
// bootstrap
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const NavBar = () => {
    return (
        <Navbar bg='light' variant='light'>
            <Container>
                {/* <Navbar.Brand href='#home'>{'{WW}'}</Navbar.Brand> */}
                <Nav className='mr-auto'>
                    <Nav.Link>
                        <Link to='/about'>About</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to='/meetups'>Meetups</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to='/jobs'>Jobs</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to='/Resources'>Resources</Link>
                    </Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl
                        type='text'
                        placeholder='Search'
                        className='mr-sm-2'
                    />
                    <Button variant='outline-primary'>Search</Button>
                </Form>
            </Container>
        </Navbar>
    );
};

export default NavBar;
