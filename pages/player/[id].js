/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import {
  getPlayers, playerCaptain, getSinglePlayer, deletePlayer,
} from '../../api/playerData';
import PlayerCard from '../../components/PlayerCard';
import { getSingleTeam } from '../../api/teamData';

function ViewPlayer() {
  const [playerDetails, setplayerDetails] = useState({});
  const [players, setPlayers] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const [team, setTeam] = useState({});

  const deleteThisPlayer = () => {
    if (window.confirm(`Delete ${playerDetails.name}?`)) {
      deletePlayer(playerDetails.id).then(() => router.push('/teams'));
    }
  };

  const getPlayerDetails = () => {
    getSinglePlayer(id).then(setplayerDetails);
    playerCaptain().then((captainArray) => captainArray.filter((captainItem) => captainItem.teamId === playerDetails.id)).then();
    getPlayers().then((array) => array.filter((item) => item.teamId === playerDetails.id)).then(setPlayers);
  };

  useEffect(() => {
    getPlayerDetails();
  }, [id]);

  useEffect(() => {
    getSingleTeam(playerDetails.teamId).then(setTeam);
  }, []);

  return (
    <div>
      <div className="teamView">
        <Card style={{ width: '400px', margin: '10px' }}>
          <Card.Body>
            <Card.Title className="teamTitle">{playerDetails.name}{playerDetails.isCaptain && <span style={{ color: '#fafafa' }}>⚽</span>}</Card.Title>
            <Card.Img variant="top" src={playerDetails.image} alt={playerDetails.name} style={{ width: '350px' }} />
            <h5>{playerDetails.first_name} {playerDetails.last_name}</h5>
            <h6>Position: {playerDetails.position}</h6>
            <Card.Text>{team.name}</Card.Text>
            <Link href={`/player/edit/${playerDetails.id}`} passHref>
              <Button className="editBtn m-2" variant="dark">EDIT</Button>
            </Link>
            <Button variant="danger" onClick={deleteThisPlayer} className="deleteBtn m-2">
              DELETE
            </Button>
          </Card.Body>
        </Card>
        <div className="viewPlayers">{players?.map((player) => (
          <PlayerCard key={player.id} playerObj={player} onUpdate={getPlayerDetails} />
        ))}
        </div>
      </div>
    </div>
  );
}

export default ViewPlayer;
