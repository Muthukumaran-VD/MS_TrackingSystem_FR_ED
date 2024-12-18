import React, { useState } from 'react';
import "../../pages/employeeList/UserListing.css";

const BgvSubmissionModal = ({ user, onClose, onSubmit }) => {
    const [screenshot, setScreenshot] = useState(null);
    const [submissionDate, setSubmissionDate] = useState(new Date().toISOString().slice(0, 10));

    const handleFileChange = (e) => setScreenshot(e.target.files[0]);

    const handleSubmit = () => {
        if (!screenshot) {
            alert("Please upload a screenshot.");
            return;
        }
        const formData = new FormData();
        formData.append('screenshot', screenshot);
        formData.append('submissionDate', submissionDate);
        onSubmit(formData);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Submit BGV Screenshot for {user?.Legal_Name}</h3>
                <input type="file" onChange={handleFileChange} />
                <input type="date" value={submissionDate} onChange={(e) => setSubmissionDate(e.target.value)} />
                <br />
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default BgvSubmissionModal;