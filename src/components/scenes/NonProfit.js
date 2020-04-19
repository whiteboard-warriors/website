import React, { Fragment } from 'react'
import Header from '../Header'
import Footer from '../Footer'
// import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

const NonProfit = () => {
	return (
		<Fragment>
			<Header></Header>
			<div className='scene-content'>
				<Container>
					<Row>
						<Col></Col>
					</Row>
				</Container>
			</div>

			<Footer />
		</Fragment>
	)
}

export default NonProfit
