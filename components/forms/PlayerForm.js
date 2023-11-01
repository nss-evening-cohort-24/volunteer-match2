import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPlayer, updatePlayers } from '../../api/playerData';
import { getTeams } from '../../api/teamData';

const initialState = {
  image: '',
  firstName: '',
  lastName: '',
  position: '',
  teamId: '',
  isCaptain: false,
};

function PlayerForm({ obj }) {
  const [teams, setTeams] = useState([]);
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getTeams().then(setTeams);
    if (obj.id) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updatePlayers(formInput).then(() => router.back());
    } else {
      const payload = { ...formInput, volunteerId: user.uid };
      createPlayer(payload).then(({ name }) => {
        const patchPayload = { id: name };
        updatePlayers(patchPayload).then(() => {
          router.back();
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="text-white mt-5">{obj.id ? 'Update' : 'Add'} Player</h1>

      {/* firstname  */}
      <FloatingLabel controlId="floatingInput1" label="First Name" className="mb-3">
        <Form.Control
          type="text"
          aria-label="First Name"
          name="firstName"
          value={formInput.firstName}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* lastname  */}
      <FloatingLabel controlId="floatingInput3" label="Last Name" className="mb-3">
        <Form.Control
          type="text"
          aria-label="Last Name"
          name="lastName"
          value={formInput.lastName}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Player Image" className="mb-3">
        <Form.Control
          type="url"
          aria-label="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* role  */}
      <FloatingLabel controlId="floatingTextarea" label="Position" className="mb-3">
        <Form.Control
          as="textarea"
          aria-label="Position"
          name="position"
          value={formInput.position}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingTextarea" label="Team" className="mb-3">
        <Form.Select
          aria-label="Team"
          name="teamId"
          onChange={handleChange}
          className="mb-3"
          value={formInput.teamId}
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
      </FloatingLabel>
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="isCaptain"
        name="isCaptain"
        label="Team Captain"
        aria-label="Team Captain"
        checked={formInput.isCaptain}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            isCaptain: e.target.checked,
          }));
        }}

      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.id ? 'Update' : 'Add'} Player </Button>
    </Form>
  );
}

PlayerForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    position: PropTypes.string,
    teamId: PropTypes.string,
    id: PropTypes.string,
  }),
};

PlayerForm.defaultProps = {
  obj: initialState,
};

export default PlayerForm;
