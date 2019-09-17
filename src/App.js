import React, { Component } from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import './App.scss';
import Header from './components/header/Header.js';
import AppList from './components/app-list/AppList.js';
import Finance from './sub-apps/finance/Finance.js';
import Fitness from './sub-apps/fitness/Fitness.js';
import Notes from './sub-apps/notes/Notes.js';
import Reminders from './sub-apps/reminders/Reminders.js';
import Store from './Store.js';
class App extends Component {
  state = {
    activeApp: "",
    store: Store,
  }

  render() {
    const RouterHeader = withRouter(Header);
    return (
      <div className="App">
        <Router>
          <RouterHeader />
          <Route exact path="/" render={(props) => (<AppList />)} />
          <Route path="/finance" render={(props) => (<Finance />)} />
          <Route path="/fitness" render={(props) => (<Fitness />)} />
          <Route path="/notes" render={(props) => (<Notes />)} />
          <Route path="/reminders" render={(props) => (<Reminders />)} />
        </Router>
      </div>
    );
  }
}

export default App;
