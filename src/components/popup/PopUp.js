// StatusPopup.js
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './PopUp.css'; // Optional CSS styling

const StatusPopup = ({ isOpen, onClose, onSave, message }) => {
    return (
        <Popup open={isOpen} closeOnDocumentClick onClose={onClose}>
            <div className="popup-content">
                <h4>Status Update Confirmation</h4>
                <p>{message}</p>
                <div className="popup-buttons">
                    <button onClick={onSave}>Save</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </Popup>
    );
};

export default StatusPopup;
