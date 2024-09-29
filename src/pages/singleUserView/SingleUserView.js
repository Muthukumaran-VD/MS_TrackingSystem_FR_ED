import React, { useState } from 'react';
import formatDate from '../../components/dateFormat/DateFormat';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate
import "./SingleUserView.css";
import Logo from '../../components/logo/logo';

function SingleUserView() {
    const [isJobDetailsOpen, setIsJobDetailsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Get the user data from location state
    const { user } = location.state || {};

    // If no user data is available, show a message
    if (!user) {
        return <h2>No user data available. Please go back and select a user.</h2>;
    }

    const toggleJobDetails = () => {
        setIsJobDetailsOpen(!isJobDetailsOpen);
    };

    // Function to navigate back to the list view
    const handleBackClick = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className="user-list">
            <Logo />
            <div className='backbutton-right'>
                <button className="backbutton" onClick={handleBackClick}>Back to List</button>
            </div>
            <div className="user-details-container">
                {/* Background Details */}
                <div className="section">
                    <h3>Background Details</h3>
                    <div className="user-details-grid">
                        <p><span>BGV ID</span> <input value={user.BGV_ID} readOnly /></p>
                        <p><span>BGV Submission Date</span> <input value={user.BGV_Submission_Date ? formatDate(user.BGV_Submission_Date) : 'No Date Provided'} readOnly /></p>
                        <p><span>BGV Completion Date</span> <input value={user.BGV_Completion_Date ? formatDate(user.BGV_Completion_Date) : 'No Date Provided'} readOnly /></p>
                        <p><span>Legal Name</span> <input value={user.Legal_Name} readOnly /></p>
                        <p><span>Previous MS V-Account</span> <input value={user.Previous_MS_V_Account} readOnly /></p>
                    </div>
                </div>

                {/* Client Details */}
                <div className="section">
                    <h3>Client Details</h3>
                    <div className="user-details-grid">
                        <p><span>Client Partner</span> <input value={user.Client_Partner} readOnly /></p>
                        <p><span>Client Manager</span> <input value={user.Client_Manager} readOnly /></p>
                        <p><span>Client Lead</span> <input value={user.Client_Lead} readOnly /></p>
                        <p><span>Client Partner Email</span> <input value={user.Client_Partner_Email} readOnly /></p>
                        <p><span>Client Manager Email</span> <input value={user.Client_Manager_Email} readOnly /></p>
                        <p><span>Client Lead Email</span> <input value={user.Client_Lead_Email} readOnly /></p>
                        <p><span>Client Partner Location</span> <input value={user.Client_Partner_Location} readOnly /></p>
                        <p><span>Client Manager Location</span> <input value={user.Client_Manager_Location} readOnly /></p>
                        <p><span>Client Lead Location</span> <input value={user.Client_Lead_Location} readOnly /></p>
                    </div>
                </div>

                {/* Billing Details */}
                <div className="section">
                    <h3>Billing Details</h3>
                    <div className="user-details-grid">
                        <p><span>Onsite / Offshore</span> <input value={user.OnSite_Offshore} readOnly /></p>
                        <p><span>Resource Status</span> <input value={user.Resource_Status} readOnly /></p>
                        <p><span>Billing Status</span> <input value={user.Billing_Status} readOnly /></p>
                    </div>
                </div>

                {/* Personal Details */}
                <div className="section">
                    <h3>Personal Details</h3>
                    <div className="user-details-grid">
                        <p><span>VueData Employee ID</span> <input value={user.VueData_Employee_ID} readOnly /></p>
                        <p><span>VueData Email</span> <input value={user.VueData_Email} readOnly /></p>
                        <p><span>Phone Number</span> <input value={user.Phone_Number} readOnly /></p>
                        <p><span>First Name</span> <input value={user.First_Name} readOnly /></p>
                        <p><span>Middle Name</span> <input value={user.Middle_Name} readOnly /></p>
                        <p><span>Last Name</span> <input value={user.Last_Name} readOnly /></p>
                        <p><span>Primary Skills</span> <input value={user.Primary_Skills} readOnly /></p>
                        <p><span>Secondary Skills</span> <input value={user.Secondary_Skills} readOnly /></p>
                        <p><span>Employment Type</span> <input value={user.Employment_Type} readOnly /></p>
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
                            <p><span>PO Number</span> <input value={user.PO_Number} readOnly /></p>
                            <p><span>Position Type</span> <input value={user.Position_Type} readOnly /></p>
                            <p><span>Request ID</span> <input value={user.Request_ID} readOnly /></p>
                            <p><span>ECA Submission Date</span> <input value={user.ECA_Submission_Date ? formatDate(user.ECA_Submission_Date) : 'No Date Provided'} readOnly /></p>
                            <p><span>ECA Completion Date</span> <input value={user.ECA_Completion_Date ? formatDate(user.ECA_Completion_Date) : 'No Date Provided'} readOnly /></p>
                            <p><span>Work Start Date</span> <input value={user.Work_Start_Date ? formatDate(user.Work_Start_Date) : 'No Date Provided'} readOnly /></p>
                            <p><span>MS Employee ID</span> <input value={user.MS_Employee_ID} readOnly /></p>
                            <p><span>V-Account</span> <input value={user.V_Account} readOnly /></p>
                            <p><span>Resource Name</span> <input value={user.Resource_Name} readOnly /></p>
                            <p><span>Expiry Date</span> <input value={user.Expiry_Date ? formatDate(user.Expiry_Date) : 'No Date Provided'} readOnly /></p>
                            <p><span>Max Policy Expiry Date</span> <input value={user.Max_Policy_Expiry_Date ? formatDate(user.Max_Policy_Expiry_Date) : 'No Date Provided'} readOnly /></p>
                            <p><span>Work End Date</span> <input value={user.Work_End_Date ? formatDate(user.Work_End_Date) : 'No Date Provided'} readOnly /></p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SingleUserView;
