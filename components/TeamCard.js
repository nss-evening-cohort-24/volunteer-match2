import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleTeam } from '../api/teamData';

function TeamCard({ teamObj, onUpdate }) {
  const deleteThisTeam = () => {
    if (window.confirm(`Delete ${teamObj.name}?`)) {
      deleteSingleTeam(teamObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img className="teamImg" variant="top" src={teamObj.image} alt={teamObj.name} style={{ height: '350px' }} />
      <Card.Body>
        <Card.Title className="teamTitle">{teamObj.name}</Card.Title>
        <h4>Sponsor Company: {teamObj.volunteerid}</h4>
        <h4>{teamObj.captainid}<span style={{ color: '#fafafa' }}>⚽</span></h4>
        <div className="wrapper">
          <Link href={`/team/${teamObj.firebaseKey}`} passHref>
            <Button variant="primary" className="viewBtn m-2">VIEW</Button>
          </Link>
          <Button variant="warning" onClick={deleteThisTeam} className="deleteBtn m-2">
            DELETE
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    volunteerid: PropTypes.string,
    captainid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TeamCard;
