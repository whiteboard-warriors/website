import React, { Fragment } from 'react';
import Container from 'react-bootstrap/Container';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row'
import './articlelisting.scss';
// import background from '../../img/background/about_background.svg';
const ArticleListing = () => {
	return (
		<Fragment>
			<article className='article-listing-wrapper'>
				<Container>
					<div className='article-meta'>
						<span className='article-topic-link'>
							<a href='/about'>Program Info</a>
						</span>
					</div>
				</Container>
				<div className='article-thumbnail'>{/* <a href='/about'></a> */}</div>

				<Container>
					<div className='article-wrap'>
						<header className='article-header'>
							<h2 className='article-title'>
								<a href='about'>Learn more about Whiteboard Warriors</a>
							</h2>
						</header>
					</div>
				</Container>
			</article>
		</Fragment>
	);
};

export default ArticleListing;
