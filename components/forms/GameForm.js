import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createGame, updateGame } from '../../api/gameData';

const intialState = {
  name: '',
  teamOneId: '',
  teamTwoId: '',
  datePlayed: '',
};

export default function GameForm({ gameObj }) {
  const { user } = useAuth();
  const [formInput, setFormInput] = useState({ ...intialState, uid: user.uid });
  const router = useRouter();

  useEffect(() => {
    if (gameObj.firebaseKey) setFormInput(gameObj);
  }, [gameObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (gameObj.firebaseKey) {
      updateGame(formInput).then(() => router.push(`/game/${gameObj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createGame(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateGame(patchPayload).then(() => router.push('/games'));
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label for="start">Date: </Form.Label>

          <Form.Control type="date" id="start" name="datePlayed" value={formInput.datePlayed} min="2023-10-31" max="2024-1-30" onChange={handleChange} />

        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Team 1 Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Team Name"
            name="teamOneId"
            value={formInput.teamOneId}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Team 2 Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Team Name"
            name="teamTwoId"
            value={formInput.teamTwoId}
            onChange={handleChange}
            required
          />
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
    teamOneId: PropTypes.string,
    teamTwoId: PropTypes.string,
    firebaseKey: PropTypes.string,
    datePlayed: PropTypes.string,
  }),
};

GameForm.defaultProps = {
  gameObj: intialState,
};
