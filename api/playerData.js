import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getPlayers = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/players`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getPlayersByTeam = (teamId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/teams/${teamId}/players`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});
const createPlayer = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/player`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    // .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const getSinglePlayer = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/players/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const deletePlayer = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/players/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    // .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const updatePlayers = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/players/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    // .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const playerCaptain = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/players/captains`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const captain = Object.values(data).filter((item) => item.isCaptain);
      resolve(captain);
    })
    .catch(reject);
});

export {
  updatePlayers,
  deletePlayer,
  getSinglePlayer,
  createPlayer,
  getPlayers,
  getPlayersByTeam,
  playerCaptain,
};
