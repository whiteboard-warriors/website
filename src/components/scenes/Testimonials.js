import React, { Fragment } from 'react'
import Header from '../Header'
import Footer from '../Footer'
// import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Media from 'react-bootstrap/Media'

import TaiMaiProfile from '../../img/testimonials/tye-mai/tye-mai.jpeg'
import testimonoials from './testimonials.scss'
import linkedInLogo from '../../img/icon/linkedin-icon.svg'

const Testimonials = () => {
	return (
		<Fragment>
			<Header></Header>
			<div className='scene-content'>
				<Container>
					<Row>
						<Col>
							<div>
								<Media>
									<img width={128} height={128} src={TaiMaiProfile} alt='Tye Mai' className='mr-3' />
									<Media.Body>
										<div>
											<h5>
												Tye Mai&nbsp;
												<small>
													Software Developer{' '}
													<a href='https://www.linkedin.com/in/tyemai/'>
														<img class='linked-in-logo' src={linkedInLogo}></img>
													</a>
												</small>
											</h5>
										</div>
										<div>
											<p>
												Tye was just starting her journey into a career in technology when she joined Whiteboard
												Warriors. Prior to working in technology she had worked as a Financial Analyst, and an English
												teacher in Spain. Her family immigrated to the United States, and neither of her parents attended
												a 4-year university.
											</p>
											<p>
												Tye decided to pursue a career in software development because of the new challenge and her love
												of technology. When reflecting on her previous professional experience & current job in
												technology she states:
											</p>
											<p>
												<blockquote>
													Every job challenges you in a different way: different rules, goals & targets to meet,
													however, working with software is like solving a different puzzle everyday... I've never felt
													so empowered in my professional work.
												</blockquote>
											</p>
											<p>When starting her journey into coding Tye says:</p>
											<p>
												<blockquote>
													At first I started really small, I started learning about HTML and CSS and building really
													simple web pages, and then I would get more curious, and say: Ok, what else can I do? What
													else can I learn? And there is a kind of a natural progression from that to some JavaScript,
													and you just keep going
												</blockquote>
											</p>
											<p>
												When she got past a certain level, not knowing what to study next, she started reviewing the
												curriculums posted by various boot camps, and started studying those items.
											</p>
											<p>
												When asked about her experience learning about the professional world of software development vs
												the self-directed and self-taught world she says:
											</p>
											<p>
												<blockquote>
													The closest comparison I can think of is learning Spanish from a book, and watching it on TV,
													you kind of get it, and you kind of taste of it, but then actually working and actually being
													a professional developer is like taking it, and being dropped off in the middle of Spain or
													Mexico, it’s similar, but many levels more complicated.
												</blockquote>
											</p>
											<p>
												Tye found Whiteboard Warriors by looking up meet-up groups that would give her a sense of what
												the industry would be like, what the people would be like and she says:
											</p>
											<p>
												<blockquote>
													I thought, wow this is just what I need, it will be different from all these other Networking
													Meet-Ups, like an actual, hands-on, practical meet-up, so it was very helpful.
												</blockquote>
											</p>
											<p>Continuing with her actual interview experience:</p>
											<p>
												<blockquote>
													I went to 5 on-site interviews while I was looking for a job, and just what I practiced there
													and just being on a whiteboard, just talking to people, talking it out, letting people in on
													my thought process is super helpful, and my interviewers appreciated it in a lot of ways too.
													I remember that there were some questions that I didn’t finish, but because I talked out a
													few of the answers, they had a good sense of my thinking process, so they could say, ‘Yes,
													she’s there, our time’s up but if we had given her 5 more minutes, the thought process that
													she’s on right now: she’s got it!
												</blockquote>
											</p>
											<p>
												Tye describes her time from when she first started looking for a job in technology to when she
												got her first job as about a year long.
											</p>
											<p>
												When working with recruiters, Tye did all her interviews with a single recruiting agency. She
												describes her experience with the recruiting agency as generally good:
											</p>
											<p>
												<blockquote>
													The service was really cool, they had a talent manager hold my hand through everything, and
													he’d help me through everything. We practiced everything from those initial calls, how to
													take a call with a company, how to present myself, and how to negotiate an offer.
												</blockquote>
											</p>
											<p>
												When asked if she would recommend Whiteboard Warriors methodology vs. other forms of interview
												coaching, practice:
											</p>
											<p>
												<blockquote>
													Absolutely, it’s so important to be able to conjugate your ideas out-loud and feel confident
													speaking in-person to another individual, and get a bit more of that extra <em>polish.</em>
												</blockquote>
											</p>
											<p>
												Tye is has recently joined <a href='https://fernish.co/'>Fernish</a>, a{' '}
												<a href='https://www.meetup.com/whiteboard-warriors-los-angeles/'>Los Angeles, CA.</a> based
												startup as a software developer on a team of 8 people. She works with{' '}
												<a href='https://rubyonrails.org/'>Ruby on Rails</a>,{' '}
												<a href='https://www.postgresql.org/'>Postgres</a>, <a href='https://elm-lang.org/'>Elm</a>, and{' '}
												<a href='https://reactnative.dev/'>React Native</a>.
											</p>
										</div>
									</Media.Body>
								</Media>
								<hr />
							</div>
						</Col>
					</Row>
				</Container>
			</div>

			<Footer />
		</Fragment>
	)
}

export default Testimonials
