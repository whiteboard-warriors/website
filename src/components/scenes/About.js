import React, { Fragment } from 'react'
import Container from 'react-bootstrap/Container'

import Header from '../Header'
import Footer from '../Footer'
import './scene.scss'
import ArticleContent from '../ArticleContent'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const About = () => {
	return (
		<Fragment>
			<Header></Header>
			<Container>
				<Row>
					<Col>
						<h1>About Whiteboard Warriors</h1>
						<p>Whiteboard Warriors</p>
					</Col>
				</Row>
			</Container>
			<Footer></Footer>
		</Fragment>
	)
}

export default About
