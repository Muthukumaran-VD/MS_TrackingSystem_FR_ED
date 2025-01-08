import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // Import react-select
import "./BgvSubmissionModal.css";
import { fetchEmails, submitBgvDetails } from '../../../apiService';

const BgvSubmissionModal = ({ user, onClose, onSubmit }) => {
    const [document, setDocument] = useState(null);
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

    const handleFileChange = (e) => setDocument(e.target.files[0]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Validate if screenshot and ToEmails are selected
        if (!document || toEmails.length === 0) {
            alert('Please upload a screenshot and select at least one recipient.');
            return;
        }

        // Extract selected email values
        const selectedToEmails = toEmails.map((email) => email.value);
        const selectedCcEmails = ccEmails.map((email) => email.value);
        // Get current date
        const currentDate = new Date().toLocaleDateString();
        // Construct form data for FormData object
        const newFormData = {
            document: document,
            toEmails: selectedToEmails,
            ccEmails: selectedCcEmails,
            project: user.Project,
            userId: user.ID,
            status: "BGV Submitted",
            statusUpdatingDate: currentDate, // Include current date
        };
        try {
            const isSuccess = await submitBgvDetails(newFormData);
            if (isSuccess) {
                alert('BGV details submitted successfully');
                onClose();  // Close modal after success
            } else {
                alert('Failed to submit BGV details');
            }
        } catch (error) {
            console.error('Error while submitting BGV details:', error);
            alert('An error occurred while submitting BGV details');
        }
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
                    <button className="submit-button" onClick={handleFormSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default BgvSubmissionModal;
