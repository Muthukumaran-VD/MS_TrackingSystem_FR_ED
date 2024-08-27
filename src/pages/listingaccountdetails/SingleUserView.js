import React from 'react';
import formatDate from '../../components/DateFormat';
import logo from '../../assests/images/VD.png';
import Mslogo from '../../assests/images/MS.png';

function SingleUserView({ user, onBackClick }) {
  return (
    <div className="single-user-view">
      <div className="header-container">
        <img src={Mslogo} alt="MS Logo" className="MSlogo" />
        <h2>Single User View</h2>
        <img src={logo} alt="VueData Logo" className="Vuedatalogo" />
      </div>
      <div className='backbutton-right'>
        <button className="backbutton" onClick={onBackClick}>Back to List</button>
      </div>
      <div className="user-details-container">

        {/* Background Details */}
        <div className="section">
          <h3>Background Details</h3>
          <div className="user-details-grid">
            <p><span>BGV ID</span> {user.BGV_ID}</p>
            <p><span>BGV Submission Date</span> {user.BGV_Submission_Date ? formatDate(user.BGV_Submission_Date) : 'No Date Provided'}</p>
            <p><span>BGV Completion Date</span> {user.BGV_Completion_Date ? formatDate(user.BGV_Completion_Date) : 'No Date Provided'}</p>
            <p><span>Legal Name</span> {user.Legal_Name}</p>
            <p><span>Previous MS V-Account</span> {user.Previous_MS_V_Account}</p>
          </div>
        </div>


        {/* Client Details */}
        <div className="section">
          <h3>Client Details</h3>
          <div className="user-details-grid">
            <p><span>Client Partner</span> {user.Client_Partner}</p>
            <p><span>Client Manager</span> {user.Client_Manager}</p>
            <p><span>Client Lead</span> {user.Client_Lead}</p>
            <p><span>Client Partner Email</span> {user.Client_Partner_Email}</p>
            <p><span>Client Manager Email</span> {user.Client_Manager_Email}</p>
            <p><span>Client Lead Email</span> {user.Client_Lead_Email}</p>
            <p><span>Client Partner Location</span> {user.Client_Partner_Location}</p>
            <p><span>Client Manager Location</span> {user.Client_Manager_Location}</p>
            <p><span>Client Lead Location</span> {user.Client_Lead_Location}</p>
          </div>
        </div>

        {/* Billing Details */}
        <div className="section">
          <h3>Billing Details</h3>
          <div className="user-details-grid">
            <p><span>Onsite / Offshore</span> {user.OnSite_Offshore}</p>
            <p><span>Resource Status</span> {user.Resource_Status}</p>
            <p><span>Billing Status</span> {user.Billing_Status}</p>
          </div>
        </div>

        {/* Personal Details */}
        <div className="section">
          <h3>Personal Details</h3>
          <div className="user-details-grid">
            <p><span>VueData Employee ID</span> {user.VueData_Employee_ID}</p>
            <p><span>VueData Email</span> {user.VueData_Email}</p>
            <p><span>Phone Number</span> {user.Phone_Number}</p>
            <p><span>First Name</span> {user.First_Name}</p>
            <p><span>Middle Name</span> {user.Middle_Name}</p>
            <p><span>Last Name</span> {user.Last_Name}</p>
            <p><span>Primary Skills</span> {user.Primary_Skills}</p>
            <p><span>Secondary Skills</span> {user.Secondary_Skills}</p>
            <p><span>Employment Type</span> {user.Employment_Type}</p>
          </div>
        </div>

        {/* Job Details */}
        <div className="section">
          <h3>Job Details</h3>
          <div className="user-details-grid">
            <p><span>PO Number</span> {user.PO_Number}</p>
            <p>
              <span>Position Type</span>
              <input value={user.Position_Type} type="text" id="fname" name="fname" />
            </p>
            <p><span>Request ID</span> {user.Request_ID}</p>
            <p><span>ECA Submission Date</span> {user.ECA_Submission_Date ? formatDate(user.ECA_Submission_Date) : 'No Date Provided'}</p>
            <p><span>ECA Completion Date</span> {user.ECA_Completion_Date ? formatDate(user.ECA_Completion_Date) : 'No Date Provided'}</p>
            <p><span>Work Start Date</span> {user.Work_Start_Date ? formatDate(user.Work_Start_Date) : 'No Date Provided'}</p>
            <p><span>MS Employee ID</span> {user.MS_Employee_ID}</p>
            <p><span>V-Account</span> {user.V_Account}</p>
            <p><span>Resource Name</span> {user.Resource_Name}</p>
            <p><span>Expiry Date</span> {user.Expiry_Date ? formatDate(user.Expiry_Date) : 'No Date Provided'}</p>
            <p><span>Max Policy Expiry Date</span> {user.Max_Policy_Expiry_Date ? formatDate(user.Max_Policy_Expiry_Date) : 'No Date Provided'}</p>
            <p><span>Work End Date</span> {user.Work_End_Date ? formatDate(user.Work_End_Date) : 'No Date Provided'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleUserView;
