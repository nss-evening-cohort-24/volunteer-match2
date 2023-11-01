import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import TeamCard from '../components/TeamCard';
import { getTeams } from '../api/teamData';

function Teams() {
  const [teams, setTeams] = useState([]);

  const getAllTheTeams = () => {
    getTeams().then(setTeams);
  };

  useEffect(() => {
    getAllTheTeams();
  }, []);

  return (
    <div className="text-center my-4 teamPage">
      <h1>TEAMS</h1>
      <Link href="/team/new" passHref>
        <Button size="sm" variant="outline-info" className="createBtn">New Team +</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {teams.map((team) => (
          <TeamCard key={team.id} teamObj={team} onUpdate={getAllTheTeams} />
        ))}

      </div>
    </div>
  );
}
export default Teams;
