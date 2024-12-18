// BgvCompletedModal.js
import React, { useState } from 'react';
import "../../pages/employeeList/UserListing.css";

const BgvCompletedModal = ({ user, onClose, onSubmit }) => {
    const [bgvDocument, setBgvDocument] = useState(null);
    const [bgvId, setBgvId] = useState('');

    const handleFileChange = (e) => setBgvDocument(e.target.files[0]);

    const handleSubmit = () => {
        if (!bgvDocument || !bgvId) {
            alert("Please upload a document and provide a BGV ID.");
            return;
        }
        const formData = new FormData();
        formData.append('bgvDocument', bgvDocument);
        formData.append('bgvId', bgvId);
        onSubmit(formData);
    };

    return (
        <div className="bgv-modal-overlay">
            <div className="bgv-modal">
                <h3 className="bgv-modal-title">Complete BGV for {user?.Legal_Name}</h3>
                <div className="bgv-modal-body">
                    <input
                        type="text"
                        className="bgv-modal-text-input"
                        placeholder="Enter BGV ID"
                        value={bgvId}
                        onChange={(e) => setBgvId(e.target.value)}
                    />
                    <input
                        type="file"
                        className="bgv-modal-file-input"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="bgv-modal-actions">
                    <button className="bgv-modal-submit-button" onClick={handleSubmit}>
                        Submit
                    </button>
                    <button className="bgv-modal-cancel-button" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BgvCompletedModal;
