import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import Header from '../../Header';
import Footer from '../../Footer';
import './style.scss';
// import ArticleContent from '../ArticleContent'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const About = () => {
	return (
		<Fragment>
			<Header></Header>
			<Container>
				<Row>
					<Col md={{ span: 8, offset: 2 }} className='about'>
						<h1>About Whiteboard Warriors</h1>
						<p>
							Whiteboard Warriors was founded in 2018 in Irvine, CA. by <a href='https://jordanbaucke.com'>Jordan Baucke</a> with
							the goal of helping developers{' '}
							<em>
								<strong>practice whiteboard, coding, technical, or algorithmic interviews</strong>
							</em>{' '}
							for computer software and hardware positions.
						</p>
						<p>
							Whiteboard Warriors was founded on the premise that most resources that exist for candidates to practice for
							interviews rely on websites, books, and IDEs (Integrated Development Environments) which{' '}
							<em>
								<strong>do not accurately recreate the interview experience</strong>
							</em>{' '}
							for potential candidates or match everyone's learning style.
						</p>
						<p>
							Whiteboard Warriors seeks to host regular "meet-up" events where participants are paired together and given questions
							prompts similar to how they would be expected to interview in a real-world job interview, (only with less pressure
							<span role='img' aria-label='winking emoji'>
								😉
							</span>
							). A practice known as "oral-recitation".
						</p>
						<p>
							Our practice helps developers emphasis social interaction with their interviewers and peers, reduce performance
							anxiety, and collaboratively learn.
						</p>
						<p>
							The Whiteboard Warriors meet-ups received positive feedback from the community, additional "Chapters" have/are being
							formed in the California: Silicon Valley (Bay Area), San Diego, and Los Angeles. Additionally, online events have
							been started to meet the evolving needs of the community during the COVID-19 pandemic.
						</p>
						<p>
							<strong>
								To date (Spring 2020), Whiteboard Warriors has registered over 750 members in 2 Chapters, over 20-events & 500+
								RSVPs!
								<span role='img' aria-label='confetti emoji'>
									{' '}
									🎉🎉🎉
								</span>
							</strong>
						</p>
						<p>
							Whiteboard Warriors has been incorporated as a <Link to='/501c3'>501c3 Non-Profit Corporation</Link>, and donations
							are tax deductible. Whiteboard Warriors events{' '}
							<em>
								<strong>will always be a FREE resource for the software development community</strong>
							</em>
							. Whiteboard Warriors goal is to always be inclusive, welcoming, non-judgemental and non-discriminatory. Whiteboard
							Warriors events are <em>welcome to ALL regardless</em> of language (Spoken or Coding{' '}
							<span role='img' aria-label='winking emoji'>
								😉
							</span>
							), and skill-level!
						</p>
					</Col>
				</Row>
			</Container>
			<Footer></Footer>
		</Fragment>
	);
};

export default About;
