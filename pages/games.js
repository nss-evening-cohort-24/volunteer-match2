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

  return (
    <div className="text-center my-4">
      <h1 className="gamePage">Scheduled Games</h1>
      <div className="d-flex flex-wrap">
        {gameDetails.map((game) => (
          <GameCard key={game.id} gameObj={game} onUpdate={getAllGames} />
        ))}
      </div>
    </div>
  );
}

export default ShowGames;
