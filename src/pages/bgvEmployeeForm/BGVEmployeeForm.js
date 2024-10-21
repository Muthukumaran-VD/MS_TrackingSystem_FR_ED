import React, { useState } from 'react';
import './BGVEmployeeForm.css';

const BGBRequestEmployeeForm = () => {
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
        team: '',
        subGeo: '',
        aadharDocument: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            aadharDocument: e.target.files[0]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
        // Add your form submission logic here (e.g., send the data to an API)
    };

    return (
        <div className="bgb-form-container">
            <h2 className="bgb-form-title">BGV Request Employee Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="bgb-form-layout">
                    {/* Left Column */}
                    <div className="bgb-form-column">
                        <div className="bgb-form-group">
                            <label className="bgb-form-label">First Name:</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="bgb-form-input"
                                required
                            />
                        </div>
                        <div className="bgb-form-group">
                            <label className="bgb-form-label">Middle Name:</label>
                            <input
                                type="text"
                                name="middleName"
                                value={formData.middleName}
                                onChange={handleChange}
                                className="bgb-form-input"
                            />
                        </div>
                        <div className="bgb-form-group">
                            <label className="bgb-form-label">Last Name:</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="bgb-form-input"
                                required
                            />
                        </div>
                        <div className="bgb-form-group">
                            <label className="bgb-form-label">Legal Name (as per Govt ID):</label>
                            <input
                                type="text"
                                name="legalName"
                                value={formData.legalName}
                                onChange={handleChange}
                                className="bgb-form-input"
                                required
                            />
                        </div>
                        <div className="bgb-form-group">
                            <label className="bgb-form-label">Title:</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="bgb-form-input"
                                required
                            />
                        </div>
                        <div className="bgb-form-group">
                            <label className="bgb-form-label">Manager (Internal):</label>
                            <input
                                type="text"
                                name="manager"
                                value={formData.manager}
                                onChange={handleChange}
                                className="bgb-form-input"
                                required
                            />
                        </div>
                        <div className="bgb-form-group">
                            <label className="bgb-form-label">Personal Cell No:</label>
                            <input
                                type="tel"
                                name="personalCell"
                                value={formData.personalCell}
                                onChange={handleChange}
                                className="bgb-form-input"
                                pattern="[0-9]{10}"
                                required
                            />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="bgb-form-column">
                        <div className="bgb-form-group">
                            <label className="bgb-form-label">Personal Email:</label>
                            <input
                                type="email"
                                name="personalEmail"
                                value={formData.personalEmail}
                                onChange={handleChange}
                                className="bgb-form-input"
                                required
                            />
                        </div>
                        <div className="bgb-form-group">
                            <label className="bgb-form-label">Country in which they work:</label>
                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className="bgb-form-input"
                                required
                            />
                        </div>
                        <div className="bgb-form-group">
                            <label className="bgb-form-label">Start Date:</label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                className="bgb-form-input"
                                required
                            />
                        </div>
                        <div className="bgb-form-group">
                            <label className="bgb-form-label">End Date:</label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                className="bgb-form-input"
                            />
                        </div>
                        <div className="bgb-form-group">
                            <label className="bgb-form-label">Team/Project:</label>
                            <input
                                type="text"
                                name="team"
                                value={formData.team}
                                onChange={handleChange}
                                className="bgb-form-input"
                                required
                            />
                        </div>
                        <div className="bgb-form-group">
                            <label className="bgb-form-label">Sub-Geo:</label>
                            <input
                                type="text"
                                name="subGeo"
                                value={formData.subGeo}
                                onChange={handleChange}
                                className="bgb-form-input"
                                required
                            />
                        </div>
                        <div className="bgb-form-group">
                            <label className="bgb-form-label">Upload Aadhar Document:</label>
                            <input
                                type="file"
                                name="aadharDocument"
                                onChange={handleFileChange}
                                className="bgb-form-file-input"
                                accept=".pdf,.jpg,.jpeg,.png"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="bgb-form-group">
                    <label className="bgb-form-label">To:(Mail will send to)</label>
                    <input
                        type="email"
                        name="toEmail"
                        value={formData.toEmail}
                        onChange={handleChange}
                        className="bgb-form-input"
                        required
                    />
                </div>
                <div className="bgb-form-group">
                    <label className="bgb-form-label">CC:(Mail will CC to)</label>
                    <input
                        type="email"
                        name="ccEmail"
                        value={formData.ccEmail}
                        onChange={handleChange}
                        className="bgb-form-input"
                    />
                </div>

                <div className="bgb-form-group">
                    <button type="submit" className="bgb-form-submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default BGBRequestEmployeeForm;
