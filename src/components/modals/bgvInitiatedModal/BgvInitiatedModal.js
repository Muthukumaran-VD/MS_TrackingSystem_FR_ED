import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // Import react-select
import './BgvInitiatedModal.css';
import { fetchEmails, submitBgvDetails } from '../../../apiService';

function BgvInitiatedModal({ user, onClose, onSubmit }) {
    const [screenshot, setScreenshot] = useState(null);
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

    const handleScreenshotChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setScreenshot(file);
            console.log('Screenshot file:', file);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Validate if screenshot and ToEmails are selected
        if (!screenshot || toEmails.length === 0) {
            alert('Please upload a screenshot and select at least one recipient.');
            return;
        }

        // Extract selected email values
        const selectedToEmails = toEmails.map((email) => email.value);
        const selectedCcEmails = ccEmails.map((email) => email.value);

        // Construct form data
        const newFormData = {
            screenshot: screenshot,
            toEmails: selectedToEmails,
            ccEmails: selectedCcEmails,
            name: user.Legal_Name,
            project: user.Project,
            userId: user.ID,
            status: "BGV Initiated"
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

    // Get current date
    const currentDate = new Date().toLocaleDateString();

    return (
        <div className="bgv-initiated-modal-overlay">
            <div className="bgv-initiated-modal">
                <button className="bgv-initiated-modal-close" onClick={onClose}>
                    X
                </button>
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
                        {/* Upload Screenshot */}
                        <label>
                            Upload Screenshot:
                            <input type="file" accept="image/*" onChange={handleScreenshotChange} />
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
                                    value: email.ccValue || email.value,  // Ensure it defaults to 'value' if 'ccValue' is missing
                                    label: email.ccValue || email.label,
                                }))}
                                value={ccEmails}
                                onChange={setCcEmails}
                                isMulti
                                placeholder="Select CC Emails (Optional)"
                            />
                        </div>

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BgvInitiatedModal;
