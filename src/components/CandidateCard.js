// CandidateCard.js
import React from 'react';
import man1 from '../images/man1.jpeg';
import man2 from '../images/man2.jpeg';
import man3 from '../images/man3.jpeg';
import man4 from '../images/man4.jpeg';
import party_a from '../images/party_a.jpeg';
import party_b from '../images/party_b.jpeg';
import party_c from '../images/party_c.jpeg';
import party_d from '../images/party_d.jpeg';

const CandidateCard = ({ name, partyName, handleVote }) => {
  const candidateImages = { man1, man2, man3, man4 };
  const partyImages = { party_a, party_b, party_c, party_d };

  const candidateImage = candidateImages[name];
  const partySymbolImage = partyImages[partyName.toLowerCase()];

  let candidateText = '';
  let partyText = '';

  // Set the display text based on the candidate name
  switch (name.toLowerCase()) {
    case 'man1':
      candidateText = 'Candidate A';
      break;
    case 'man2':
      candidateText = 'Candidate B';
      break;
    case 'man3':
      candidateText = 'Candidate C';
      break;
    case 'man4':
      candidateText = 'Candidate D';
      break;
    default:
      candidateText = name; // Use the original candidate name if not matched
  }

  // Set the display text based on the party name
  switch (partyName.toLowerCase()) {
    case 'party_a':
      partyText = 'PARTY A';
      break;
    case 'party_b':
      partyText = 'PARTY B';
      break;
    case 'party_c':
      partyText = 'PARTY C';
      break;
    case 'party_d':
      partyText = 'PARTY D';
      break;
    default:
      partyText = partyName; // Use the original party name if not matched
  }

  return (
    <div className="candidate-card">
      <img src={candidateImage} alt={candidateText} className="candidate-image" />
      <div className="candidate-details">
        <h3>{candidateText}</h3>
        <p>Party Name: {partyText}</p>
        <img src={partySymbolImage} alt={`Party Symbol for ${partyName}`} className="party-symbol"   />
      </div>
      <button onClick={handleVote}>Vote</button>
    </div>
  );
}

export default CandidateCard;
