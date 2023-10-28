const endpoint = 'https://localhost:7047';

const getTeams = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/teams`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const createTeams = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/teams`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const getSingleTeam = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/teams/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const updateTeam = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/teams/${payload.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteSingleTeam = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/teams/${id}`, {
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
  deleteSingleTeam,
  getSingleTeam,
  createTeams,
  updateTeam,
  getTeams,
};
