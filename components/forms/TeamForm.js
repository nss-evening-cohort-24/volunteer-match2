import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createTeams, updateTeam } from '../../api/teamData';
import { getPlayers } from '../../api/playerData';

const intialState = {
  image: '',
  name: '',
  volunteerid: '',
  captainid: '',
};

export default function TeamForm({ obj }) {
  const { user } = useAuth();
  const [formInput, setFormInput] = useState({ ...intialState, uid: user.uid });
  const [players, setPlayers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getPlayers(user.uid).then(setPlayers);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);
  console.warn(players);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (obj.firebaseKey) {
      updateTeam(formInput).then(() => router.push(`/team/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createTeams(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateTeam(patchPayload).then(() => router.push('/teams'));
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter an image url"
            name="image"
            value={formInput.image}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Team Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Team Name"
            name="name"
            value={formInput.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Company Sponsor</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Company Name"
            name="volunteerid"
            value={formInput.volunteerid}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Captain</Form.Label>
          <Form.Select
            type="text"
            placeholder="Enter Captain Name"
            name="captainid"
            value={formInput.captainid}
            onChange={handleChange}
          >
            <option value="">Select a Captain</option>
            {
            players.map((player) => (
              <option
                key={player.firebaseKey}
                value={player.firebaseKey}
              >
                {player.name}
              </option>
            ))
          }
          </Form.Select>
        </Form.Group>
        <Button variant="outline-secondary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

TeamForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    volunteerid: PropTypes.string,
    captainid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

TeamForm.defaultProps = {
  obj: intialState,
};
