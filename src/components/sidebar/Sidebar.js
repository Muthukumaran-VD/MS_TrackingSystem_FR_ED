import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUser, faFile, faPen, faCog, faCheckCircle, faMailBulk } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [isMasterDataOpen, setIsMasterDataOpen] = useState(false);

  const toggleMasterData = () => {
    setIsMasterDataOpen(!isMasterDataOpen);
  };

  return (
    <div className="sidenav">
      <h1 className="logo">MTS</h1>
      <div className="sidebar-names">
        {/* Dashboard with FontAwesome icon */}
        <Link to="/" className="sidebar-link">
          <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
        </Link>
        {/* Listing Employee with FontAwesome icon */}
        <Link to="/employees" className="sidebar-link">
          <FontAwesomeIcon icon={faUser} /> Listing Employee
        </Link>
        {/* BGV Request Form with FontAwesome icon */}
        <Link to="/bgv-request" className="sidebar-link">
          <FontAwesomeIcon icon={faFile} /> BGV Request Form
        </Link>
        {/* Employee BGV Form with FontAwesome icon */}
        <Link to="/bgv-employeeform" className="sidebar-link">
          <FontAwesomeIcon icon={faPen} /> Employee BGV Form
        </Link>
        {/* Master Data Dropdown with FontAwesome icon */}
        <div className="master-data">
          <button className="dropdown-btn" onClick={toggleMasterData}>
            <FontAwesomeIcon icon={faCog} /> Master Data
            <span className={`arrow ${isMasterDataOpen ? 'open' : ''}`}>&#9660;</span>
          </button>
          {isMasterDataOpen && (
            <div className="dropdown-content">
              <Link to="/employee-request-status" className="sidebar-links">
                <FontAwesomeIcon icon={faCheckCircle} /> Employee Request Status
              </Link>
              <Link to="/adding-mail" className="sidebar-links">
                <FontAwesomeIcon icon={faMailBulk} /> Adding Mail
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
