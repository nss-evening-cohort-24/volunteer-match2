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
  winningTeam: '',
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
    let payload = {};
    if (gameObj.id) {
      updateGame(formInput).then(() => router.push(`/game/${gameObj.id}`));
    } else {
      if (formInput.winningTeam === 'teamOne') {
        const num = parseInt(formInput.teamOneId, 32);
        payload = {
          name: formInput.name,
          createdAt: formInput.createdAt,
          winningTeamId: num,
        };
      } if (formInput.winningTeam === 'teamTwo') {
        const numTwo = parseInt(formInput.teamTwoId, 32);
        payload = {
          name: formInput.name,
          createdAt: formInput.createdAt,
          winningTeamId: numTwo,
        };
      }

      createGame(payload).then((game) => {
        console.warn(game);
        createTeamGames(game.id, formInput.teamOneId);
        createTeamGames(game.id, formInput.teamTwoId).then(() => router.push('/games'));
      });
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
        <Form.Select
          type="text"
          placeholder="Enter Team Name"
          name="winningTeam"
          value={formInput.winningTeam}
          onChange={handleChange}
          required
        >
          <option value="">Winning Team</option>
          <option>teamOne</option>
          <option>teamTwo</option>

        </Form.Select>
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
        <Button variant="primary" type="submit">
          Schedule Game
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
    // createdAt: PropTypes.instanceOf(Date),
    // winningTeamId: PropTypes.string,
  }),
};

GameForm.defaultProps = {
  gameObj: initialState,
};