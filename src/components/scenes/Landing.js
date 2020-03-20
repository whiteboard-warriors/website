import React, { Fragment } from 'react'
import Header from '../Header'
import Footer from '../layout/Footer'
// bootstrap
// import Container from 'react-bootstrap/Container';
// import Col from 'react-bootstrap/Col';

const Landing = () => {
	return (
		<Fragment>
			<Header></Header>
			<div className="p-5 m-5 text-center">
				<h1 className="p-4 m-4 text-center">Content </h1>
			</div>

			<Footer></Footer>
		</Fragment>
	)
}

export default Landing
