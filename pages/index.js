import { Button } from 'react-bootstrap';
import Link from 'next/link';
import React from 'react';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div className="text-center my-4">
      <h1 className="welcomeTitle">Welcome {user.displayName}</h1>
      <div className="buttonWrapper">
        <Link passHref href="/teams">
          <Button variant="primary" className="viewBtn indexBtn m-2">View Teams</Button>
        </Link>
        <Link passHref href="/players">
          <Button variant="primary" className="viewBtn indexBtn m-2">View Players</Button>
        </Link>
        <Link passHref href="/game/new">
          <Button variant="primary" className="viewBtn indexBtn m-2">Schedule Game</Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
