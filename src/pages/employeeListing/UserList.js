import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFileExport, faCopy } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../../components/Pagination/Pagination';
import formatDate from '../../components/dateFormat/DateFormat';
import handleExport from '../../components/exportButton/ExportUsers';
import { useNavigate } from 'react-router-dom';
import './UserList.css';

function UserList() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [copiedEmail, setCopiedEmail] = useState('');
    const navigate = useNavigate();

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
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

    return (
        <div className="user-list">
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
            <table className="user-listing-table">
                <thead>
                    <tr className="user-row header">
                        <th className="user-data">BGV ID</th>
                        <th className="user-data">Request No</th>
                        <th className="user-data">Position Type</th>
                        <th className="user-data">Resource Name</th>
                        <th className="user-data">V-Account</th>
                        <th className="user-data">Project</th>
                        <th className="user-data">Client Manager</th>
                        <th className="user-data">Client Lead</th>
                        <th className="user-data">Work Start Date</th>
                        <th className="user-data">Expiry Date</th>
                        <th className="user-data">Max Policy Expiry Date</th>
                        <th className="user-data">Billing Status</th>
                        <th className="user-data">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(users) && users.length > 0 ? (
                        users.map((user, index) => (
                            <tr className="user-row" key={index}>
                                <td className="user-data">{user.BGV_ID}</td>
                                <td className="user-data">{user.Request_ID}</td>
                                <td className="user-data">{user.Position_Type}</td>
                                <td className="user-data">{user.Resource_Name}</td>
                                <td className="user-data v-dash">
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
                                </td>
                                <td className="user-data">{user.Project}</td>
                                <td className="user-data">{user.Client_Manager}</td>
                                <td className="user-data">{user.Client_Lead}</td>
                                <td className="user-data">
                                    {user.Work_Start_Date ? formatDate(user.Work_Start_Date) : 'No Date Provided'}
                                </td>
                                <td className="user-data">
                                    {user.Expiry_Date ? formatDate(user.Expiry_Date) : 'No Date Provided'}
                                </td>
                                <td className="user-data">
                                    {user.Max_Policy_Expiry_Date ? formatDate(user.Max_Policy_Expiry_Date) : 'No Date Provided'}
                                </td>
                                <td className="user-data">{user.Billing_Status}</td>
                                <td className="user-data">
                                    <button className="viewbutton" onClick={() => handleViewClick(user)}>
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="13" className="userdatano">No match found</td>
                        </tr>
                    )}
                </tbody>
            </table>
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
