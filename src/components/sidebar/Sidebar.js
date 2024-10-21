// Sidebar.js
import React from 'react';
import './Sidebar.css'; // Importing the CSS for the sidebar
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Sidebar = () => {
  return (
    <div className="sidenav">
      <h1 className="logo">MTS</h1>
      <div>
        <Link to="/">Dashboard</Link>
        <Link to="/employees">Listing Employee</Link>
        <Link to="/bgv-request">BGV Request Form</Link> {/* New Route for BGV Request */}
        <Link to="/bgv-employeeform">Employee BGV Form</Link>
      </div>
    </div>
  );
};

export default Sidebar;
