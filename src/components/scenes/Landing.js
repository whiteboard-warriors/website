import React, { Fragment } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Container from 'react-bootstrap/Container'
import ArticleListing from '../ArticleListing'
import Row from 'react-bootstrap/Row'

const Landing = () => {
	return (
		<Fragment>
			<Header></Header>
			<div className='list'>
				<Container>
					<Row>
						<ArticleListing></ArticleListing>
					</Row>
				</Container>
			</div>
			<Footer></Footer>
		</Fragment>
	)
}

export default Landing
