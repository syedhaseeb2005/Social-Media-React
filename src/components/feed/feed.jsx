import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Authcontext } from '../../context/Authcontext';
import Share from '../Share/share';
import Post from '../Post/post';

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(Authcontext);
  const [checknewPost, setCheckNewPost] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = username
          ? await axios.get(`http://localhost:5500/api/post/profile/${username}`)
          : await axios.get(`http://localhost:5500/api/post/timeline/${user?._id}`);
        
        // console.log(response.data);
        setPosts(response.data.sort((p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)));
      } catch (error) {
        console.log(error);
        // You can set an error state here if needed
      }
    };

    fetchPosts();
  }, [username, user?._id, checknewPost]);

  return (
    <div className="feedbar">
      <div className="feedWrapper">
      <Share setCheckNewPost={setCheckNewPost} />
        {posts.map((post) => (
          <Post key={post?._id} post={post} />
        ))}
      </div>
    </div>
  );
}
