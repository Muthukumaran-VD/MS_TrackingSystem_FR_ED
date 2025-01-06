import React, { useState, useEffect } from 'react';
import './BgvCompletedModal.css';
import { fetchEmails, submitBgvDetails } from '../../../apiService'; // Assuming submitBgvDetails is available
import Select from 'react-select';

const BgvCompletedModal = ({ user, onClose }) => {
    const [bgvDocument, setBgvDocument] = useState(null);
    const [bgvId, setBgvId] = useState('');
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBgvDocument(file);
            console.log('BGV Document file:', file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate if BGV document, ID, and To Emails are selected
        if (!bgvDocument || !bgvId || toEmails.length === 0) {
            alert('Please upload a BGV document, enter BGV ID, and select at least one recipient.');
            return;
        }

        // Extract selected email values
        const selectedToEmails = toEmails.map((email) => email.value);
        const selectedCcEmails = ccEmails.map((email) => email.value);

        // Construct form data
        const newFormData = {
            bgvDocument: bgvDocument,
            bgvId: bgvId,
            toEmails: selectedToEmails,
            ccEmails: selectedCcEmails,
            name: user.Legal_Name,
            project: user.Project,
            userId: user.ID,
            status: "BGV Completed"
        };

        try {
            const isSuccess = await submitBgvDetails(newFormData);
            if (isSuccess) {
                alert('BGV details submitted successfully');
                onClose(); // Close modal after success
            } else {
                alert('Failed to submit BGV details');
            }
        } catch (error) {
            console.error('Error while submitting BGV details:', error);
            alert('An error occurred while submitting BGV details');
        }
    };

    // Get current date
    const currentDate = new Date().toLocaleDateString();

    return (
        <div className="bgv-modal-overlay">
            <div className="bgv-modal">
                <button className="bgv-modal-close-button" onClick={onClose}>
                    X
                </button>
                <h3 className="bgv-modal-title">Complete BGV for {user?.Legal_Name}</h3>
                <div className="bgv-modal-body">
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
                    <form onSubmit={handleSubmit}>
                        {/* BGV ID Input */}
                        <label>
                            BGV ID:
                            <input
                                type="text"
                                value={bgvId}
                                onChange={(e) => setBgvId(e.target.value)}
                                placeholder="Enter BGV ID"
                            />
                        </label>

                        {/* To Emails Multi-Select */}
                        <div className="email-select">
                            <label>To Emails:</label>
                            <Select
                                options={emailOptions}
                                value={toEmails}
                                onChange={setToEmails}
                                isMulti
                                placeholder="Select To Emails"
                            />
                        </div>

                        {/* CC Emails Multi-Select */}
                        <div className="email-select">
                            <label>CC Emails:</label>
                            <Select
                                options={emailOptions.map((email) => ({
                                    value: email.ccValue || email.value, // Ensure it defaults to 'value' if 'ccValue' is missing
                                    label: email.ccValue || email.label,
                                }))}
                                value={ccEmails}
                                onChange={setCcEmails}
                                isMulti
                                placeholder="Select CC Emails (Optional)"
                            />
                        </div>

                        {/* Upload BGV Document */}
                        <label>
                            Upload BGV Document:
                            <input type="file" accept="application/pdf,application/msword" onChange={handleFileChange} />
                        </label>

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BgvCompletedModal;
