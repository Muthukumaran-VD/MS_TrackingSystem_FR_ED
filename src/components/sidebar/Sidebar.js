import React from 'react';
import './Sidebar.css'; // Importing the CSS for the sidebar

const Sidebar = () => {
  return (
    <div className="sidenav">
      <h1 className="logo" >MTS</h1>
      <div>
        <a href="#">Dashboard</a>
        <a href="#">Listing Employee</a>
        <a href="#">BGV Request Form</a>
        <a href="#">Employee BGV Form</a>
      </div>
      <div className="logout">
        <a href="#">Logout</a>
      </div>
    </div>
  );
};

export default Sidebar;
