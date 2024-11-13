import React, { useState } from 'react';
import './BGVRequestForm.css';

const BGVRequestForm = () => {
    const [mailTo, setMailTo] = useState('');
    const [ccMail, setCcMail] = useState('');
    const [loading, setLoading] = useState(false);

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
        startDate: '',
        endDate: '',
        teamProject: '',
        subGeo: '',
    });

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
            const response = await fetch('http://localhost:8000/users/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData),
            });

            if (response.ok) {
                alert('Email data sent successfully!');
            } else {
                throw new Error('Failed to send email data');
            }
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

    return (
        <div>
            <div className="header">
                <h2>BGV Request Form</h2>
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
                        <input type="email" value={mailTo} onChange={(e) => setMailTo(e.target.value)} placeholder="Enter or select email" required className="input-field" />
                    </div>
                    <div className="form-group">
                        <label>CC:</label>
                        <input type="email" value={ccMail} onChange={(e) => setCcMail(e.target.value)} placeholder="Enter CC email" className="input-field" />
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
