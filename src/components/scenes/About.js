import React, { Fragment } from 'react'
import Container from 'react-bootstrap/Container'

import Header from '../Header'
import Footer from '../Footer'
import './scene.scss'
import ArticleContent from '../ArticleContent'
import Row from 'react-bootstrap/Row'

const About = () => {
	return (
		<Fragment>
			<Header></Header>
			<Container>
				<Row className="single">
					<ArticleContent></ArticleContent>
				</Row>
			</Container>
			<Footer></Footer>
		</Fragment>
	)
}

export default About
