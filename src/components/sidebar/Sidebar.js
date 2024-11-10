import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './Sidebar.css'; // Importing the CSS for the sidebar

const Sidebar = () => {
  const navigate = useNavigate();

  // Logout function to handle clearing user data and redirect to login
  const handleLogout = () => {
    // Clear any authentication data (like token) from localStorage/sessionStorage
    localStorage.removeItem('authToken'); // Assuming the token is stored in localStorage
    sessionStorage.removeItem('authToken'); // If you use sessionStorage

    // Redirect user to the login page
    navigate('/login'); // Change '/login' to the actual route of your login page
  };

  return (
    <div className="sidenav">
      <h1 className="logo">MTS</h1>
      <div>
        <Link to="/">Dashboard</Link>
        <Link to="/employees">Listing Employee</Link>
        <Link to="/bgv-request">BGV Request Form</Link> {/* New Route for BGV Request */}
        <Link to="/bgv-employeeform">Employee BGV Form</Link>
      </div>
      
      {/* Logout Button at the bottom */}
      <div className="logout-container">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
