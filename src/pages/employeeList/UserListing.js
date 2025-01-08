import React, { useState, useEffect } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import StatusDropdown from '../../components/statusDropdown/StatusDropdown';
import { fetchUsers, fetchStatuses, updateUserStatus, submitBgvDetails, submitEcaDetails, completeBgvDetails } from '../../apiService';
import formatDate from '../../components/dateFormat/DateFormat';
import './UserListing.css';

// New Import for BGV Initiated Modal
import BgvInitiatedModal from '../../components/modals/bgvInitiatedModal/BgvInitiatedModal';
import BgvSubmissionModal from '../../components/modals/bgvSubmissionModal/BgvSubmissionModal';
import BgvCompletedModal from '../../components/modals/bgvCompletedModal/BgvCompletedModal';
import EcaSharedModal from '../../components/modals/ecaSharedModal/EcaSharedModal';
import EcaInitiatedModal from '../../components/modals/bgvInitiatedModal/BgvInitiatedModal'
import ScocTrainingCompletedModal from '../../components/modals/scocTrainingCompletedModal/ScocTrainingCompletedModal';
import ConfirmationModal from '../../components/modals/confirmationModal/ConfirmationModal';



function UserListing() {
    // State management
    const [users, setUsers] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [modals, setModals] = useState({
        showBgvModal: false,
        showBgvCompletedModal: false,
        showEcaSharedModal: false,
        showBgvInitiatedModal: false,
        showEcaInitiatedModal: false,
        showScocTrainingModal: false,
        showCredentialsModal: false, // New state for Credentials Received
        showSetupSystemModal: false, // New state for Setup System
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
        if (newStatus === "Credentials Recieved") {
            setModals({ ...modals, showCredentialsModal: true });
        } else if (newStatus === "Setup System") {
            setModals({ ...modals, showSetupSystemModal: true });
        } else if (newStatus === "SCOC Training Completed") {
            setModals({ ...modals, showScocTrainingModal: true });
        } else if (newStatus === "ECA Initiated") {
            setModals({ ...modals, showEcaInitiatedModal: true });
        } else if (newStatus === "BGV Initiated") {
            setModals({ ...modals, showBgvInitiatedModal: true });
        } else if (newStatus === "BGV Submitted") {
            setModals({ ...modals, showBgvModal: true });
        } else if (newStatus === "BGV Completed") {
            setModals({ ...modals, showBgvCompletedModal: true });
        } else if (newStatus === "ECA Shared") {
            setModals({ ...modals, showEcaSharedModal: true });
        } else {
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

            {/* Credentials Received Confirmation Modal */}
            {modals.showCredentialsModal && (
                <ConfirmationModal
                    message="Are you sure you want to update the status to 'Credentials Received'?"
                    onClose={() => setModals({ ...modals, showCredentialsModal: false })}
                    onConfirm={async () => {
                        try {
                            const success = await updateUserStatus(selectedUser.ID, "Credentials Received");
                            if (success) {
                                updateUserLocalState(selectedUser.ID, "Credentials Received");
                                setSuccessMessage('Status updated to "Credentials Received" successfully!');
                            }
                        } catch (error) {
                            alert('An error occurred while updating the status.');
                        }
                        setModals({ ...modals, showCredentialsModal: false });
                    }}
                />
            )}

            {/* Setup System Confirmation Modal */}
            {modals.showSetupSystemModal && (
                <ConfirmationModal
                    message="Are you sure you want to update the status to 'Setup System'?"
                    onClose={() => setModals({ ...modals, showSetupSystemModal: false })}
                    onConfirm={async () => {
                        try {
                            const success = await updateUserStatus(selectedUser.ID, "Setup System");
                            if (success) {
                                updateUserLocalState(selectedUser.ID, "Setup System");
                                setSuccessMessage('Status updated to "Setup System" successfully!');
                            }
                        } catch (error) {
                            alert('An error occurred while updating the status.');
                        }
                        setModals({ ...modals, showSetupSystemModal: false });
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

            {modals.showEcaInitiatedModal && (
                <EcaInitiatedModal
                    user={selectedUser}
                    onClose={() => setModals({ ...modals, showEcaInitiatedModal: false })}
                    onSubmit={async (formData) => {
                        console.log('ECA Initiated Form Data:', formData);
                        setModals({ ...modals, showEcaInitiatedModal: false });
                        updateUserLocalState(selectedUser.ID, "ECA Initiated");
                    }}
                />
            )}

            {modals.showScocTrainingModal && (
                <ScocTrainingCompletedModal
                    user={selectedUser}
                    onClose={() => setModals({ ...modals, showScocTrainingModal: false })}
                    onSubmit={async (formData) => {
                        console.log('SCOC Training Form Data:', formData);
                        setModals({ ...modals, showScocTrainingModal: false });
                        updateUserLocalState(selectedUser.ID, "SCOC Training Completed");
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
