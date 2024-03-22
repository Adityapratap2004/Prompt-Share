'use client'
import Profile from '@components/Profile'
import { useParams } from 'next/navigation';

import React, { useEffect, useState } from 'react'

const Otherprofile = () => {
  const [posts, setPosts] = useState([]);
  const params = useParams();
  const { id } = params;
  const _id = id[0];
  let name = id[1];
  name=name.replace('%20',' ');
  

  

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${_id}/posts`);
      const data = await response.json();
      setPosts(data);
      
    }
    fetchPost();
  }, [])
  return (
    <Profile
      name={name}
      desc={`Welcome to the  profile page ${name}`}
      data={posts}
    />
  )
}

export default Otherprofile
