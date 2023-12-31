import React, { useEffect, useState } from 'react';
import { getGames } from '../api/gameData';
import GameCard from '../components/GameCard';

function ShowGames() {
  const [gameDetails, setGameDetails] = useState([]);

  const getAllGames = () => {
    getGames().then(setGameDetails);
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
