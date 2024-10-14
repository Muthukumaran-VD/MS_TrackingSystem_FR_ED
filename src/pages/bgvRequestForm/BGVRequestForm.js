import React, { useState, useEffect } from 'react';
import './BGVRequestForm.css'; // Import the CSS file

const BGVRequestForm = () => {
    const [employees, setEmployees] = useState([]); // For the employee list
    const [mailTo, setMailTo] = useState(''); // For "Send To" email
    const [ccMail, setCcMail] = useState(''); // For "CC" email
    const [availableEmails, setAvailableEmails] = useState([]); // For email suggestions

    // Dummy data for employees
    useEffect(() => {
        const dummyEmployees = [
            { id: 1, name: 'Muthukumaran B', personalEmail: 'muthukumaran.b@vuedata.in', primarySkill: 'MERNStack', secondarySkill: 'Python, .NET', yearsOfExperience: '1.5 years' },
            { id: 2, name: 'Priya S', personalEmail: 'priya.s@fakedomain.com', primarySkill: 'Java', secondarySkill: 'React, SQL', yearsOfExperience: '3 years' },
            { id: 3, name: 'Ravi Kumar', personalEmail: 'ravi.kumar@fakedomain.com', primarySkill: 'Python', secondarySkill: 'Django, JavaScript', yearsOfExperience: '2 years' },
            { id: 4, name: 'Suresh R', personalEmail: 'suresh.r@fakedomain.com', primarySkill: '.NET', secondarySkill: 'Angular, SQL', yearsOfExperience: '4.5 years' },
            { id: 5, name: 'Meena A', personalEmail: 'meena.a@fakedomain.com', primarySkill: 'PHP', secondarySkill: 'Laravel, Vue.js', yearsOfExperience: '2.5 years' },
        ];
        setEmployees(dummyEmployees);

        // Dummy available emails for suggestion
        const dummyEmails = ['hr@fakedomain.com', 'bgv@fakedomain.com', 'manager@fakedomain.com', 'admin@fakedomain.com'];
        setAvailableEmails(dummyEmails);
    }, []);

    // Handle sending mail when an employee's button is clicked
    const handleMailToEmployee = (email) => {
        setMailTo(email); // Set "Send To" field with employee's email
    };

    // Handle mail submission from form
    const handleMailSubmit = (e) => {
        e.preventDefault();
        console.log('Mail sent to:', mailTo);
        console.log('CC:', ccMail);
        setMailTo(''); // Clear the fields after submitting
        setCcMail('');
    };

    // Handle preview action
    const handlePreview = () => {
        console.log('Preview email to:', mailTo);
        console.log('CC:', ccMail);
    };

    return (
        <div>
            <div className="header">
                <h2>BGV Request Form</h2>
            </div>
            <div className='form-component'>
                {/* Input section for manual email and send fields */}
                <div className="form-container">
                    <form onSubmit={handleMailSubmit}>
                        <div className="form-group">
                            <label htmlFor="mailTo">Send To Employee:</label>
                            <input
                                type="email"
                                list="availableEmails"
                                id="mailTo"
                                value={mailTo}
                                onChange={(e) => setMailTo(e.target.value)}
                                placeholder="Enter or select email"
                                required
                                className="input-field"
                            />
                            <datalist id="availableEmails">
                                {availableEmails.map((email) => (
                                    <option key={email} value={email} />
                                ))}
                            </datalist>
                        </div>

                        <div className="form-group">
                            <label htmlFor="ccMail">CC:</label>
                            <input
                                type="email"
                                list="availableEmails"
                                id="ccMail"
                                value={ccMail}
                                onChange={(e) => setCcMail(e.target.value)}
                                placeholder="Enter CC email"
                                className="input-field"
                            />
                        </div>

                        <div className="button-group">
                            <button type="button" className="btn preview-btn" onClick={handlePreview}>Preview</button>
                            <button type="submit" className="btn">Send Email</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* Employee List */}
            <div className="employee-list">
                <h3>Employee List</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Personal Email ID</th>
                            <th>Primary Skill</th>
                            <th>Secondary Skill</th>
                            <th>Years of Experience</th>
                            <th>Send Mail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.name}</td>
                                <td>{employee.personalEmail}</td>
                                <td>{employee.primarySkill}</td>
                                <td>{employee.secondarySkill}</td>
                                <td>{employee.yearsOfExperience}</td>
                                <td>
                                    <button
                                        onClick={() => handleMailToEmployee(employee.personalEmail)}
                                        className="btn"
                                    >
                                        Send Mail
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BGVRequestForm;
