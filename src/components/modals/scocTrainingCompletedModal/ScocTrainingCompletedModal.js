// ScocTrainingCompletedModal.js
import React, { useState } from 'react';

function ScocTrainingCompletedModal({ user, onClose, onSubmit }) {
    const [screenshot, setScreenshot] = useState(null);
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    const handleFileChange = (e) => {
        setScreenshot(e.target.files[0]);
    };

    const handleSubmit = () => {
        if (screenshot) {
            onSubmit({ screenshot, date: currentDate });
        } else {
            alert('Please upload a screenshot.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h3>SCOC Training Completed</h3>
                <p>User: {user?.Legal_Name}</p>
                <p>Date: {currentDate}</p>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <div className="modal-actions">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default ScocTrainingCompletedModal;
