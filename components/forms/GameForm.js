import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { createGame, updateGame } from '../../api/gameData';
import { createTeamGames } from '../../api/teamGames';
import { useAuth } from '../../utils/context/authContext';
import { getTeams } from '../../api/teamData';

const initialState = {
  name: '',
  createdAt: '',
  teamOneId: '',
  teamTwoId: '',
};
export default function GameForm({ gameObj }) {
  const { user } = useAuth();
  const [formInput, setFormInput] = useState(initialState);
  const [teams, setTeams] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getTeams(user.uid).then(setTeams);
    if (gameObj.id) setFormInput(gameObj);
  }, [gameObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gameObj.id) {
      updateGame(formInput).then(() => router.push('/games'));
    } else {
      const payload = {
        name: formInput.name,
        createdAt: formInput.createdAt,
        teams: [formInput.teamOneId, formInput.teamTwoId],
      };
      createGame(payload).then((game) => {
        createTeamGames(game.id, formInput.teamOneId);
        createTeamGames(game.id, formInput.teamTwoId);
      }).then(() => router.push('/games'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h1 className="text-white mt-5">{gameObj.id ? 'Update Game' : 'Schedule Game'}</h1>
        <Form.Group className="mb-3">
          <Form.Label for="start">Date: </Form.Label>

          <Form.Control type="date" id="start" name="createdAt" value={formInput.createdAt} min="2023-10-31" max="2024-1-30" onChange={handleChange} />

        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Team 1 Name</Form.Label>
          <Form.Select
            type="text"
            placeholder="Enter Team Name"
            name="teamOneId"
            value={formInput.teamOneId}
            onChange={handleChange}
            required
          >
            <option value="">Select a Team</option>
            {
            teams.map((team) => (
              <option
                key={team.id}
                value={team.id}
              >
                {team.name}
              </option>
            ))
          }
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Team 2 Name</Form.Label>
          <Form.Select
            type="text"
            placeholder="Enter Team Name"
            name="teamTwoId"
            value={formInput.teamTwoId}
            onChange={handleChange}
            required
          >
            <option value="">Select a Team</option>
            {
            teams.map((team) => (
              <option
                key={team.id}
                value={team.id}
              >
                {team.name}
              </option>
            ))
          }
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Game Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Game Name"
            name="name"
            value={formInput.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">{gameObj.id ? 'Update ' : 'Add '}
          Game
        </Button>
      </Form>
    </>
  );
}

GameForm.propTypes = {
  gameObj: PropTypes.shape({
    name: PropTypes.string,
    teams: PropTypes.arrayOf(PropTypes.number),
    id: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
  }),
};

GameForm.defaultProps = {
  gameObj: initialState,
};
