import React from 'react';
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
                    <Nav.Link href='/about'>About</Nav.Link>
                    <Nav.Link href='/meetups'>Meetups</Nav.Link>
                    <Nav.Link href='/jobs'>Jobs</Nav.Link>
                    <Nav.Link href='/resources'>Resources</Nav.Link>
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
