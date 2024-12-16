// BgvCompletedModal.js
import React, { useState } from 'react';

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
        <div className="modal">
            <div className="modal-content">
                <h3>Complete BGV for {user?.Legal_Name}</h3>
                <input type="file" onChange={handleFileChange} />
                <br />
                <input
                    type="text"
                    placeholder="Enter BGV ID"
                    value={bgvId}
                    onChange={(e) => setBgvId(e.target.value)}
                />
                <br />
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default BgvCompletedModal;