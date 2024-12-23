// ConfirmationModal.js
import React from 'react';
import './ConfirmationModal.css';

function ConfirmationModal({ message, onClose, onConfirm }) {
    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <p>{message}</p>
                <div className="modal-actions">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={onConfirm}>Confirm</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;
