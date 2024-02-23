import React, { useState, useEffect } from 'react';
import Web3 from 'web3'; 
import './PollCreation.css';
import config from './config'; 

const PollCreation = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [connectedAddress, setConnectedAddress] = useState('');

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        setErrorMessage('Web3 not found. Please install MetaMask or another Ethereum provider.');
        return;
      }

      // Request connection to the user's wallet
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred while connecting the wallet. Please try again.');
    }
  };

  useEffect(() => {
    const updateConnectedAddress = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        setConnectedAddress(accounts[0] || ''); // Set the connected address or an empty string if not connected
      }
    };

    updateConnectedAddress();

    // Listen for changes in the connected address
    window.ethereum.on('accountsChanged', updateConnectedAddress);

    // Cleanup the event listener on component unmount
    return () => {
      window.ethereum.off('accountsChanged', updateConnectedAddress);
    };
  }, []);

  const handleCreatePoll = async () => {
    try {
      // Perform input validation
      if (!title || !description || !duration) {
        setErrorMessage('Please fill in all fields');
        return;
      }

      const durationNumber = Number(duration);
      if (isNaN(durationNumber) || durationNumber <= 0) {
        setErrorMessage('Please enter a valid duration (in seconds)');
        return;
      }

      // Check if Web3 is available
      if (typeof window.ethereum === 'undefined') {
        setErrorMessage('Web3 not found. Please install MetaMask or another Ethereum provider.');
        return;
      }

      // Connect to your blockchain provider
      const web3 = new Web3(window.ethereum);
      await window.ethereum.enable();

      // Create a contract instance using the configuration
      const contract = new web3.eth.Contract(config.contractAbi, config.contractAddress);

      // Call the createPoll function on the contract
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const selectedAddress = accounts[0];

      // Handle transaction success
      // ...

    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="poll-creation-container">
      <div className="wallet-container">
        <button className="connect-wallet-button" onClick={connectWallet}>
          {connectedAddress ? connectedAddress.substring(0, 8) + '...' : 'Connect Wallet'}
        </button>
      </div>
      
      <h2 className="poll-creation-heading">SovereignCast</h2>
      <p className="poll-creation-tagline">Reclaiming your voice, one vote at a time</p>
      <form className="poll-form">
        <div className="form-group">
          <label htmlFor="title">Poll Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Poll Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">Poll Duration (in seconds):</label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="form-input"
          />
        </div>

        <button type="button" onClick={handleCreatePoll} className="create-poll-button">
          Create Poll
        </button>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default PollCreation;




