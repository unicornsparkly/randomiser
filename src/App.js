import React, { Component } from 'react';
import Slot from 'react-slot-machine';
import './App.css';
import queryString from 'query-string';

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
    const style={ width: '100%', height: '100%', background: 'red', border: '1px solid black', lineHeight: '34px' }
    return (
      <div className="App">
        <Slot
          className="slot"
          duration={ 3000 }
          target={ this.state.person }
          times={ 5 }
          >
          {
            this.state.names.map((value, i) =>
              <div key={ i+1 } style={ style }>
                {value}
              </div>
            )
          }
        </Slot>
        <Slot
          className="slot"
          duration={ 3500 }
          target={ this.state.person }
          times={ 5 }
          >
          {
            this.state.names.map((value, i) =>
              <div key={ i+1 } style={ style }>
                {value}
              </div>
            )
          }
        </Slot>
        <Slot
          className="slot"
          duration={ 4500 }
          target={ this.state.person }
          times={ 5 }
          >
          {
            this.state.names.map((value, i) =>
              <div key={ i+1 } style={ style }>
                {value}
              </div>
            )
          }
        </Slot>
      <button onClick={this.onClick}> GO! </button>
      </div >
    );
  }
}

export default App;
