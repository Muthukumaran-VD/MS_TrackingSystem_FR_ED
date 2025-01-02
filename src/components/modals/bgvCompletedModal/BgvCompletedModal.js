import React, { useState, useEffect } from 'react';
import './BgvCompletedModal.css';
import { fetchEmails } from '../../../apiService';
import Select from 'react-select'; // Import react-select

const BgvCompletedModal = ({ user, onClose, onSubmit }) => {
    const [bgvDocument, setBgvDocument] = useState(null);
    const [bgvId, setBgvId] = useState('');
    const [toEmails, setToEmails] = useState([]);  // Store as array of selected options
    const [ccEmails, setCcEmails] = useState([]);  // Store as array of selected options
    const [emailList, setEmailList] = useState([]);
    const todayDate = new Date().toLocaleDateString(); // Get today's date

    // Fetch email IDs from the backend when the component mounts
    useEffect(() => {
        const fetchEmailIds = async () => {
            try {
                const emails = await fetchEmails(); // Assume this function fetches email data from your API
                setEmailList(emails);  // emails should be an array of objects
            } catch (error) {
                console.error('Failed to fetch email IDs', error);
            }
        };

        fetchEmailIds();
    }, []);

    const handleFileChange = (e) => setBgvDocument(e.target.files[0]);

    const handleSubmit = () => {
        if (!bgvDocument || !bgvId || toEmails.length === 0) {
            alert("Please fill all required fields: Document, BGV ID, and To Emails.");
            return;
        }

        // Validate email format for multiple emails
        const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const invalidEmails = toEmails.map(email => email.value).filter(email => !emailValidationRegex.test(email));
        if (invalidEmails.length > 0) {
            alert(`Invalid To Emails: ${invalidEmails.join(', ')}`);
            return;
        }

        if (ccEmails.length > 0) {
            const invalidCcEmails = ccEmails.map(email => email.value).filter(email => !emailValidationRegex.test(email));
            if (invalidCcEmails.length > 0) {
                alert(`Invalid CC Emails: ${invalidCcEmails.join(', ')}`);
                return;
            }
        }

        const formData = new FormData();
        formData.append('bgvDocument', bgvDocument);
        formData.append('bgvId', bgvId);
        formData.append('toEmails', toEmails.map(email => email.value).join(','));  // Send emails as comma-separated string
        formData.append('ccEmails', ccEmails.map(email => email.value).join(','));  // Send emails as comma-separated string
        onSubmit(formData);
    };

    // Transform emailList into an array of { value, label } for react-select
    const emailOptions = emailList.map(email => ({
        value: email.mailTo || email.ccMail,  // You can use mailTo or ccMail based on dropdown
        label: email.mailTo || email.ccMail,  // You can use mailTo or ccMail based on dropdown
    }));

    return (
        <div className="bgv-modal-overlay">
            <div className="bgv-modal">
                <button className="bgv-modal-close-button" onClick={onClose}>X</button>
                <h3 className="bgv-modal-title">Complete BGV for {user?.Legal_Name}</h3>
                <p className="bgv-modal-date">Date: {todayDate}</p>
                <div className="bgv-modal-body">
                    <input
                        type="text"
                        className="bgv-modal-text-input"
                        placeholder="Enter BGV ID"
                        value={bgvId}
                        onChange={(e) => setBgvId(e.target.value)}
                    />
                    {/* Dropdown for To Emails with multi-select feature */}
                    <Select
                        className="bgv-modal-dropdown"
                        options={emailOptions}
                        value={toEmails}
                        onChange={setToEmails}
                        isMulti
                        placeholder="Select To Emails"
                    />
                    {/* Dropdown for CC Emails with multi-select feature */}
                    <Select
                        className="bgv-modal-dropdown"
                        options={emailOptions}
                        value={ccEmails}
                        onChange={setCcEmails}
                        isMulti
                        placeholder="Select CC Emails (Optional)"
                    />
                    <h4 className='bgvdocumentupload' >Upload the BGV document</h4>
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
                </div>
            </div>
        </div>
    );
};

export default BgvCompletedModal;
