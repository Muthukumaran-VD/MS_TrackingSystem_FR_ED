import React, { useState, useEffect } from 'react';
import './BGVRequestForm.css';
import { fetchEmails, sendEmailData } from '../../apiService'; // Import API functions

const BGVRequestForm = () => {
    const [mailTo, setMailTo] = useState('');
    const [ccMail, setCcMail] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailList, setEmailList] = useState([]);

    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        legalName: '',
        title: '',
        manager: '',
        personalCell: '',
        personalEmail: '',
        country: '',
        startDate: new Date().toISOString().split('T')[0], // Default to today's date
        endDate: '',
        teamProject: '',
        subGeo: '',
    });

    // Fetch email IDs from the backend when the component mounts
    useEffect(() => {
        const fetchEmailIds = async () => {
            try {
                const emails = await fetchEmails(); // Use API service to fetch emails
                setEmailList(emails);
            } catch (error) {
                console.error('Failed to fetch email IDs', error);
            }
        };

        fetchEmailIds();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleMailSubmit = async (e) => {
        e.preventDefault();
        if (!mailTo) {
            alert('Please enter the "Send To" email address.');
            return;
        }
        setLoading(true);

        const emailData = {
            to: mailTo,
            cc: ccMail,
            formData,
        };

        try {
            await sendEmailData(emailData); // Use API service to send email
            alert('Email data sent successfully!');
        } catch (error) {
            alert('Failed to send email data.');
        } finally {
            setMailTo('');
            setCcMail('');
            setFormData({
                firstName: '',
                middleName: '',
                lastName: '',
                legalName: '',
                title: '',
                manager: '',
                personalCell: '',
                personalEmail: '',
                country: '',
                startDate: '',
                endDate: '',
                teamProject: '',
                subGeo: '',
            });
            setLoading(false);
        }
    };

    // Filter out the selected mailTo email from the CC email list
    const filteredEmailList = emailList.filter(email => email !== mailTo);

    return (
        <div>
            <div className="header">
                <h2>BGV Request Form to Initiate BGV</h2>
            </div>
            <form onSubmit={handleMailSubmit} className="form-container">
                <div className="column">
                    <div className="form-group">
                        <label>First Name:</label>
                        <input type="text" name="firstName" className="input-field" value={formData.firstName} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Middle Name:</label>
                        <input type="text" name="middleName" className="input-field" value={formData.middleName} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Last Name:</label>
                        <input type="text" name="lastName" className="input-field" value={formData.lastName} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Legal Name (as per Govt ID):</label>
                        <input type="text" name="legalName" className="input-field" value={formData.legalName} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Title:</label>
                        <input type="text" name="title" className="input-field" value={formData.title} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Manager (Internal):</label>
                        <input type="text" name="manager" className="input-field" value={formData.manager} onChange={handleChange} />
                    </div>
                </div>

                <div className="column">
                    <div className="form-group">
                        <label>Personal Cell No:</label>
                        <input type="text" name="personalCell" className="input-field" value={formData.personalCell} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Personal Email:</label>
                        <input type="email" name="personalEmail" className="input-field" value={formData.personalEmail} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Country in which they work:</label>
                        <input type="text" name="country" className="input-field" value={formData.country} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Start Date:</label>
                        <input type="date" name="startDate" className="input-field" value={formData.startDate} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>End Date:</label>
                        <input type="date" name="endDate" className="input-field" value={formData.endDate} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Team/Project:</label>
                        <input type="text" name="teamProject" className="input-field" value={formData.teamProject} onChange={handleChange} />
                    </div>
                </div>

                <div className="full-width">
                    <div className="form-group">
                        <label>Sub-Geo:</label>
                        <input type="text" name="subGeo" className="input-field" value={formData.subGeo} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Send To Employee:</label>
                        <select
                            value={mailTo}
                            onChange={(e) => setMailTo(e.target.value)}
                            className="input-field"
                            required
                        >
                            <option value="">Select an email</option>
                            {emailList.map((emailObj, index) => (
                                <option key={index} value={emailObj.mailTo}>
                                    {emailObj.mailTo}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>CC:</label>
                        <select
                            value={ccMail}
                            onChange={(e) => setCcMail(e.target.value)}
                            className="input-field"
                        >
                            <option value="">Select a CC email</option>
                            {filteredEmailList.map((emailObj, index) => (
                                <option key={index} value={emailObj.mailTo}>
                                    {emailObj.mailTo}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="button-group">
                        <button type="submit" className="btn-green" disabled={loading}>
                            {loading ? 'Sending...' : 'Send Email'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default BGVRequestForm;
