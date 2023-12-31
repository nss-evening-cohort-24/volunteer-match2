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

  const getTDetails = async () => {
    try {
      const teamData = await getSingleTeam(id);
      const captainArray = await playerCaptain();
      const filteredCaptainDetails = captainArray.filter((captainItem) => captainItem.teamId === teamData.id);
      const playerArray = await getPlayers();
      const filteredPlayers = playerArray.filter((item) => item.teamId === teamData.id);

      setTeamDetails(teamData);
      setCaptainDetails(filteredCaptainDetails);
      setPlayers(filteredPlayers);
    } catch (error) {
      // Handle errors here
      console.error(error);
    }
  };
  useEffect(() => {
    getTDetails();
  }, [id]);

  return (
    <div>
      <div className="teamView">
        <div className="teamCard">
          <Card style={{ width: '600px', margin: '10px' }}>
            <Card.Body>
              <div className="viewTeamWrap">
                <div>
                  <Card.Img variant="top" src={teamDetails.image} alt={teamDetails.name} style={{ width: '300px', margin: '10px' }} />
                </div>
                <div>
                  <Card.Title className="teamTitle">{teamDetails.name}</Card.Title>
                  <h4>Sponsor Company: {teamDetails.sponsor}</h4>
                  <h4>Team Captain: {captainDetails[0]?.firstName} {captainDetails[0]?.lastName}<span style={{ color: '#fafafa' }}>⚽</span></h4>
                  <h4>Games Won: {teamDetails.gamesWon}</h4>
                  <h4>Games Lost: {teamDetails.gamesLost}</h4>
                  <Link href={`/team/edit/${teamDetails.id}`} passHref>
                    <Button className="editBtn m-2" variant="outline-info">EDIT</Button>
                  </Link>
                  <Button variant="outline-warning" onClick={deleteThisTeam} className="deleteBtn m-2">
                    DELETE
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="viewPlayers">{players?.map((player) => (
          <PlayerCard key={player.id} playerObj={player} onUpdate={getTDetails} />
        ))}
        </div>
      </div>
    </div>
  );
}

export default ViewTeam;
