import React, { Fragment } from 'react';
import './style.scss';

const Spinner = () => (
	<Fragment>
		<div className='spinner text-center p-5'>
			<div className='lds-ripple'>
				<div></div>
				<div></div>
			</div>
		</div>
	</Fragment>
);

export default Spinner;
