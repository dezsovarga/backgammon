import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
	render () {
		return (
			<div className="jumbotron">
				<h1> Backgammon Administration </h1>
				<p> React, redux and react router ... </p>
				<Link to="about" className="btn btn-primary btn-lg"> Learn more </Link>
			</div>
		);
	}
}

export default HomePage;