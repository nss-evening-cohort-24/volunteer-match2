import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import TeamCard from '../components/TeamCard';
import { getTeams } from '../api/teamData';

function Teams() {
  const [teams, setTeams] = useState([]);
  const { user } = useAuth();

  const getAllTheTeams = () => {
    getTeams(user.uid).then(setTeams);
  };

  useEffect(() => {
    getAllTheTeams();
  }, []);

  return (
    <div className="text-center my-4">
      <h1>TEAMS</h1>
      <Link href="/team/new" passHref>
        <Button className="createBtn">Add A Team</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {teams.map((team) => (
          <TeamCard key={team.firebaseKey} teamObj={team} onUpdate={getAllTheTeams} />
        ))}

      </div>
    </div>
  );
}
export default Teams;
