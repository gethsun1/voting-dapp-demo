import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import config from './config';

const PollList = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    // Fetch and display the polls
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const account = accounts[0];
  
      // Log ABI for debugging
      console.log('ABI:', config.contractAbi);
  
      const contract = new web3.eth.Contract(config.contractAbi, config.contractAddress);
  
      // Fetch the total number of polls
      const pollsCount = await contract.methods.pollsCount().call();

      // Fetch details for each poll
      const pollsArray = await Promise.all(
        Array(parseInt(pollsCount)).fill().map(async (element, index) => {
          const pollDetails = await contract.methods.getPollDetails(index).call();
          return {
            id: index,
            title: pollDetails[0],
            description: pollDetails[1],
            duration: pollDetails[2],
            startTime: pollDetails[3],
            isActive: pollDetails[5],
          };
        })
      );

      setPolls(pollsArray);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="poll-list-container">
      <h3 className="poll-list-heading">Created Polls</h3>
      {polls.map((poll) => (
        <div key={poll.id} className="poll-card">
          <h4>{poll.title}</h4>
          <p>{poll.description}</p>
          <p>Duration: {poll.duration} seconds</p>
          <p>Start Time: {poll.startTime}</p>
          <p>Status: {poll.isActive ? 'Active' : 'Inactive'}</p>
          <div className="yes-votes">Yes Votes: {poll.yesVotes}</div>
          <div className="no-votes">No Votes: {poll.noVotes}</div>
        </div>
      ))}
    </div>
  );
};

export default PollList;














