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
    <Card style={{ width: '18rem', margin: '15px auto' }}>
      <Card.Body>
        <Card.Title className="gameTitle">{gameObj.name}</Card.Title>
        <Card.Text>Date: {gameObj.createdAt}</Card.Text>
        <Card.Text><span className="teamLine">Team 1:</span> {gameObj.teams[0]?.name}</Card.Text>
        <Card.Text><span className="teamLine">Team 2:</span> {gameObj.teams[1]?.name}</Card.Text>

        <Button variant="outline-warning" onClick={deleteThisGame} className="m-2">
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
