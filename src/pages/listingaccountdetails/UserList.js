import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFileExport } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../../components/Pagination';
import formatDate from '../../components/DateFormat';
import handleExport from '../../components/ExportUsers';
import logo from '../../assests/images/VD.png';
import Mslogo from '../../assests/images/MS.png';

// The UserList component fetches and displays a list of users with pagination and search functionality.
// It manages the current page, search query, and the number of users displayed per page.
// The component allows users to search, paginate through results, and select a user to trigger an external action via the onUserClick callback.

function UserList({ onUserClick }) {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(8);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`http://localhost:5001/users?page=${currentPage}&limit=${usersPerPage}&search=${encodeURIComponent(searchQuery)}`);
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


    return (
        <div className="user-list">
            <div className="userheader">
                <div className="header-container">
                    <img src={Mslogo} alt="MS Logo" className="MSlogo" />
                    <h2>Users</h2>
                    <img src={logo} alt="VueData Logo" className="Vuedatalogo" />
                </div>
                <div className='search-export'>
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="search-box"
                    />
                    <p onClick={handleExport} className="export-button">
                        <span><FontAwesomeIcon icon={faFileExport} /></span>
                        Export
                    </p>
                </div>
            </div>
            <div className="user-row header">
                <div className="user-data">BGV ID</div>
                <div className="user-data">Request ID</div>
                <div className="user-data">Position Type</div>
                <div className="user-data">Resource Name</div>
                <div className="user-data">V-Account</div>
                <div className="user-data">Project</div>
                <div className="user-data">Client Partner</div>
                <div className="user-data">Client Manager</div>
                <div className="user-data">Work Start Date</div>
                <div className="user-data">Expiry Date</div>
                <div className="user-data">Max Policy Expiry Date</div>
                <div className="user-data">Resource Status</div>
                <div className="user-data">Billing Status</div>
                <div className="user-data">Action</div>
            </div>

            {Array.isArray(users) && users.length > 0 ? (
                users.map((user, index) => (
                    <div className="user-row" key={index}>
                        <div className="user-data">{user.BGV_ID}</div>
                        <div className="user-data">{user.Request_ID}</div>
                        <div className="user-data">{user.Position_Type}</div>
                        <div className="user-data">{user.Resource_Name}</div>
                        <div className="user-data">{user.V_Account}</div>
                        <div className="user-data">{user.Project}</div>
                        <div className="user-data">{user.Client_Partner}</div>
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
                        <div className="user-data">{user.Resource_Status}</div>
                        <div className="user-data">{user.Billing_Status}</div>
                        <div className="user-data">
                            <button className="viewbutton" onClick={() => onUserClick(user)}>
                                <FontAwesomeIcon icon={faEye} />
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <h2 className='userdatano'>No match found</h2>
            )}
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