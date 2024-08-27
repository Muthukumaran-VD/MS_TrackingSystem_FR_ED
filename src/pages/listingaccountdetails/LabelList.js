import React, { useState } from 'react';
import '../../assests/styles/labellist.css';
import SingleUserView from './SingleUserView';
import UserList from './UserList';

//Handles user interaction by updating the state when a user is clicked, allowing toggling between user list and user details.

function LabelList() {
  const [selectedUser, setSelectedUser] = useState(null);
  const handleUserClick = (user) => {
    setSelectedUser(user);
  };
  return (
    <div className="usertable">
      {selectedUser ? (
        <SingleUserView user={selectedUser} onBackClick={() => setSelectedUser(null)} />
      ) : (
        <UserList onUserClick={handleUserClick} />
      )}
    </div>
  );
}

export default LabelList;
