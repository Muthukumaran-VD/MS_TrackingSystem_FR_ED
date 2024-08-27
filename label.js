import React, { useState, useEffect } from 'react';
import '../../assests/styles/labellist.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assests/images/vuedata-logo.png';
import Mslogo from '../../assests/images/MSlogo.webp';

function LabelList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  useEffect(() => {
    fetch("http://localhost:5001/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const exportData = () => {
    const csvContent = users.map(user => {
      return Object.values(user).join(",");
    }).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const paginatedUsers = users.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div className="usertable">
      {selectedUser ? (
        <SingleUserView user={selectedUser} onBackClick={() => setSelectedUser(null)} />
      ) : (
        <>
          <UserList
            users={paginatedUsers}
            onUserClick={handleUserClick}
          />
          <div className="pagination">
            {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
              <button key={i} onClick={() => handlePageChange(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
                {i + 1}
              </button>
            ))}
          </div>
          <button onClick={exportData} className="export-button">Export</button>
        </>
      )}
    </div>
  );
}

function UserList({ users = [], onUserClick }) {
  const [editing, setEditing] = useState(null);
  const [editValues, setEditValues] = useState({});

  const handleDoubleClick = () => {
    alert("double clicked");
  };

  const handleSave = () => {
    alert("clicked save button")
  };

  const handleCancel = () => {
    alert("clicked cancel button")
  };

  const maskEmail = (email) => {
    const [firstPart, secondPart] = email.split("@");
    return `${firstPart[0]}****@${secondPart}`;
  };

  if (!Array.isArray(users) || users.length === 0) {
    return <div>Please wait for a few minutes...</div>;
  }

  return (
    <div className="user-list">
      <div className="header-container">
        <img src={Mslogo} alt="MS Logo" className="MSlogo" />
        <h2>Users</h2>
        <img src={logo} alt="Vue Data Logo" className="Vuedatalogo" />
      </div>
      <div className="user-row header">
        <div className="user-data">Request Number</div>
        <div className="user-data">V-Account Email</div>
        <div className="user-data">Contract Type</div>
        <div className="user-data">Resource Name</div>
        <div className="user-data">BGV ID</div>
        <div className="user-data">Client Partner</div>
        <div className="user-data">Client Manager</div>
        <div className="user-data">Client Lead</div>
        <div className="user-data">Action</div>
      </div>
      {users.map((user, index) => (
        <div className="user-row" key={index}>
          {['requestNumber', 'vAccountEmail', 'contractType', 'resourceName', 'bgvId', 'clientPartner', 'clientManager', 'clientLead'].map((field) => (
            <div key={field} className="user-data">
              {editing && editing.userId === user.id && editing.field === field ? (
                <div className="edit-field">
                  <input
                    type="text"
                    value={editValues[`${user.id}-${field}`] || ''}
                    onChange={(e) =>
                      setEditValues((prevValues) => ({
                        ...prevValues,
                        [`${user.id}-${field}`]: e.target.value,
                      }))
                    }
                  />
                  <FontAwesomeIcon icon={faSave} onClick={() => handleSave(user, field)} />
                  <FontAwesomeIcon icon={faTimes} onClick={handleCancel} />
                </div>
              ) : (
                <div onDoubleClick={() => handleDoubleClick(user, field)}>
                  {field === 'vAccountEmail' ? maskEmail(user[field]) : user[field]}
                </div>
              )}
            </div>
          ))}
          <div className="user-data">
            <button className='viewbutton' onClick={() => onUserClick(user)}>
              <FontAwesomeIcon icon={faEye} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function SingleUserView({ user, onBackClick }) {
  const keysToShow = [
    "requestId",
    "employeeId",
    "firstName",
    "lastName",
    "legalName",
    "phoneNumber",
    "emailId",
    "poNumber",
    "contractType",
    "requestNumber",
    "vAccountEmail",
    "resourceName",
    "bgvId",
    "clientPartner",
    "clientManager",
    "clientLead",
    "startDate",
    "endDate",
    "expiryDate",
    "maxExpiryDate"
  ];

  const [editableField, setEditableField] = useState(null);
  const [editedUser, setEditedUser] = useState(user);

  const handleDoubleClick = (key) => {
    setEditableField(key);
  };

  const handleInputChange = (key, value) => {
    setEditedUser({ ...editedUser, [key]: value });
  };

  const handleInputBlur = () => {
    setEditableField(null);
  };

  return (
    <div className="single-user-view">
      <div className="header-button-container">
        <h2>Single User View</h2>
        <button className="backbutton" onClick={onBackClick}>Back to List</button>
      </div>
      <table className="user-details-table">
        <tbody>
          {Object.entries(editedUser)
            .filter(([key]) => keysToShow.includes(key))
            .map(([key, value]) => (
              <tr key={key}>
                <td className="table-label">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </td>
                <td onDoubleClick={() => handleDoubleClick(key)}>
                  {editableField === key ? (
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      onBlur={handleInputBlur}
                      autoFocus
                    />
                  ) : (
                    value
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default LabelList;
