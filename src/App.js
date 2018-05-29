import React, { Component } from 'react';
import Slot from 'react-slot-machine';
import './App.css';
import queryString from 'query-string';
import alex from './images/alex.png';
import rob from './images/rob.png';
import jiten from './images/jiten.png';
import raluca from './images/raluca.png';
import craig from './images/craig.png';
import shane from './images/shane.png';
import rik from './images/rik.png';
import questionMark from './images/questionMark.gif';

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

    this.state = {
      names: names.split(','),
      person: 0
    }

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState ({ 
      person: Math.floor(Math.random() * (this.state.names.length - 1)) + 1
    })
  }
  
  render() {
    const style={ height: '300px', width: '250px', lineHeight: '34px' }
    return (
      <div className="App">
      <div className="slot-machine">
        <Slot
          className="slot"
          duration={ 3000 }
          target={ this.state.person }
          times={ 4 }
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
          times={ 4 }
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
          times={ 4 }
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
      </div >
    );
  }
}

export default App;
