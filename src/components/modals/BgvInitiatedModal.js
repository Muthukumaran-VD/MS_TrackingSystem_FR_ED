// BgvInitiatedModal.js
import React, { useState } from 'react';

function BgvInitiatedModal({ user, onClose, onSubmit }) {
    const [screenshot, setScreenshot] = useState(null);

    const handleScreenshotChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setScreenshot(file);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (screenshot) {
            onSubmit({ screenshot });
        } else {
            alert('Please upload a screenshot.');
        }
    };

    return (
        <div className="bgv-initiated-modal-overlay">
            <div className="bgv-initiated-modal">
                <button className="bgv-initiated-modal-close" onClick={onClose}>X</button>
                <h2>BGV Initiated - {user.Legal_Name}</h2>
                <div className="bgv-initiated-modal-content">
                    <p><strong>Resource Name:</strong> {user.Legal_Name}</p>
                    <p><strong>Project Title:</strong> {user.Project}</p>
                    <form onSubmit={handleFormSubmit}>
                        <label>
                            Upload Screenshot:
                            <input type="file" accept="image/*" onChange={handleScreenshotChange} />
                        </label>
                        <br></br>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BgvInitiatedModal;
