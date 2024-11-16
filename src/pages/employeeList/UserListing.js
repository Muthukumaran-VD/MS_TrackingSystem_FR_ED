import React, { useState, useEffect } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import formatDate from '../../components/dateFormat/DateFormat';
import Logo from '../../components/logo/logo';
import axios from 'axios';
import StatusPopup from '../../components/popup/PopUp';
import './UserListing.css'


function UserListing() {
    const [users, setUsers] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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

    const handleStatusChange = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/users/updatinguserstatus`, {
                userId: selectedUserId,
                status: selectedStatus
            });

            if (response.status === 200) {
                setSuccessMessage("Status updated successfully!");
                const updatedUsers = users.map(user => 
                    user.ID === selectedUserId ? { ...user, BGV_Request_status: selectedStatus } : user
                );
                setUsers(updatedUsers);
                setPopupOpen(false);

                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            } else {
                alert("Failed to update status.");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            alert("An error occurred while updating the status.");
        }
    };

    useEffect(() => {
        const fetchStatuses = async () => {
            try {
                const response = await axios.get('http://localhost:8000/users/statuses');
                setStatuses(response.data);
            } catch (error) {
                console.error('Error fetching statuses:', error);
                setStatuses([]);
            }
        };
        fetchStatuses();
    }, []);

    const handleDropdownChange = (userId, status) => {
        setSelectedUserId(userId);
        setSelectedStatus(status);
        setPopupMessage(`Do you want to change the status to "${status}"?`);
        setPopupOpen(true);
    };

    return (
        <div className="user-listing-container">
            <Logo />
            {successMessage && <div className="user-listing-success-message">{successMessage}</div>}
            <div className="user-listing-search-export">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="user-listing-search-box"
                />
                <h2 className='user-heading'>Users</h2>
            </div>
            <div className="user-listing-table">
                <table>
                    <thead>
                        <tr className="user-listing-header-row">
                            <th className="user-listing-header-data">ID</th>
                            <th className="user-listing-header-data">Resource Name</th>
                            <th className="user-listing-header-data">Personal Email</th>
                            <th className="user-listing-header-data">Project Title</th>
                            <th className="user-listing-header-data">BGV Request Date</th>
                            <th className="user-listing-header-data-status">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(users) && users.length > 0 ? (
                            users.map((user, index) => (
                                <tr className="user-listing-row" key={index}>
                                    <td className="user-listing-data">{user.ID}</td>
                                    <td className="user-listing-data">{user.Resource_Name}</td>
                                    <td className="user-listing-data">{user.VueData_Email}</td>
                                    <td className="user-listing-data">{user.Project}</td>
                                    <td className="user-listing-data">
                                        {user.Request_Raised_Date ? formatDate(user.Request_Raised_Date) : 'No Date Provided'}
                                    </td>
                                    <td className="user-listing-data-status">
                                        <select className="user-listing-dropdown-status"
                                            value={user.BGV_Request_status || ''}
                                            onChange={(e) => handleDropdownChange(user.ID, e.target.value)}
                                        >
                                            {statuses.map((status, idx) => (
                                                <option key={idx} value={status.name}>
                                                    {status.name}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="user-listing-no-data">No match found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Pagination
                usersPerPage={usersPerPage}
                totalPages={totalPages}
                paginate={paginate}
                currentPage={currentPage}
            />

            <StatusPopup 
                isOpen={popupOpen} 
                onClose={() => setPopupOpen(false)} 
                onSave={handleStatusChange} 
                message={popupMessage} 
            />
        </div>
    );
}

export default UserListing;
