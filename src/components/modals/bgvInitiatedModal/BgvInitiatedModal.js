import React, { useState } from 'react';
import './BgvInitiatedModal.css';

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

    // Get current date
    const currentDate = new Date().toLocaleDateString();

    return (
        <div className="bgv-initiated-modal-overlay">
            <div className="bgv-initiated-modal">
                <button className="bgv-initiated-modal-close" onClick={onClose}>X</button>
                <h2>BGV Initiated</h2>
                <div className="bgv-initiated-modal-content">
                    <table className="bgv-details-table">
                        <tbody>
                            <tr>
                                <th>Resource Name:</th>
                                <td>{user.Legal_Name}</td>
                            </tr>
                            <tr>
                                <th>Project Title:</th>
                                <td>{user.Project}</td>
                            </tr>
                            <tr>
                                <th>Date:</th>
                                <td>{currentDate}</td>
                            </tr>
                        </tbody>
                    </table>
                    <form onSubmit={handleFormSubmit}>
                        <label>
                            Upload Screenshot:
                            <input type="file" accept="image/*" onChange={handleScreenshotChange} />
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BgvInitiatedModal;
