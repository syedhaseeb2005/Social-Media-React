import React from 'react';
import './closefriend.css';

function CloseFriend({ user }) {

  return (
    <li className="sidebarFriend">
      <img
      className="siebarFriendimg"
      src={user.profilepic}
      alt=""
/>
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}

export default CloseFriend;
