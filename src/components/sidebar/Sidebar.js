import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './Sidebar.css'; 

const Sidebar = () => {
  const navigate = useNavigate();
  const [isMasterDataOpen, setIsMasterDataOpen] = useState(false); 

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    navigate('/login');
  };

  const toggleMasterData = () => {
    setIsMasterDataOpen(!isMasterDataOpen);
  };

  return (
    <div className="sidenav">
      <h1 className="logo">MTS</h1>
      <div className="sidebar-names">
        <Link to="/">Dashboard</Link>
        <Link to="/employees">Listing Employee</Link>
        <Link to="/bgv-request">BGV Request Form</Link>
        <Link to="/bgv-employeeform">Employee BGV Form</Link>

        {/* Master Data Dropdown */}
        <div className="master-data">
          <button className="dropdown-btn" onClick={toggleMasterData}>
            Master Data
            <span className={`arrow ${isMasterDataOpen ? 'open' : ''}`}>&#9660;</span>
            {/* You can use a CSS entity for the arrow like &#9660; (down arrow) */}
          </button>
          {isMasterDataOpen && (
            <div className="dropdown-content">
              <Link to="/employee-request-status">Employee Request Status</Link>
            </div>
          )}
        </div>
      </div>
      
      <div className="logout-container">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
