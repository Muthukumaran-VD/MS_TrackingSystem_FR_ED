import React, { useState, useEffect } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import StatusDropdown from '../../components/statusDropdown/StatusDropdown';
import { fetchUsers, fetchStatuses, updateUserStatus, submitBgvDetails, submitEcaDetails, completeBgvDetails } from '../../apiService';
import formatDate from '../../components/dateFormat/DateFormat';
import './UserListing.css';

// New Import for BGV Initiated Modal
import BgvInitiatedModal from '../../components/modals/BgvInitiatedModal';
import BgvSubmissionModal from '../../components/modals/BgvSubmissionModal';
import BgvCompletedModal from '../../components/modals/BgvCompletedModal';
import EcaSharedModal from '../../components/modals/EcaSharedModal';

function UserListing() {
    // State management
    const [users, setUsers] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Modal visibility and state
    const [modals, setModals] = useState({
        showBgvModal: false,
        showBgvCompletedModal: false,
        showEcaSharedModal: false,
        showBgvInitiatedModal: false // New state for BGV Initiated
    });

    const [selectedUser, setSelectedUser] = useState(null);

    // Fetch users data
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

    // Fetch statuses data
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

    // Handlers for search and pagination
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleStatusUpdate = async (userId, newStatus) => {
        setSelectedUser(users.find(user => user.ID === userId));
        if (newStatus === "BGV Initiated") setModals({ ...modals, showBgvInitiatedModal: true }); // Open BGV Initiated Modal
        else if (newStatus === "BGV Submitted") setModals({ ...modals, showBgvModal: true });
        else if (newStatus === "BGV Completed") setModals({ ...modals, showBgvCompletedModal: true });
        else if (newStatus === "ECA Shared") setModals({ ...modals, showEcaSharedModal: true });
        else {
            try {
                const success = await updateUserStatus(userId, newStatus);
                if (success) {
                    setSuccessMessage('Status updated successfully!');
                    updateUserLocalState(userId, newStatus);
                } else {
                    alert('Failed to update status.');
                }
            } catch (error) {
                console.error('Error updating status:', error);
                alert('An error occurred while updating the status.');
            }
        }
    };

    const updateUserLocalState = (userId, newStatus) => {
        setUsers(users.map(user =>
            user.ID === userId ? { ...user, BGV_Request_status: newStatus } : user
        ));
        setTimeout(() => setSuccessMessage(''), 3000);
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
                            <tr className='user-listing-table-row' key={user.ID}>
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
            />

            {/* Modal Components */}
            {modals.showBgvInitiatedModal && (
                <BgvInitiatedModal
                    user={selectedUser}
                    onClose={() => setModals({ ...modals, showBgvInitiatedModal: false })}
                    onSubmit={async (formData) => {
                        // Handle screenshot upload and submit logic
                        // You can call your API to submit the data
                        console.log('Form submitted with:', formData);
                        setModals({ ...modals, showBgvInitiatedModal: false });
                        updateUserLocalState(selectedUser.ID, "BGV Initiated");
                    }}
                />
            )}

            {modals.showBgvModal && (
                <BgvSubmissionModal
                    user={selectedUser}
                    onClose={() => setModals({ ...modals, showBgvModal: false })}
                    onSubmit={async (formData) => {
                        await submitBgvDetails(selectedUser.ID, formData);
                        setModals({ ...modals, showBgvModal: false });
                        updateUserLocalState(selectedUser.ID, "BGV Submitted");
                    }}
                />
            )}

            {modals.showBgvCompletedModal && (
                <BgvCompletedModal
                    user={selectedUser}
                    onClose={() => setModals({ ...modals, showBgvCompletedModal: false })}
                    onSubmit={async (formData) => {
                        await completeBgvDetails(selectedUser.ID, formData);
                        setModals({ ...modals, showBgvCompletedModal: false });
                        updateUserLocalState(selectedUser.ID, "BGV Completed");
                    }}
                />
            )}

            {modals.showEcaSharedModal && (
                <EcaSharedModal
                    user={selectedUser}
                    onClose={() => setModals({ ...modals, showEcaSharedModal: false })}
                    onSubmit={async (ecaForm) => {
                        await submitEcaDetails(selectedUser.ID, ecaForm);
                        setModals({ ...modals, showEcaSharedModal: false });
                        updateUserLocalState(selectedUser.ID, "ECA Shared");
                    }}
                />
            )}
        </div>
    );
}

export default UserListing;
