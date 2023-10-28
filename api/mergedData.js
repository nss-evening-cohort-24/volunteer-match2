import { getPlayersByTeam } from './playerData';
import { getSingleTeam } from './teamData';

const viewTeamDetails = (teamFirebaseKey) => new Promise((resolve, reject) => {
  console.warn(teamFirebaseKey);
  Promise.all([getSingleTeam(teamFirebaseKey), getPlayersByTeam(teamFirebaseKey)])
    .then(([teamObject, teamPlayersArray]) => {
      console.warn(teamObject);
      resolve({ ...teamObject, players: teamPlayersArray });
    }).catch((error) => reject(error));
});

const getTeamDetails = async (firebaseKey) => {
  const team = await getSingleTeam(firebaseKey);
  const players = await getPlayersByTeam(firebaseKey);

  return { ...team, players };
};

export { getTeamDetails, viewTeamDetails };
