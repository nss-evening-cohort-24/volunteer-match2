import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
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
      <h1 className="header">PLAYERS</h1>
      <Link href="/player/new" passHref>
        <Button size="sm" variant="outline-info" className="createBtn">New Player +</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {playerDetails.map((player) => (
          <PlayerCard key={player.id} playerObj={player} teamName={player.teamObject?.name} onUpdate={getAllPlayers} />
        ))}
      </div>
    </div>
  );
}

export default ShowPlayers;
