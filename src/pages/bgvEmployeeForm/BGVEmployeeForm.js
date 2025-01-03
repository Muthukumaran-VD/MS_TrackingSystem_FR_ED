import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to access route params
import './BGVEmployeeForm.css';
import axios from 'axios';
import formatDate from '../../components/dateFormat/DateFormat';

const BGBRequestEmployeeForm = () => {
    const { id } = useParams(); // Get the ID from the URL
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
        aadharDocument: null,
        toEmail: '',
        ccEmail: '',
        id: '' // Initialize id here for form submission
    });

    useEffect(() => {
        // Fetch the form data from the backend when the component mounts
        const fetchData = async () => {
            try {
                const response = await axios(`http://localhost:8000/users/bgv-employeeform/${id}`);
                const data = response.data; // No need for response.data.json()
                if (data.error) {
                    console.error('Error:', data.error);
                    return;
                }
                // Set the form data from the response
                setFormData({
                    id: data.ID, // Ensure the id is set from the response
                    firstName: data.First_Name || '',
                    middleName: data.Middle_Name || '',
                    lastName: data.Last_Name || '',
                    legalName: data.Legal_Name || '',
                    title: data.Title || '',
                    manager: data.manager || '',
                    personalCell: data.Phone_Number || '',
                    personalEmail: data.VueData_Email || '',
                    country: data.Country || '',
                    startDate: formatDate(data.Request_Raised_Date) || '',
                    endDate: data.Work_End_Date || '',
                    team: data.Project || '',
                    subGeo: data.Sub_Geo || '',
                    aadharDocument: null, // Aadhar document is likely to be uploaded, not pre-filled
                    toEmail: '', // Set default or fetched if available
                    ccEmail: ''  // Set default or fetched if available
                });
            } catch (error) {
                console.error('Error fetching form data:', error);
            }
        };

        fetchData(); // Trigger the fetch on component mount
    }, [id]); // Dependency array includes id so it triggers when the ID changes

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
            aadharDocument: e.target.files[0] // Ensure the file is stored
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formDataObj = {
            id: formData.id, // Ensure the backend ID is included
            firstName: formData.firstName,
            middleName: formData.middleName,
            lastName: formData.lastName,
            legalName: formData.legalName,
            title: formData.title,
            manager: formData.manager,
            personalCell: formData.personalCell,
            personalEmail: formData.personalEmail,
            country: formData.country,
            startDate: formData.startDate,
            endDate: formData.endDate,
            team: formData.team,
            subGeo: formData.subGeo,
            toEmail: formData.toEmail,
            ccEmail: formData.ccEmail,
        };
    
        console.log('Submitting Data:', formDataObj);
    
        const data = new FormData();
        data.append('data', JSON.stringify(formDataObj));
        if (formData.aadharDocument) {
            data.append('aadharDocument', formData.aadharDocument);
        }
    
        try {
            const response = await axios.put('http://localhost:8000/users/update-aadhar-email', data);
            console.log('Email sent and data updated:', response.data);
            window.alert(response.data.message);
        } catch (error) {
            console.error('Error:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
            }
        }
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
