import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { deleteGame } from '../api/gameData';

function GameCard({ gameObj, onUpdate }) {
  // const [team, setTeam] = useState({});
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
        <Card.Text>Team 1: {gameObj.teams[0]?.name}</Card.Text>
        <Card.Text>Team 2: {gameObj.teams[1]?.name}</Card.Text>

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
    teamId: PropTypes.string,
    teams: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default GameCard;
