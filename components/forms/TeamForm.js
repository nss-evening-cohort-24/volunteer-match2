import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createTeams, updateTeam } from '../../api/teamData';

const intialState = {
  image: '',
  name: '',
  volunteerid: '',
};

export default function TeamForm({ teamObj }) {
  const { user } = useAuth();
  const [formInput, setFormInput] = useState({ ...intialState, uid: user.uid });
  const router = useRouter();

  useEffect(() => {
    if (teamObj.firebaseKey) setFormInput(teamObj);
  }, [teamObj, user]);
  console.warn(teamObj.firebaseKey);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (teamObj.firebaseKey) {
      updateTeam(formInput).then(() => router.push(`/team/${teamObj.firebaseKey}`));
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
          />
        </Form.Group>
        <Button variant="outline-secondary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

TeamForm.propTypes = {
  teamObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    volunteerid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

TeamForm.defaultProps = {
  teamObj: intialState,
};
