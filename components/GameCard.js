import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteGame } from '../api/gameData';

function GameCard({ gameObj, onUpdate }) {
  const deleteThisGame = () => {
    if (window.confirm('Do you want to delete this game?')) {
      deleteGame(gameObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{gameObj.name}</Card.Title>
        <Card.Text>Date: {gameObj.createdAt}</Card.Text>
        {/* <Card.Text>Team 1: {gameObj.teamOneId}</Card.Text>
        <Card.Text>Team 2: {gameObj.teamTwoId}</Card.Text> */}

        <Link href={`/game/edit/${gameObj.id}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisGame} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>

  );
}

GameCard.propTypes = {
  gameObj: PropTypes.shape({
    createdAt: PropTypes.instanceOf(Date),
    name: PropTypes.string,
    teams: PropTypes.arrayOf(PropTypes.number),
    id: PropTypes.string,
    winningTeamId: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default GameCard;
