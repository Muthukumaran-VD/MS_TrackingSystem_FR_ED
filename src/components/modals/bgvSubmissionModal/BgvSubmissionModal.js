import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // Import react-select
import "./BgvSubmissionModal.css";
import { fetchEmails } from '../../../apiService';

const BgvSubmissionModal = ({ user, onClose, onSubmit }) => {
    const [screenshot, setScreenshot] = useState(null);
    const [submissionDate, setSubmissionDate] = useState(new Date().toISOString().slice(0, 10));
    const [toEmails, setToEmails] = useState([]);
    const [ccEmails, setCcEmails] = useState([]);
    const [emailOptions, setEmailOptions] = useState([]);

    // Fetch email IDs from the backend when the component mounts
    useEffect(() => {
        const fetchEmailIds = async () => {
            try {
                const emails = await fetchEmails();
                console.log(emails);

                // Convert emails to react-select format
                const formattedEmails = emails.map((email) => ({
                    value: email.mailTo,
                    label: email.mailTo,
                    ccValue: email.ccMail,
                }));
                setEmailOptions(formattedEmails);
            } catch (error) {
                console.error('Failed to fetch email IDs', error);
            }
        };

        fetchEmailIds();
    }, []);

    const handleFileChange = (e) => setScreenshot(e.target.files[0]);

    const handleSubmit = () => {
        if (!screenshot) {
            alert("Please upload a screenshot.");
            return;
        }

        const selectedToEmails = toEmails.map((email) => email.value);
        const selectedCcEmails = ccEmails.map((email) => email.value);

        const formData = new FormData();
        formData.append('screenshot', screenshot);
        formData.append('submissionDate', submissionDate);
        formData.append('toEmails', selectedToEmails);
        formData.append('ccEmails', selectedCcEmails);
        onSubmit(formData);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="intu-button" onClick={onClose}>X</button>
                <div className="modal-body">
                    <h3>Submit BGV Screenshot for {user?.Legal_Name}</h3>
                    
                    {/* Upload Screenshot */}
                    <label>Upload Screenshot:</label>
                    <input type="file" onChange={handleFileChange} />

                    {/* Submission Date */}
                    <label>Submission Date:</label>
                    <input type="date" value={submissionDate} onChange={(e) => setSubmissionDate(e.target.value)} />

                    {/* To Emails Multi-Select */}
                    <label>To Emails:</label>
                    <Select
                        options={emailOptions}
                        value={toEmails}
                        onChange={setToEmails}
                        isMulti
                        placeholder="Select To Emails"
                    />

                    {/* CC Emails Multi-Select */}
                    <label>CC Emails:</label>
                    <Select
                        options={emailOptions.map((email) => ({
                            value: email.ccValue || email.value,
                            label: email.ccValue || email.label,
                        }))}
                        value={ccEmails}
                        onChange={setCcEmails}
                        isMulti
                        placeholder="Select CC Emails (Optional)"
                    />
                </div>
                <div className="modal-footer">
                    <button className="submit-button" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default BgvSubmissionModal;
