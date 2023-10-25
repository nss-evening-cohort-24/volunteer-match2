/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
// import PropTypes from 'prop-types';
import { deleteSingleTeam, getSingleTeam } from '../../api/teamData';

function ViewTeam() {
  const [teamDetails, setTeamDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  const deleteThisTeam = () => {
    if (window.confirm(`Delete ${teamDetails.name}?`)) {
      deleteSingleTeam(teamDetails.firebaseKey).then(() => router.push('/teams'));
    }
  };

  const getTDetails = () => {
    getSingleTeam(firebaseKey).then(setTeamDetails);
  };
  // make call to API layer to get the data
  useEffect(() => {
    getTDetails();
  }, [firebaseKey]);
  console.warn(teamDetails);
  return (
    <div>
      <div className="teamView">
        <Card style={{ width: '350px', margin: '10px' }}>
          <Card.Body>
            <Card.Title className="titleBack">{teamDetails.name}</Card.Title>
            <Card.Img variant="top" src={teamDetails.image} alt={teamDetails.name} style={{ width: '350px' }} />
            <h2>{teamDetails.volunteerid}</h2>
            <h5>{teamDetails.captainid}</h5>
            <h2>{teamDetails.gamesWon}</h2>
            <h5>{teamDetails.gamesLost}</h5>
            <Link href={`/team/edit/${teamDetails.firebaseKey}`} passHref>
              <Button className="editBtn m-2" variant="info">EDIT</Button>
            </Link>
            <Button variant="warning" onClick={deleteThisTeam} className="deleteBtn m-2">
              DELETE
            </Button>
          </Card.Body>
        </Card>
      </div>
      {/* <div className="viewMembers">{teamDetails.members?.map((member) => (
        <><MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getTDetails} /><Link href={`/team/edit/${teamObj.firebaseKey}`} passHref>
          <Button className="editBtn m-2" variant="info">EDIT</Button>
        </Link></>
      ))}
      </div> */}
    </div>
  );
}
// ViewTeam.propTypes = {
//   teamDetails: PropTypes.shape({
//     image: PropTypes.string,
//     name: PropTypes.string,
//     volunteerid: PropTypes.string,
//     captainid: PropTypes.string,
//     firebaseKey: PropTypes.string,
//   }).isRequired,
//   onUpdate: PropTypes.func.isRequired,
// };

export default ViewTeam;
