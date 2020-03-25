import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
// bootstrap
// import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
// import Form from 'react-bootstrap/Form'
// import FormControl from 'react-bootstrap/FormControl'
// import Button from 'react-bootstrap/Button'
import './navbar.scss'

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
	const [openState, setOpenState] = useState(false)

	const dropDownTitle = (
		<Fragment>
			<i className="navbar-icon fab fa-meetup"></i>
			Meetups
		</Fragment>
	)
	return (
		<Navbar bg="light" expand="lg">
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Link className="nav-link" to="/">
						<i className="navbar-icon fas fa-user-ninja"></i>
						Home
					</Link>
					<NavDropdown
						title={dropDownTitle}
						id="basic-nav-dropdown"
						onMouseEnter={() => setOpenState(true)}
						onMouseLeave={() => setOpenState(false)}
						show={openState}
					>
						<i clasName="navbar-icon fab fa-meetup"></i>
						<NavDropdown.Item>
							<Link className="nav-link" to="/meetups">
								<i className="navbar-icon fas fa-umbrella-beach"></i>
								Orange County, CA
							</Link>
						</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item>
							<Link className="nav-link" to="/meetups">
								<i class="navbar-icon fas fa-microchip"></i>
								Palo Alto, CA
							</Link>
						</NavDropdown.Item>
					</NavDropdown>
					<Link className="nav-link" to="/jobs">
						<i className="navbar-icon fas fa-briefcase"></i>
						Jobs
					</Link>
					<Link className="nav-link" to="/resources">
						<i className="navbar-icon fas fa-globe"></i>
						Resources
					</Link>
					<Link className="nav-link" to="/about">
						<i className="navbar-icon fas fa-info-circle"></i>
						About Us
					</Link>
				</Nav>
			</Navbar.Collapse >
		</Navbar >
	)
}
