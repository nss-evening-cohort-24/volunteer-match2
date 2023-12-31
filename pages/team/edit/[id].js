import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleTeam } from '../../../api/teamData';
import TeamForm from '../../../components/forms/TeamForm';

export default function EditTeam() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // grab the firebasekey
  const { id } = router.query;

  // make a call to the API to get the team data
  useEffect(() => {
    getSingleTeam(id).then(setEditItem);
  }, [id]);
  console.warn(editItem);
  // pass object to form
  return (<TeamForm obj={editItem} />);
}
