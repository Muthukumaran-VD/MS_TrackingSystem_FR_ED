import React, { useState } from 'react';
import './EcaSharedModal.css'
// import "../../assets/ecaFormimages/positionTypes/image.png"

const EcaSharedModal = ({ user, onClose, onSubmit }) => {
    const [ecaForm, setEcaForm] = useState({
        vendorAccountTemplate: '',
        physicalWorkLocation: '',
        workLocationSubGeo: '',
        staffingType: '',
        outsourcedId: '',
        costCenter: '',
        projectCode: '',
        standardTitle: '',
        discipline: '',
        poNumber: '',
        reportsToManager: '',
        domain: '',
        startDate: '',
        endDate: '',
        toMail: '',
        ccMail: '',
        firstName: '',
        lastName: '',
        backgroundCheckId: '',
        workedAtMicrosoftBefore: '',
        workedAs: '',
        formerAlias: ''
    });

    const [showPositionImages, setShowPositionImages] = useState({
        outsourced: false,
        contractor: false,
        businessGuest: false
    });

    const [showTitleImages, setShowTitleImages] = useState({
        option1: false,
        option2: false
    });

    const handleTogglePositionImage = (key) => {
        setShowPositionImages((prev) => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleToggleTitleImage = (key) => {
        setShowTitleImages((prev) => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleEcaFormChange = (e) => {
        const { name, value } = e.target;
        setEcaForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleEcaSharedSubmit = () => {
        if (!ecaForm.vendorAccountTemplate || !ecaForm.physicalWorkLocation) {
            alert("Please complete all required fields.");
            return;
        }
        onSubmit(ecaForm);
    };

    return (
        <div className="eca-modal">
            <div className="eca-modal-content">
                <button
                    className="close-button"
                    onClick={onClose}
                >
                    &times;
                </button>
                <h3>Submit ECA Shared Details</h3>
                <form className="eca-form-container">
                    <div className="form-field">
                        <p>Vendor Account Template</p>
                        <input
                            type="text"
                            name="vendorAccountTemplate"
                            placeholder="Vendor Account Template"
                            value={ecaForm.vendorAccountTemplate}
                            onChange={handleEcaFormChange}
                        />
                    </div>
                    <div className="form-field">
                        <p>Physical Work Location</p>
                        <input
                            type="text"
                            name="physicalWorkLocation"
                            placeholder="Physical Work Location"
                            value={ecaForm.physicalWorkLocation}
                            onChange={handleEcaFormChange}
                        />
                    </div>
                    <div className="form-field">
                        <p>Work Location Sub Geo</p>
                        <input
                            type="text"
                            name="workLocationSubGeo"
                            placeholder="Work Location Sub Geo"
                            value={ecaForm.workLocationSubGeo}
                            onChange={handleEcaFormChange}
                        />
                    </div>
                    <div className="form-field">
                        <p>Staffing Type</p>
                        <select
                            name="staffingType"
                            value={ecaForm.staffingType}
                            onChange={handleEcaFormChange}
                        >
                            <option value="">Select Staffing Type</option>
                            <option value="Contractor">Contractor</option>
                            <option value="Outsourced">Outsourced</option>
                            <option value="Business Guest">Business Guest</option>
                        </select>
                    </div>
                    <div className="form-field">
                        <p>Outsourced ID</p>
                        <input
                            type="text"
                            name="outsourcedId"
                            placeholder="Outsourced ID"
                            value={ecaForm.outsourcedId}
                            onChange={handleEcaFormChange}
                        />
                    </div>
                    <div className="form-field">
                        <p>Cost Center</p>
                        <input
                            type="text"
                            name="costCenter"
                            placeholder="Cost Center"
                            value={ecaForm.costCenter}
                            onChange={handleEcaFormChange}
                        />
                    </div>
                    <div className="form-field">
                        <p>Project Code (optional)</p>
                        <input
                            type="text"
                            name="projectCode"
                            placeholder="Project Code"
                            value={ecaForm.projectCode}
                            onChange={handleEcaFormChange}
                        />
                    </div>
                    <div className="form-field">
                        <p>Standard Title</p>
                        <input
                            type="text"
                            name="standardTitle"
                            placeholder="Standard Title"
                            value={ecaForm.standardTitle}
                            onChange={handleEcaFormChange}
                        />
                    </div>
                    <div className="form-field">
                        <p>Discipline</p>
                        <input
                            type="text"
                            name="discipline"
                            placeholder="Discipline"
                            value={ecaForm.discipline}
                            onChange={handleEcaFormChange}
                        />
                    </div>
                    <div className="form-field">
                        <p>PO Number</p>
                        <input
                            type="text"
                            name="poNumber"
                            placeholder="PO Number"
                            value={ecaForm.poNumber}
                            onChange={handleEcaFormChange}
                        />
                    </div>
                    <div className="form-field">
                        <p>Reports to Manager</p>
                        <input
                            type="text"
                            name="reportsToManager"
                            placeholder="Reports to Manager (Name and V-alias)"
                            value={ecaForm.reportsToManager}
                            onChange={handleEcaFormChange}
                        />
                    </div>
                    <div className="form-field">
                        <p>Domain</p>
                        <input
                            type="text"
                            name="domain"
                            placeholder="Domain"
                            value={ecaForm.domain}
                            onChange={handleEcaFormChange}
                        />
                    </div>
                    <div className="form-field">
                        <p>Start Date</p>
                        <input
                            type="date"
                            name="startDate"
                            value={ecaForm.startDate}
                            onChange={handleEcaFormChange}
                        />
                    </div>
                    <div className="form-field">
                        <p>End Date</p>
                        <input
                            type="date"
                            name="endDate"
                            value={ecaForm.endDate}
                            onChange={handleEcaFormChange}
                        />
                    </div>
                    <div className="form-field">
                        <p>To Mail</p>
                        <input
                            type="email"
                            name="toMail"
                            placeholder="To Mail"
                            value={ecaForm.toMail}
                            onChange={handleEcaFormChange}
                        />
                    </div>
                    <div className="form-field">
                        <p>CC Mail</p>
                        <input
                            type="email"
                            name="ccMail"
                            placeholder="CC Mail"
                            value={ecaForm.ccMail}
                            onChange={handleEcaFormChange}
                        />
                    </div>
                    <div className="form-field">
                        <p>First/Given Legal Name</p>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First/Given Legal Name"
                            value={ecaForm.firstName}
                            onChange={handleEcaFormChange}
                        />
                    </div>
                    <div className="form-field">
                        <p>Last/Family Legal Name</p>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last/Family Legal Name"
                            value={ecaForm.lastName}
                            onChange={handleEcaFormChange}
                        />
                    </div>
                    <div className="form-field">
                        <p>Background Check ID #</p>
                        <input
                            type="text"
                            name="backgroundCheckId"
                            placeholder="Background Check ID # (Must be current)"
                            value={ecaForm.backgroundCheckId}
                            onChange={handleEcaFormChange}
                        />
                    </div>
                    <div className="form-field">
                        <p>Worked at Microsoft Before</p>
                        <select
                            name="workedAtMicrosoftBefore"
                            value={ecaForm.workedAtMicrosoftBefore}
                            onChange={handleEcaFormChange}
                        >
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    {ecaForm.workedAtMicrosoftBefore === "Yes" && (
                        <>
                            <div className="form-field">
                                <p>If Yes, As</p>
                                <select
                                    name="workedAs"
                                    value={ecaForm.workedAs}
                                    onChange={handleEcaFormChange}
                                >
                                    <option value="">Select</option>
                                    <option value="Outsourced">Outsourced</option>
                                    <option value="Contractor">Contractor</option>
                                    <option value="MS FTE">MS FTE</option>
                                </select>
                            </div>
                            <div className="form-field">
                                <p>Former Alias</p>
                                <input
                                    type="text"
                                    name="formerAlias"
                                    placeholder="Former Alias"
                                    value={ecaForm.formerAlias}
                                    onChange={handleEcaFormChange}
                                />
                            </div>
                        </>
                    )}
                    {/* Position Types Section */}
                    <div className="form-section">
                        <h4>Position Types</h4>
                        <div className="position-type" onClick={() => handleTogglePositionImage('outsourced')}>
                            <span>Outsourced Staff</span>
                            {showPositionImages.outsourced && (
                                <img src="../../assets/ecaFormimages/businessGuest/image.png" alt="Outsourced Staff" />
                            )}
                        </div>
                        <div className="position-type" onClick={() => handleTogglePositionImage('contractor')}>
                            <span>Contractor</span>
                            {showPositionImages.contractor && (
                                <img src="../../assets/ecaFormimages/contractor/image.png" alt="Contractor" />
                            )}
                        </div>
                        <div className="position-type" onClick={() => handleTogglePositionImage('businessGuest')}>
                            <span>Business Guest</span>
                            {showPositionImages.businessGuest && (
                                <img src="../../assets/ecaFormimages/positionTypes/image.png" alt="Business Guest" />
                            )}
                        </div>
                    </div>

                    {/* Standard Title Options Section */}
                    <div className="form-section">
                        <h4>Standard Title Options</h4>
                        <div className="standard-title" onClick={() => handleToggleTitleImage('option1')}>
                            <span>Option 1</span>
                            {showTitleImages.option1 && (
                                <img src="../../assets/standardTitleOptions/image1.png" alt="Standard Title Option 1" />
                            )}
                        </div>
                        <div className="standard-title" onClick={() => handleToggleTitleImage('option2')}>
                            <span>Option 2</span>
                            {showTitleImages.option2 && (
                                <img src="../../assets/standardTitleOptions/image2.png" alt="Standard Title Option 2" />
                            )}
                        </div>
                    </div>
                    <br></br>
                    <div className="form-field submit-buttons">
                        <button
                            type="button"
                            className="submit-button-ecaForm"
                            onClick={handleEcaSharedSubmit}
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EcaSharedModal;
