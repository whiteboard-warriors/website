import React, { Fragment } from 'react';
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
        <Fragment>
            <Navbar bg='light' variant='light' expand='lg'>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Container>
                        <Nav className='mr-auto'>
                            <Link className='nav-link' to='/'>
                                Home
                            </Link>
                            <Link className='nav-link' to='/about'>
                                About
                            </Link>
                            <Link className='nav-link' to='/meetups'>
                                Meetups
                            </Link>
                            <Link className='nav-link' to='/jobs'>
                                Jobs
                            </Link>
                            <Link className='nav-link' to='/resources'>
                                Resources
                            </Link>
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
                </Navbar.Collapse>
            </Navbar>
        </Fragment>
    );
};

export default NavBar;
