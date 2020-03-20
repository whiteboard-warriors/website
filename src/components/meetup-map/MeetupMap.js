import React from 'react'
import californiaMap from './california-map.svg'
import location from './location-marker.svg'
import './MeetupMap.css'

class MeetupMap extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			width: 400,
			pins: [
				{
					top: '240px',
					left: '25px'
				},
				{
					top: '575px',
					left: '200px'
				}
			]
		}
	}

	/**
	 * Calculate & Update state of new dimensions
	 */
	updateDimensions() {
		// if (window.innerWidth < 500) {
		// 	this.setState({ width: 450, height: 102 })
		// } else {
		// 	let update_width = window.innerWidth - 100
		// 	let update_height = Math.round(update_width / 4.4)
		// 	this.setState({ width: update_width, height: update_height })
		// }
	}

	/**
	 * Add event listener
	 */
	componentDidMount() {
		this.updateDimensions()
		window.addEventListener('resize', this.updateDimensions.bind(this))
	}

	/**
	 * Remove event listener
	 */
	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions.bind(this))
	}

	render() {
		return (
			<div className="map-wrapper">
				<div className="map-container" style={{ width: this.state.width }}>
					<img src={californiaMap} alt="California Map" />
					{this.state.pins.map(pin => (
						<div style={{ position: 'absolute', top: pin.top, left: pin.left }}>
							<img src={location} alt="Location Tag" />
						</div>
					))}
				</div>
			</div>
		)
	}
}

export default MeetupMap
