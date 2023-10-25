import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getPlayers } from '../api/playerData';
import PlayerCard from '../components/PlayerCard';

function ShowPlayers() {
  const [playerDetails, setPlayerDetails] = useState([]);

  const { user } = useAuth();

  const getAllPlayers = () => {
    getPlayers(user.uid).then(setPlayerDetails);
  };

  useEffect(() => {
    getAllPlayers();
  }, []);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {playerDetails.map((player) => (
          <PlayerCard key={player.firebaseKey} playerObj={player} teamName={player.teamObject?.name} onUpdate={getAllPlayers} />
        ))}
      </div>
    </div>
  );
}

export default ShowPlayers;