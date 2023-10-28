import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { deleteGame } from '../api/gameData';

function GameCard({ gameObj, onUpdate }) {
  const deleteThisGame = () => {
    if (window.confirm('Do you want to delete this game?')) {
      deleteGame(gameObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{gameObj.name}</Card.Title>
        <Card.Text>Date: {gameObj.datePlayed}</Card.Text>
        <Card.Text>Team 1: {gameObj.teamOneId}</Card.Text>
        <Card.Text>Team 2: {gameObj.teamTwoId}</Card.Text>
        {/* <Link href={`/game/${gameObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link> */}
        {/* DYNAMIC LINK TO EDIT THE order DETAILS  */}
        {/* <Link href={`/game/edit/${gameObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link> */}
        <Button variant="danger" onClick={deleteThisGame} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

GameCard.propTypes = {
  gameObj: PropTypes.shape({
    datePlayed: PropTypes.string,
    name: PropTypes.string,
    teamOneId: PropTypes.string,
    teamTwoId: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default GameCard;
