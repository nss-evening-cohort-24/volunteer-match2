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
  fetch(`${endpoint}/players.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const getSinglePlayer = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/players/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const deletePlayer = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/players/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const updatePlayers = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/players/${payload.firebaseKey}.json`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
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
