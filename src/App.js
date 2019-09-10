import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import Header from './components/header/Header.js';

class App extends Component {
  state = {
    activeApp: ""
  }
  
  render() {
    return (
      <div className="App">
        <Header props={this.activeApp} />
      </div>
    );
  }
}

export default App;
