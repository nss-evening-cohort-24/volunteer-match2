import React, { useEffect, useState } from 'react';
import { getPlayers } from '../api/playerData';
import PlayerCard from '../components/PlayerCard';

function ShowPlayers() {
  const [playerDetails, setPlayerDetails] = useState([]);

  const getAllPlayers = () => {
    getPlayers().then(setPlayerDetails);
  };

  useEffect(() => {
    getAllPlayers();
  }, []);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {playerDetails.map((player) => (
          <PlayerCard key={player.id} playerObj={player} onUpdate={getAllPlayers} />
        ))}
      </div>
    </div>
  );
}

export default ShowPlayers;
