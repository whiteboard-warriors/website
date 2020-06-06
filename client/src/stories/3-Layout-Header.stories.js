import React from 'react'
import Header from '../components/Header'
import 'bootstrap/dist/css/bootstrap.min.css'

export default {
	title: 'Header',
	component: Header
}

export const PageHeader = () => (
	<div>
		<Header></Header>
	</div>
)
