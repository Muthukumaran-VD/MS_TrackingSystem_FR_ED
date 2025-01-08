import React, { useState, useEffect } from 'react';
import './BgvCompletedModal.css';
import { fetchEmails, submitBgvDetails } from '../../../apiService';
import Select from 'react-select';

const BgvCompletedModal = ({ user, onClose }) => {
    const [bgvDocument, setBgvDocument] = useState(null);
    const [bgvId, setBgvId] = useState('');
    const [toEmails, setToEmails] = useState([]);
    const [ccEmails, setCcEmails] = useState([]);
    const [emailOptions, setEmailOptions] = useState([]);

    useEffect(() => {
        const fetchEmailIds = async () => {
            try {
                const emails = await fetchEmails();
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
        if (file && file.type.match(/(pdf|msword)$/)) {
            setBgvDocument(file);
            console.log('BGV Document file:', file);
        } else {
            alert('Only PDF or Word documents are allowed.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!bgvDocument || !bgvId || toEmails.length === 0) {
            alert('Please upload a BGV document, enter BGV ID, and select at least one recipient.');
            return;
        }

        const selectedToEmails = toEmails.map((email) => email.value);
        const selectedCcEmails = ccEmails.map((email) => email.value);

        const newFormData = {
            document: bgvDocument,
            bgvId: bgvId,
            toEmails: selectedToEmails,
            ccEmails: selectedCcEmails,
            project: user.Project,
            userId: user.ID,
            status: "BGV Completed",
            statusUpdatingDate: new Date().toLocaleDateString(),
        };

        try {
            const isSuccess = await submitBgvDetails(newFormData);
            if (isSuccess) {
                alert('BGV details submitted successfully');
                onClose();
            } else {
                alert('Failed to submit BGV details');
            }
        } catch (error) {
            console.error('Error while submitting BGV details:', error);
            alert('An error occurred while submitting BGV details');
        }
    };

    return (
        <div className="bgv-modal-overlay">
            <div className="bgv-modal">
                <button className="bgv-modal-close-button" onClick={onClose}>X</button>
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
                                <td>{new Date().toLocaleDateString()}</td>
                            </tr>
                        </tbody>
                    </table>
                    <form onSubmit={handleSubmit}>
                        <label>
                            BGV ID:
                            <input
                                type="text"
                                value={bgvId}
                                onChange={(e) => setBgvId(e.target.value)}
                                placeholder="Enter BGV ID"
                            />
                        </label>
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
                        <div className="email-select">
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
