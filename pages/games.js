import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getGames } from '../api/gameData';
import GameCard from '../components/GameCard';

function ShowGames() {
  const [gameDetails, setGameDetails] = useState([]);

  const { user } = useAuth();

  const getAllGames = () => {
    getGames(user.uid).then(setGameDetails);
  };

  useEffect(() => {
    getAllGames();
  }, []);
  console.warn(gameDetails);
  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {gameDetails.map((game) => (
          <GameCard key={game.firebaseKey} gameObj={game} onUpdate={getAllGames} />
        ))}
      </div>
    </div>
  );
}

export default ShowGames;
