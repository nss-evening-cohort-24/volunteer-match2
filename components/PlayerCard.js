import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deletePlayer } from '../api/playerData';
import { getSingleTeam } from '../api/teamData';

function PlayerCard({ playerObj, onUpdate }) {
  const [team, setTeam] = useState({});

  const deleteThisPlayer = () => {
    if (window.confirm(`Delete ${playerObj.firstName}?`)) {
      deletePlayer(playerObj.id).then(() => onUpdate());
    }
  };
  useEffect(() => {
    getSingleTeam(playerObj.teamId).then(setTeam);
  }, []);

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={playerObj.image} alt={playerObj.position} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{playerObj.firstName} {playerObj.lastName} {playerObj.isCaptain && <span style={{ color: '#fafafa' }}>⚽</span>}</Card.Title>
        <h6>Position: {playerObj.position}</h6>
        <Card.Text>Team: {team.name}</Card.Text>
        <Link href={`/player/${playerObj.id}`} passHref>
          <Button variant="dark" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/player/edit/${playerObj.id}`} passHref>
          <Button variant="dark">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisPlayer} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

PlayerCard.propTypes = {
  playerObj: PropTypes.shape({
    image: PropTypes.string,
    teamId: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    position: PropTypes.string,
    isCaptain: PropTypes.bool,
    id: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PlayerCard;
