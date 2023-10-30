import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getTeamGames = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/teamGame`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createTeamGames = (gameId, teamId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/games/${gameId}/teams/${teamId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateTeamGames = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/teamGame/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteTeamGames = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/teamGame/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  deleteTeamGames,
  createTeamGames,
  updateTeamGames,
  getTeamGames,
};
