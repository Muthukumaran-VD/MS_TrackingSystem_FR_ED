import React, { useState, useEffect } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import StatusDropdown from '../../components/statusDropdown/StatusDropdown';
import { fetchUsers, fetchStatuses, updateUserStatus } from '../../apiService';
import formatDate from '../../components/dateFormat/DateFormat';
import './UserListing.css';

function UserListing() {
    const [users, setUsers] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showModal, setShowModal] = useState(false); // For controlling the modal visibility
    const [selectedUserId, setSelectedUserId] = useState(null); // To keep track of the selected user
    const [screenshot, setScreenshot] = useState(null); // For storing the uploaded file
    const [bgvSubmissionDate, setBgvSubmissionDate] = useState(new Date().toISOString().slice(0, 10)); // Default to today's date

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchUsers(currentPage, usersPerPage, searchQuery);
                setUsers(data.users);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        loadUsers();
    }, [currentPage, usersPerPage, searchQuery]);

    useEffect(() => {
        const loadStatuses = async () => {
            try {
                const data = await fetchStatuses();
                setStatuses(data);
            } catch (error) {
                console.error('Error fetching statuses:', error);
            }
        };
        loadStatuses();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleFileChange = (e) => {
        setScreenshot(e.target.files[0]); // Handle the file selection
    };

    const handleStatusUpdate = async (userId, newStatus) => {
        if (newStatus === "BGV Submitted") {
            setSelectedUserId(userId); // Set the selected user when the status is BGV Submitted
            setShowModal(true); // Show the modal
        } else {
            try {
                const success = await updateUserStatus(userId, newStatus);
                if (success) {
                    setSuccessMessage('Status updated successfully!');
                    setUsers(users.map(user =>
                        user.ID === userId ? { ...user, BGV_Request_status: newStatus } : user
                    ));
                    setTimeout(() => setSuccessMessage(''), 3000);
                } else {
                    alert('Failed to update status.');
                }
            } catch (error) {
                console.error('Error updating status:', error);
                alert('An error occurred while updating the status.');
            }
        }
    };

    const handleSubmit = async () => {
        if (!screenshot) {
            alert("Please upload a screenshot.");
            return;
        }

        // Create FormData to send to the backend
        const formData = new FormData();
        formData.append('userId', selectedUserId);
        formData.append('screenshot', screenshot);
        formData.append('bgvSubmissionDate', bgvSubmissionDate);

        // Send the FormData to the backend
        try {
            const response = await fetch(`/api/update-bgv/${selectedUserId}`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert("BGV Submitted successfully!");
                setShowModal(false); // Close the modal after submission
                setUsers(users.map(user =>
                    user.ID === selectedUserId ? { ...user, BGV_Request_status: 'BGV Submitted' } : user
                ));
            } else {
                alert("Error submitting BGV.");
            }
        } catch (error) {
            console.error('Error uploading BGV:', error);
        }
    };

    return (
        <div className="user-listing-container">
            {successMessage && <div className="user-listing-success-message">{successMessage}</div>}
            <div className="user-listing-header">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="user-listing-search-box"
                />
                <h2 className="user-listing-heading">Users</h2>
            </div>
            <div className="user-listing-table">
                <table className="user-listing-table-content">
                    <thead>
                        <tr>
                            <th className="user-listing-table-header">ID</th>
                            <th className="user-listing-table-header">Resource Name</th>
                            <th className="user-listing-table-header">Personal Email</th>
                            <th className="user-listing-table-header">Project Title</th>
                            <th className="user-listing-table-header">BGV Request Date</th>
                            <th className="user-listing-table-header">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.ID} className="user-listing-table-row">
                                <td>{user.ID}</td>
                                <td>{user.Legal_Name}</td>
                                <td>{user.VueData_Email}</td>
                                <td>{user.Project}</td>
                                <td>{user.Request_Raised_Date ? formatDate(user.Request_Raised_Date) : 'No Date Provided'}</td>
                                <td>
                                    <StatusDropdown
                                        statuses={statuses}
                                        currentStatus={user.BGV_Request_status}
                                        onChange={(statusId) => handleStatusUpdate(user.ID, statusId)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                className="user-listing-pagination"
            />

            {/* Modal Popup */}
            {showModal && (
                <div className="bgv-modal">
                    <div className="bgv-modal-content">
                        <h3>Upload Screenshot & BGV Submission Date</h3>
                        <input
                            type="file"
                            onChange={handleFileChange}
                        />
                        <br />
                        <input
                            type="date"
                            value={bgvSubmissionDate}
                            onChange={(e) => setBgvSubmissionDate(e.target.value)}
                        />
                        <br />
                        <button className="submit-button" onClick={handleSubmit}>Submit</button>
                        <button className='cancel-button' onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserListing;
