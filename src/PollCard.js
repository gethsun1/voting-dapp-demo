import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


const PollCard = ({ poll }) => {
  const handleVote = (option) => {
    // Implement your voting logic here
    console.log(`Voted ${option} for poll with id ${poll.id}`);
  };

  return (
    <div className="poll-card">
      <Typography variant="h6" gutterBottom>
        {poll.title}
      </Typography>
      <Typography variant="body2" paragraph>
        {poll.description}
      </Typography>
      <Typography variant="body2" paragraph>  
        Duration: {poll.duration} seconds
      </Typography>
      <Typography variant="body2" paragraph>
        Start Time: {poll.startTime}
      </Typography>
      <Typography variant="body2" paragraph>
        Status: {poll.isActive ? 'Active' : 'Inactive'}
      </Typography>
      <div className="yes-no-buttons">
        <Button variant="contained" color="primary" onClick={() => handleVote('yes')}>
          Yes
        </Button>
        <Button variant="contained" color="secondary" onClick={() => handleVote('no')}>
          No
        </Button>
      </div>
      <div className="votes-info">
        <Typography variant="body2">Yes Votes: {poll.yesVotes}</Typography>
        <Typography variant="body2">No Votes: {poll.noVotes}</Typography>
      </div>
    </div>
  );
};

export default PollCard;
