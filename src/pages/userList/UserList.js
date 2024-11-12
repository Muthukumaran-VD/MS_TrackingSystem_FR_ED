import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFileExport, faCopy } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../../components/Pagination/Pagination';
import formatDate from '../../components/dateFormat/DateFormat';
import handleExport from '../../components/exportButton/ExportUsers';
import { useNavigate } from 'react-router-dom';
import './UserList.css';
import Logo from '../../components/logo/logo';

function UserList() {
    const [users, setUsers] = useState([]);
    const [statuses, setStatuses] = useState([]); // For storing status options
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(8);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [copiedEmail, setCopiedEmail] = useState('');
    const navigate = useNavigate();

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        // Fetching users data
        const fetchUsers = async () => {
            try {
                const res = await fetch(`http://localhost:8000/users?page=${currentPage}&limit=${usersPerPage}&search=${encodeURIComponent(searchQuery)}`);
                const data = await res.json();
                setUsers(data.users);
                setTotalPages(data.totalPages);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUsers();
    }, [currentPage, usersPerPage, searchQuery]);

    useEffect(() => {
        // Fetching statuses for dropdown
        const fetchStatuses = async () => {
            try {
                const res = await fetch('http://localhost:8000/users/statuses');
                const data = await res.json();
                setStatuses(data); // Assuming the response is an array of status options
            } catch (err) {
                console.error(err);
            }
        };

        fetchStatuses();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleViewClick = (user) => {
        navigate(`/user/${user.BGV_ID}`, { state: { user } });
    };

    const handleCopyEmail = (email) => {
        navigator.clipboard.writeText(email);
        setCopiedEmail(email);
        setTimeout(() => setCopiedEmail(''), 2000);
    };

    const handleStatusChange = (userId, newStatus) => {
        // You can implement a function here to handle the change
        // and send an update to the backend if needed
        console.log(`Status for user ${userId} changed to ${newStatus}`);
    };

    return (
        <div className="user-list">
            <Logo />
            <div className='search-export'>
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-box"
                />
                <h2>Users</h2>
                <p onClick={handleExport} className="export-button">
                    <span><FontAwesomeIcon icon={faFileExport} /></span>
                    Export
                </p>
            </div>
            <div className="user-table">
                <div className="user-row header">
                    <div className="user-data">BGV ID</div>
                    <div className="user-data">Request ID</div>
                    <div className="user-data">Resource Name</div>
                    <div className="user-data">V-Account</div>
                    <div className="user-data">Project</div>
                    <div className="user-data">VD MailId</div>
                    <div className="user-data">Client Manager</div>
                    <div className="user-data">Work Start Date</div>
                    <div className="user-data">Expiry Date</div>
                    <div className="user-data">Max Policy Expiry Date</div>
                    <div className="user-data">BGV Request status</div>
                    <div className="user-data">Action</div>
                </div>

                {Array.isArray(users) && users.length > 0 ? (
                    users.map((user, index) => (
                        <div className="user-row" key={index}>
                            <div className="user-data">{user.BGV_ID}</div>
                            <div className="user-data">{user.Request_ID}</div>
                            <div className="user-data">{user.Resource_Name}</div>
                            <div className="user-data v-dash">
                                <div className="email-container">
                                    <span className="truncated-email">
                                        {user.V_Account && user.V_Account.split('@')[0]}
                                    </span>
                                    <div className="tooltip">
                                        <span>{user.V_Account}</span>
                                        <FontAwesomeIcon
                                            icon={faCopy}
                                            className="copy-icon"
                                            onClick={() => handleCopyEmail(user.V_Account)}
                                        />
                                        {copiedEmail === user.V_Account && <span className="copied-text">Copied!</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="user-data">{user.Project}</div>
                            <div className="user-data">{user.VueData_Email}</div>
                            <div className="user-data">{user.Client_Manager}</div>
                            <div className="user-data">
                                {user.Work_Start_Date ? formatDate(user.Work_Start_Date) : 'No Date Provided'}
                            </div>
                            <div className="user-data">
                                {user.Expiry_Date ? formatDate(user.Expiry_Date) : 'No Date Provided'}
                            </div>
                            <div className="user-data">
                                {user.Max_Policy_Expiry_Date ? formatDate(user.Max_Policy_Expiry_Date) : 'No Date Provided'}
                            </div>
                            <div className="user-data">
                                <select
                                    value={user.BGV_Request_status}
                                    onChange={(e) => handleStatusChange(user.BGV_ID, e.target.value)}
                                >
                                    {statuses.map((status) => (
                                        <option key={status.status_id} value={status.status_id}>
                                            {status.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="user-data">
                                <button className="viewbutton" onClick={() => handleViewClick(user)}>
                                    <FontAwesomeIcon icon={faEye} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <h2 className='userdatano'>No match found</h2>
                )}
            </div>
            <Pagination
                usersPerPage={usersPerPage}
                totalPages={totalPages}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
}

export default UserList;
