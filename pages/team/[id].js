/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { deleteSingleTeam, getSingleTeam } from '../../api/teamData';
import { getPlayers, playerCaptain } from '../../api/playerData';
import PlayerCard from '../../components/PlayerCard';

function ViewTeam() {
  const [teamDetails, setTeamDetails] = useState({});
  const [captainDetails, setCaptainDetails] = useState([]);
  const [players, setPlayers] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const deleteThisTeam = () => {
    if (window.confirm(`Delete ${teamDetails.name}?`)) {
      deleteSingleTeam(teamDetails.id).then(() => router.push('/teams'));
    }
  };

  const getTDetails = () => {
    getSingleTeam(id).then(setTeamDetails);
    playerCaptain().then((captainArray) => captainArray.filter((captainItem) => captainItem.teamId === teamDetails.id)).then(setCaptainDetails);
    getPlayers().then((array) => array.filter((item) => item.teamId === teamDetails.id)).then(setPlayers);
  };

  useEffect(() => {
    getTDetails();
  }, [id]);

  return (
    <div>
      <div className="teamView">
        <Card style={{ width: '400px', margin: '10px' }}>
          <Card.Body>
            <Card.Title className="teamTitle">{teamDetails.name}</Card.Title>
            <Card.Img variant="top" src={teamDetails.image} alt={teamDetails.name} style={{ width: '350px' }} />
            <h4>Sponsor Company: {teamDetails.sponsor}</h4>
            <h4>Team Captain: {captainDetails[0]?.firstName}</h4>
            <h4>Games Won: {teamDetails.gamesWon}</h4>
            <h4>Games Lost: {teamDetails.gamesLost}</h4>
            <Link href={`/team/edit/${teamDetails.id}`} passHref>
              <Button className="editBtn m-2" variant="info">EDIT</Button>
            </Link>
            <Button variant="warning" onClick={deleteThisTeam} className="deleteBtn m-2">
              DELETE
            </Button>
          </Card.Body>
        </Card>
        <div className="viewPlayers">{players?.map((player) => (
          <PlayerCard key={player.id} playerObj={player} onUpdate={getTDetails} />
        ))}
        </div>
      </div>
    </div>
  );
}

export default ViewTeam;
