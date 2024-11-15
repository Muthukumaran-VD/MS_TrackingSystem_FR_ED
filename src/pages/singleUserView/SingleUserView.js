import React, { useState, useEffect } from 'react';
import formatDate from '../../components/dateFormat/DateFormat';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate
import axios from 'axios'; // Import axios for API requests
import './SingleUserView.css';
import Logo from '../../components/logo/logo';

function SingleUserView() {
    const [isJobDetailsOpen, setIsJobDetailsOpen] = useState(false);
    const [userData, setUserData] = useState({});
    const [initialUserData, setInitialUserData] = useState({});
    const [statuses, setStatuses] = useState([]); // State to store statuses
    const location = useLocation();
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    // Get the user data from location state
    const { user } = location.state || {};

    // Initialize user data inside useEffect unconditionally
    useEffect(() => {
        // console.log(user,"user")
        if (user) {
            setUserData(user); // Initialize the form with user data
            setInitialUserData(user); // Save the initial data for comparison
        }
    }, [user]); // Effect depends on the 'user' object

    // Display a message if no user data is available
    const noUserDataMessage = !user ? (
        <h2>No user data available. Please go back and select a user.</h2>
    ) : null;

    // Toggle job details visibility
    const toggleJobDetails = () => {
        setIsJobDetailsOpen(!isJobDetailsOpen);
    };

    // Function to navigate back to the list view
    const handleBackClick = () => {
        navigate(-1); // Go back to the previous page
    };

    // Function to handle form submission and update data
    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedFields = Object.keys(userData).reduce((acc, key) => {
            if (userData[key] !== initialUserData[key]) {
                acc[key] = userData[key];
            }
            return acc;
        }, {});

        if (Object.keys(updatedFields).length === 0) {
            console.log('No changes made.');
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:8000/users/user/${userData.ID}`,
                updatedFields
            );
            console.log('User updated successfully:', response.data);
            setInitialUserData(userData);
            setSuccessMessage('User updated successfully!');
            setTimeout(() => setSuccessMessage(''), 3000); // Hide message after 3 seconds
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    // Handle input changes and update the state with new values
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log(user.BGV_Request_status)
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="user-list">
            <Logo />
            {noUserDataMessage}
            <div className='backsubmit-button'>
                <div className='backbutton-right'>
                    <button className="backbutton" onClick={handleBackClick}>Back to List</button>
                </div>
                {/* Submit Button */}
                <button className="submit-button" onClick={handleSubmit}>
                    Save Changes
                </button>
            </div>
            {/* Success Message */}
            {successMessage && <div className="success-message">{successMessage}</div>}
            <div className="user-details-container">
                {/* Background Details */}
                <div className="section">
                    <h3>Background Details</h3>
                    <div className="user-details-grid">
                        <p><span>BGV ID</span> <input name="BGV_ID" value={userData.BGV_ID} onChange={handleInputChange} /></p>
                        <p><span>BGV Submission Date</span> <input name="BGV_Submission_Date" value={userData.BGV_Submission_Date ? formatDate(userData.BGV_Submission_Date) : ''} onChange={handleInputChange} /></p>
                        <p><span>BGV Completion Date</span> <input name="BGV_Completion_Date" value={userData.BGV_Completion_Date ? formatDate(userData.BGV_Completion_Date) : ''} onChange={handleInputChange} /></p>
                        <p><span>Legal Name</span> <input name="Legal_Name" value={userData.Legal_Name} onChange={handleInputChange} /></p>
                        <p><span>Previous MS V-Account</span> <input name="Previous_MS_V_Account" value={userData.Previous_MS_V_Account} onChange={handleInputChange} /></p>
                    </div>
                </div>

                {/* Client Details */}
                <div className="section">
                    <h3>Client Details</h3>
                    <div className="user-details-grid">
                        <p><span>Client Partner</span> <input name="Client_Partner" value={userData.Client_Partner} onChange={handleInputChange} /></p>
                        <p><span>Client Manager</span> <input name="Client_Manager" value={userData.Client_Manager} onChange={handleInputChange} /></p>
                        <p><span>Client Lead</span> <input name="Client_Lead" value={userData.Client_Lead} onChange={handleInputChange} /></p>
                        <p><span>Client Partner Email</span> <input name="Client_Partner_Email" value={userData.Client_Partner_Email} onChange={handleInputChange} /></p>
                        <p><span>Client Manager Email</span> <input name="Client_Manager_Email" value={userData.Client_Manager_Email} onChange={handleInputChange} /></p>
                        <p><span>Client Lead Email</span> <input name="Client_Lead_Email" value={userData.Client_Lead_Email} onChange={handleInputChange} /></p>
                        <p><span>Client Partner Location</span> <input name="Client_Partner_Location" value={userData.Client_Partner_Location} onChange={handleInputChange} /></p>
                        <p><span>Client Manager Location</span> <input name="Client_Manager_Location" value={userData.Client_Manager_Location} onChange={handleInputChange} /></p>
                        <p><span>Client Lead Location</span> <input name="Client_Lead_Location" value={userData.Client_Lead_Location} onChange={handleInputChange} /></p>
                    </div>
                </div>

                {/* Billing Details */}
                <div className="section">
                    <h3>Billing Details</h3>
                    <div className="user-details-grid">
                        <p><span>Onsite / Offshore</span> <input name="OnSite_Offshore" value={userData.OnSite_Offshore} onChange={handleInputChange} /></p>
                        <p><span>Resource Status</span> <input name="Resource_Status" value={userData.Resource_Status} onChange={handleInputChange} /></p>
                        <p><span>Billing Status</span> <input name="Billing_Status" value={userData.Billing_Status} onChange={handleInputChange} /></p>
                    </div>
                </div>

                {/* Personal Details */}
                <div className="section">
                    <h3>Personal Details</h3>
                    <div className="user-details-grid">
                        <p><span>VueData Employee ID</span> <input name="VueData_Employee_ID" value={userData.VueData_Employee_ID} onChange={handleInputChange} /></p>
                        <p><span>VueData Email</span> <input name="VueData_Email" value={userData.VueData_Email} onChange={handleInputChange} /></p>
                        <p><span>Phone Number</span> <input name="Phone_Number" value={userData.Phone_Number} onChange={handleInputChange} /></p>
                        <p><span>First Name</span> <input name="First_Name" value={userData.First_Name} onChange={handleInputChange} /></p>
                        <p><span>Middle Name</span> <input name="Middle_Name" value={userData.Middle_Name} onChange={handleInputChange} /></p>
                        <p><span>Last Name</span> <input name="Last_Name" value={userData.Last_Name} onChange={handleInputChange} /></p>
                        <p><span>Primary Skills</span> <input name="Primary_Skills" value={userData.Primary_Skills} onChange={handleInputChange} /></p>
                        <p><span>Secondary Skills</span> <input name="Secondary_Skills" value={userData.Secondary_Skills} onChange={handleInputChange} /></p>
                        <p><span>Employment Type</span> <input name="Employment_Type" value={userData.Employment_Type} onChange={handleInputChange} /></p>
                    </div>
                </div>

                {/* Job Details */}
                <div className="section">
                    <h3 onClick={toggleJobDetails} className="dropdown-header">
                        Job Details
                        <span className={`arrow ${isJobDetailsOpen ? 'open' : ''}`}>&#9660;</span>
                    </h3>
                    {isJobDetailsOpen && (
                        <div className="user-details-grid">
                            <p><span>PO Number</span> <input name="PO_Number" value={userData.PO_Number} onChange={handleInputChange} /></p>
                            <p><span>Position Type</span> <input name="Position_Type" value={userData.Position_Type} onChange={handleInputChange} /></p>
                            <p><span>Request ID</span> <input name="Request_ID" value={userData.Request_ID} onChange={handleInputChange} /></p>
                            <p><span>ECA Submission Date</span> <input name="ECA_Submission_Date" value={userData.ECA_Submission_Date ? formatDate(userData.ECA_Submission_Date) : ''} onChange={handleInputChange} /></p>
                            <p><span>ECA Completion Date</span> <input name="ECA_Completion_Date" value={userData.ECA_Completion_Date ? formatDate(userData.ECA_Completion_Date) : ''} onChange={handleInputChange} /></p>
                            <p><span>Work Start Date</span> <input name="Work_Start_Date" value={userData.Work_Start_Date ? formatDate(userData.Work_Start_Date) : ''} onChange={handleInputChange} /></p>
                            <p><span>MS Employee ID</span> <input name="MS_Employee_ID" value={userData.MS_Employee_ID} onChange={handleInputChange} /></p>
                            <p><span>V-Account</span> <input name="V_Account" value={userData.V_Account} onChange={handleInputChange} /></p>
                            <p><span>Resource Name</span> <input name="Resource_Name" value={userData.Resource_Name} onChange={handleInputChange} /></p>
                            <p><span>Expiry Date</span> <input name="Expiry_Date" value={userData.Expiry_Date ? formatDate(userData.Expiry_Date) : ''} onChange={handleInputChange} /></p>
                            <p><span>Max Policy Expiry Date</span> <input name="Max_Policy_Expiry_Date" value={userData.Max_Policy_Expiry_Date ? formatDate(userData.Max_Policy_Expiry_Date) : ''} onChange={handleInputChange} /></p>
                            <p><span>Work End Date</span> <input name="Work_End_Date" value={userData.Work_End_Date ? formatDate(userData.Work_End_Date) : ''} onChange={handleInputChange} /></p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SingleUserView;

