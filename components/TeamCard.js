import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleTeam } from '../api/teamData';
import { playerCaptain } from '../api/playerData';

function TeamCard({ teamObj, onUpdate }) {
  const [players, setPlayers] = useState([]);
  const deleteThisTeam = () => {
    if (window.confirm(`Delete ${teamObj.name}?`)) {
      deleteSingleTeam(teamObj.id).then(() => onUpdate());
    }
  };
  const captain = () => {
    playerCaptain().then((obj) => obj.filter((item) => item.teamId === teamObj.id)).then(setPlayers);
  };

  useEffect(() => {
    captain();
  });

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img className="teamImg" variant="top" src={teamObj.image} alt={teamObj.name} style={{ height: '350px' }} />
      <Card.Body>
        <Card.Title className="teamTitle">{teamObj.name}</Card.Title>
        <h4>Sponsor Company: {teamObj.sponsor}</h4>
        <h4><span style={{ color: '#fafafa' }}>⚽</span>{players[0]?.firstName} {players[0]?.lastName}
        </h4>
        <div className="wrapper">
          <Link href={`/team/${teamObj.id}`} passHref>
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
    volunteerId: PropTypes.string,
    name: PropTypes.string,
    sponsor: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TeamCard;
