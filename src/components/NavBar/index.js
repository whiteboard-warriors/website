import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
// bootstrap
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import Form from 'react-bootstrap/Form'
// import FormControl from 'react-bootstrap/FormControl'
// import Button from 'react-bootstrap/Button'
import './navbar.scss';

// const NavBar = () => {
// 	return (
// 		<Fragment>
// 			<Navbar bg="light" variant="light" expand="md">
// 				<Navbar.Toggle aria-controls="basic-navbar-nav" />
// 				<Navbar.Collapse id="basic-navbar-nav">
// 					<Container>
// 						<Nav className="mr-auto">
// 							<Link className="nav-link" to="/">
// 								Home
// 							</Link>
// 							<Link className="nav-link" to="/about">
// 								About
// 							</Link>
// 							<Link className="nav-link" to="/meetups">
// 								Meetups
// 							</Link>
// 							{/* <Link className='nav-link' to='/jobs'>
//                                 Jobs
//                             </Link>
//                             <Link className='nav-link' to='/resources'>
//                                 Resources
//                             </Link> */}
// 						</Nav>
// 						{/* <Form inline>
// 							<FormControl
// 								type="text"
// 								placeholder="Search"
// 								className="mr-sm-2"
// 							/>
// 							<Button variant="outline-primary">Search</Button>
// 						</Form> */}
// 					</Container>
// 				</Navbar.Collapse>
// 			</Navbar>
// 		</Fragment>
// 	)
// }

// export default NavBar

export default function NavBar(props) {
  const aboutTitle = (
    <Fragment>
      <i className="navbar-icon fas fa-info-circle"></i>
      About
    </Fragment>
  );
  const meetupTitle = (
    <Fragment>
      <i className="navbar-icon fab fa-meetup"></i>
      Meetups
    </Fragment>
  );

  const resourcesTitle = (
    <Fragment>
      <i className="navbar-icon fas fa-globe"></i>
      Resources
    </Fragment>
  );

  return (
    <Navbar bg="light" expand="lg" className="d-flex justify-content-lg-around">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Container>
          <Nav>
            <Link className="nav-link" to="/">
              <i className="navbar-icon fas fa-user-ninja"></i>
              Home
            </Link>
            <NavDropdown title={aboutTitle} id="basic-nav-dropdown">
              <NavDropdown.Item as="div">
                <Link className="nav-link" to="/about">
                  <i className="navbar-icon fas fa-bullhorn"></i>
                  Testimonials
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as="div">
                <Link className="nav-link" to="/about">
                  <i className="navbar-icon fas fa-users"></i>
                  Non-Profit
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={meetupTitle} id="basic-nav-dropdown">
              <NavDropdown.Item as="div">
                <Link className="nav-link" to="/meetups">
                  <i className="navbar-icon fas fa-microchip"></i>
                  Palo Alto, CA
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as="div">
                <Link className="nav-link" to="/meetups">
                  <i className="navbar-icon fas fa-umbrella-beach"></i>
                  Orange County, CA
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
        <Container className="d-flex justify-content-lg-end">
          <Nav>
            <Link className="nav-link" to="/resources">
              <i className="navbar-icon fas fa-hand-paper"></i>
              Volunteer
            </Link>
            <NavDropdown title={resourcesTitle} id="basic-nav-dropdown">
              <NavDropdown.Item as="div">
                <Link className="nav-link" to="/jobs">
                  <i className="navbar-icon fas fa-briefcase"></i>
                  Jobs
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as="div">
                <Link className="nav-link" to="/jobs">
                  <i className="navbar-icon fas fa-file"></i>
                  Resume Uploader
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
            <Link className="nav-link" to="/signin">
              <i className="navbar-icon fas fa-user"></i>
              Sign Up/Log In
            </Link>
          </Nav>
        </Container>
      </Navbar.Collapse>
    </Navbar>
  );
}
