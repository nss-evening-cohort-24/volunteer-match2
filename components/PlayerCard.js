import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deletePlayer } from '../api/playerData';
import { getTeamDetails } from '../api/mergedData';

function PlayerCard({ playerObj, onUpdate }) {
  const [team, setTeam] = useState({});

  const deleteThisPlayer = () => {
    if (window.confirm(`Delete ${playerObj.first_name}?`)) {
      deletePlayer(playerObj.firebaseKey).then(() => onUpdate());
    }
  };
  useEffect(() => {
    getTeamDetails(playerObj.team_id).then(setTeam);
  }, []);

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={playerObj.image} alt={playerObj.position} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{playerObj.first_name} {playerObj.last_name} {playerObj.captain && <span style={{ color: '#fafafa' }}>⚽</span>}</Card.Title>
        <h6>Position: {playerObj.position}</h6>
        <Card.Text>{team.name}</Card.Text>
        <Link href={`/player/${playerObj.firebaseKey}`} passHref>
          <Button variant="dark" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/player/edit/${playerObj.firebaseKey}`} passHref>
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
    team_id: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    position: PropTypes.string,
    captain: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PlayerCard;
