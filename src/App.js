import React, { useState } from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import './App.scss';

import Header from './components/header/Header.js';
import AppList from './components/app-list/AppList.js';
import Finance from './sub-apps/finance/Finance.js';
import Fitness from './sub-apps/fitness/Fitness.js';
import Notes from './sub-apps/notes/Notes.js';
import Reminders from './sub-apps/reminders/Reminders.js';
import Diet from './sub-apps/diet/Diet.js';
import DebtGrowth from './sub-apps/debt-growth/DebtGrowth.js';

const App = () => {
	const RouterHeader = withRouter(Header);
	const [debtGrowthWorker, updateDebtGrowthWorker] = useState(false);

	return (
		<div className="App">
			<Router>
				<RouterHeader />
				<Route exact path="/" render={(props) => (<AppList />)} />
				<Route path="/diet" render={(props) => (<Diet />)} />
				<Route path="/finance" render={(props) => (<Finance />)} />
				<Route path="/fitness" render={(props) => (<Fitness />)} />
				<Route path="/notes" render={(props) => (<Notes />)} />
				<Route path="/reminders" render={(props) => (<Reminders />)} />
				<Route path="/debt-growth" render={(props) => (
					<DebtGrowth debtGrowthWorker={ debtGrowthWorker } updateDebtGrowthWorker={ updateDebtGrowthWorker } />
				)} />
			</Router>
		</div>
	);
}

export default App;
