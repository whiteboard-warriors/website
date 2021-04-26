import React, { Fragment } from 'react';
import Header from '../../Header';

// import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import './style.scss';

const NonProfit = () => {
	return (
		<Fragment>
			<Header></Header>
			<div className='scene-content'>
				<Container>
					<Row className='mt4r'>
						<Col md={{ span: 8, offset: 2 }}>
							<h1 className='text-center mb4r'>
								Whiteboard Warriors Non-Profit
							</h1>
							<p className='text-block-2'>
								Whiteboard Warriors is a Non-Profit Corporation
								under US Internal Revenue Service Code
								501(c)(3). All donations to Whiteboard Warriors
								are tax deductible.
							</p>
							<h3>Non-Profit Numbers</h3>
							<table>
								<tr>
									<td>
										<strong>
											EIN (Employer Identification
											Number):
										</strong>
									</td>
									<td>84-3279768</td>
								</tr>
								<tr>
									<td>
										<strong>
											State of California Entity (File)
											Number:
										</strong>
									</td>
									<td>C4532739</td>
								</tr>
								<tr>
									<td>
										<strong>
											California RCT Registration Number:
										</strong>
									</td>
									<td>CT0268183</td>
								</tr>
							</table>
							<hr />
							<h3>Non-Profit Documentation</h3>
							<table>
								<tr>
									<td>
										<a href='https://jordanbaucke.com/wp-content/uploads/2020/02/whiteboard-warriors-non-profit-letter.pdf'>
											IRS Determination Letter
										</a>
									</td>
									<td></td>
								</tr>
								<tr>
									<td>
										<a href='https://businesssearch.sos.ca.gov/Document/RetrievePDF?Id=04532739-27803420'>
											State of California Corporation SOI
										</a>
									</td>
								</tr>
								<tr>
									<td>
										<a href='https://businesssearch.sos.ca.gov/Document/RetrievePDF?Id=04532739-27281532'>
											Articles of Incorporation
										</a>
									</td>
								</tr>
								<tr>
									<td>
										<a href='http://rct.doj.ca.gov/Verification/Web/Download.aspx?saveas=200306Z07355086.pdf&document_id=09027b8f803c2fec'>
											CT-470 Confirmation of Registration
										</a>
									</td>
								</tr>
							</table>
						</Col>
					</Row>
				</Container>
			</div>
		</Fragment>
	);
};

export default NonProfit;
