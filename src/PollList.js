import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import config from './config';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import PollCard from './PollCard'; // Import the PollCard component

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
  
      const contract = new web3.eth.Contract(config.contractAbi, '0x93087083b4b109B8CB4760FfB075978372B8C2E5');
  
      // Fetch the total number of polls
      const pollsCount = await contract.methods.getPollsCount().call();
  
      // Fetch details for each poll
      const pollsArray = [];
      for (let index = 0; index < pollsCount; index++) {
        const pollDetails = await contract.methods.getPollDetails(index).call();
  
        // Fetch vote counts for each poll
        const yesVotes = await contract.methods.getYesVotes(index).call();
        const noVotes = await contract.methods.getNoVotes(index).call();
  
        pollsArray.push({
          id: index,
          title: pollDetails[0],
          description: pollDetails[1],
          duration: pollDetails[2],
          startTime: pollDetails[3],
          isActive: pollDetails[5],
          yesVotes: parseInt(yesVotes),
          noVotes: parseInt(noVotes),
        });
      }
  
      setPolls(pollsArray);
    } catch (error) {
      console.error('Error fetching polls:', error.message);
    }
  };
  
  
    

  return (
    <div className="poll-list-container">
      <h3 className="poll-list-heading">Created Polls</h3>
      <Grid container spacing={2}>
        {polls.map((poll) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={poll.id}>
            <Paper elevation={3} style={{ padding: '16px' }}>
              <PollCard poll={poll} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PollList;
