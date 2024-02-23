import React from 'react';
import PollCreation from './PollCreation';
import PollList from './PollList'; // Import PollList component
import './PollCreation.css'; // Import PollCreation.css here


function App() {
  return (
    <div className="App">
      <header className="App-header">
       
        <PollCreation />
        <PollList /> 
      </header>
    </div>
  );
}

export default App;
