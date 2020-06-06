import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row'
import './articlelisting.scss'
// import background from '../../img/background/about_background.svg';
const ArticleListing = () => {
	return (
		<Fragment>
			<article className='article-listing-wrapper'>
				<Container>
					<div className='article-meta'>
						<span className='article-topic-link'>
							<Link to='/about'>Program Info</Link>
						</span>
					</div>
				</Container>
				<div className='article-thumbnail'>{/* <a href='/about'></a> */}</div>

				<Container>
					<div className='article-wrap'>
						<header className='article-header'>
							<h2 className='article-title'>
								<Link to='/about'>Learn more about Whiteboard Warriors</Link>
							</h2>
						</header>
					</div>
				</Container>
			</article>
		</Fragment>
	)
}

export default ArticleListing
