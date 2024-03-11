// App.js
import React, { useState } from 'react';
import Web3 from 'web3'; // Import Web3

import './App.css';
import Header from './components/Header';
import CandidateCard from './components/CandidateCard';
import ConnectWalletButton from './components/ConnectWalletButton';

function App() {
  const [connectedWallet, setConnectedWallet] = useState(null);

  const handleConnectWallet = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        setConnectedWallet(accounts[0]);
      } else {
        console.error('Web3 not found. Please install MetaMask or another Web3 provider.');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  return (
    <div className="app-container">
      <Header />
      <div className="app-content">
        <ConnectWalletButton
          connectedWallet={connectedWallet}
          onConnectWallet={handleConnectWallet}
        />
        <div className="candidates-section">
          <hr className="section-divider" />
          <h2>Elections for President</h2>
          <p>Vote for your Candidate of Choice</p>
          <div className="candidate-cards">
            
            <CandidateCard name="man1" partyName="party_a" />
            <CandidateCard name="man2" partyName="party_b" />
            <CandidateCard name="man3" partyName="party_c" />
            <CandidateCard name="man4" partyName="party_d" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
