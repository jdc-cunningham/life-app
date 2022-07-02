import React, { useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import CalorieCounter from './components/calorie-counter/CalorieCounter';

function App() {
  const [activeTab, setActiveTab] = useState('calorie-counter');

  return (
    <div className="App">
      <Header activeTab={activeTab}/>
      {activeTab === 'calorie-counter' && <CalorieCounter />}
    </div>
  );
}

export default App;
