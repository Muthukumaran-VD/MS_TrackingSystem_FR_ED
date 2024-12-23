import React, { useState } from 'react';
import "./BgvSubmissionModal.css";

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
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="intu-button" onClick={onClose}>X</button>
                <div className="modal-body">
                    <h3>Submit BGV Screenshot for {user?.Legal_Name}</h3>
                    <label>Upload Screenshot:</label>
                    <input type="file" onChange={handleFileChange} />
                    <label>Submission Date:</label>
                    <input type="date" value={submissionDate} onChange={(e) => setSubmissionDate(e.target.value)} />
                </div>
                <div className="modal-footer">
                    <button className="submit-button" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default BgvSubmissionModal;
