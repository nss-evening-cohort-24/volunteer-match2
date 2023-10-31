import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import GameForm from '../../../components/forms/GameForm';
import { getSingleGame } from '../../../api/gameData';

export default function EditTeam() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // grab the firebasekey
  const { id } = router.query;

  // make a call to the API to get the team data
  useEffect(() => {
    getSingleGame(id).then(setEditItem);
  }, [id]);
  // pass object to form
  return (<GameForm gameObj={editItem} />);
}
