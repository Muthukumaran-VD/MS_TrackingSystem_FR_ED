import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink for all links
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUser, faFile, faPen, faCog, faCheckCircle, faMailBulk, faBars } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ onCollapse }) => {
  const [isMasterDataOpen, setIsMasterDataOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleMasterData = () => {
    setIsMasterDataOpen(!isMasterDataOpen);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    onCollapse(!isCollapsed); // Notify parent component
  };

  return (
    <div className={`sidenav ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Collapse Button */}
      <button className="collapse-button" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* Sidebar Content */}
      <h1 className="logo">{!isCollapsed && 'MTS'}</h1>
      <div className="sidebar-names">
        <NavLink
          to="/"
          className="sidebar-link"
          activeClassName="active" // Apply active class for the Dashboard link
        >
          <FontAwesomeIcon icon={faTachometerAlt} /> {!isCollapsed && 'Dashboard'}
        </NavLink>
        <NavLink
          to="/employees"
          className="sidebar-link"
          activeClassName="active" // Apply active class for the Listing Employee link
        >
          <FontAwesomeIcon icon={faUser} /> {!isCollapsed && 'Listing Employee'}
        </NavLink>
        <NavLink
          to="/user-listing"
          className="sidebar-link"
          activeClassName="active" // Apply active class for the BGV Listing Employee link
        >
          <FontAwesomeIcon icon={faUser} /> {!isCollapsed && 'BGV Listing Employee'}
        </NavLink>
        <NavLink
          to="/bgv-request"
          className="sidebar-link"
          activeClassName="active" // Apply active class for the BGV Request Form link
        >
          <FontAwesomeIcon icon={faFile} /> {!isCollapsed && 'BGV Request Form'}
        </NavLink>
        <NavLink
          to="/bgv-employeeform"
          className="sidebar-link"
          activeClassName="active" // Apply active class for the Employee BGV Form link
        >
          <FontAwesomeIcon icon={faPen} /> {!isCollapsed && 'Employee BGV Form'}
        </NavLink>
        <div className="master-data">
          <button className="dropdown-btn" onClick={toggleMasterData}>
            <FontAwesomeIcon icon={faCog} /> {!isCollapsed && 'Master Data'}
            {!isCollapsed && (
              <span className={`arrow ${isMasterDataOpen ? 'open' : ''}`}>&#9660;</span>
            )}
          </button>
          {isMasterDataOpen && !isCollapsed && (
            <div className="dropdown-content">
              <NavLink
                to="/employee-request-status"
                className="sidebar-links"
                activeClassName="active" // Apply active class for the Employee Request Status link
              >
                <FontAwesomeIcon icon={faCheckCircle} /> Employee Request Status
              </NavLink>
              <NavLink
                to="/adding-mail"
                className="sidebar-links"
                activeClassName="active" // Apply active class for the Adding Mail link
              >
                <FontAwesomeIcon icon={faMailBulk} /> Adding Mail
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
