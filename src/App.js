import React, { Component } from 'react';
// import easing from 'easing-functions';
import Slot from './Slot.jsx';
import queryString from 'query-string';

import './App.css';
import alex from './images/alex.png';
import rob from './images/rob.png';
import jiten from './images/jiten.png';
import raluca from './images/raluca.png';
import craig from './images/craig.png';
import shane from './images/shane.png';
import rik from './images/rik.png';
import questionMark from './images/questionMark.gif';
import fetchJoke from './apiService';

const namesMapper = { 
	'???': questionMark,
	'alex': alex,
	'rob': rob,
	'jiten': jiten,
	'raluca': raluca,
	'craig': craig,
	'shane': shane,
	'rik': rik
};


class App extends Component {
	constructor() {
		super();

		const { names = '' } = queryString.parse(window.location.search);
		this.nameArray = names.split(',');

		this.state = {
			names: this.nameArray.concat(this.nameArray).concat(this.nameArray).concat(this.nameArray).concat(this.nameArray).concat(this.nameArray).concat(this.nameArray).concat(this.nameArray),
			person: 0,
			times: 0,
			joke: ''
		}

		this.onClick = this.onClick.bind(this);
		this.onJokeHandler = this.onJokeHandler.bind(this);
	}

	onJokeHandler = () => {
		fetchJoke().then(joke => {
			this.setState({ joke })
		});
	}

	onClick() {
		const index =	Math.floor(Math.random() * (this.nameArray.length));
		this.setState ({ 
			person: index + 1,
			joke: ''
		});
	}
	
	render() {
		const style={ height: '300px', width: '250px', lineHeight: '34px' };

		return (
			<div className="App">
			<div className="slot-machine">
				<Slot
					className="slot"
					duration={ 3000 }
 					target={ this.state.person }
					times={ this.state.times }
					>
					{
						this.state.names.map((value, i) =>
							<div key={ i+1 } style={ style }>
								<img alt={ value } src={ namesMapper[value] }></img>
							</div>
						)
					}
				</Slot>
				<Slot
					className="slot"
					duration={ 3500 }
					target={ this.state.person }
					times={ this.state.times }
					>
					{
						this.state.names.map((value, i) =>
							<div key={ i+1 } style={ style }>
								<img alt={ value } src={ namesMapper[value] }></img>
							</div>
						)
					}
				</Slot>
				<Slot
					className="slot"
					duration={ 4500 }
					target={ this.state.person }
					times={ this.state.times }
					onEnd={ this.onJokeHandler }
					>
					{
						this.state.names.map((value, i) =>
							<div key={ i+1 } style={ style }>
								<img alt={ value } src={ namesMapper[value] }></img>
							</div>
						)
					}
				</Slot>
			</div>
			<button onClick={this.onClick}></button>
			<p className="joke">{ this.state.joke }</p>
			</div >
		);
	}
}

export default App;
