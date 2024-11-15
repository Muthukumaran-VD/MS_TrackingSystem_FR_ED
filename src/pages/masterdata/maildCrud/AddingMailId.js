import React, { useState } from 'react';

function AddingMail() {
    const [mailTo, setMailTo] = useState('');
    const [ccMail, setCcMail] = useState('');
    const [message, setMessage] = useState(''); // State to track success message

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailData = {
            mailTo,
            ccMail,
        };
        try {
            const response = await fetch('http://localhost:8000/users/adding-mail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData),
            });

            if (response.ok) {
                // Assuming the response returns a success message and sno
                const result = await response.json();
                console.log("Email sent successfully:", result);
                // Set success message with sno or generic message
                setMessage(`Email details saved successfully with ID: ${result.sno}`);
            } else {
                setMessage("Failed to send email.");
            }
        } catch (error) {
            console.error("Error sending email:", error);
            setMessage("Error sending email.");
        }
    };

    return (
        <div>
            <h1>Adding Email</h1>
            <form onSubmit={handleSubmit} className="email-form">
                <div className="form-group">
                    <label>Send To Employee:</label>
                    <input
                        type="email"
                        value={mailTo}
                        onChange={(e) => setMailTo(e.target.value)}
                        placeholder="Enter or select email"
                        required
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label>CC:</label>
                    <input
                        type="email"
                        value={ccMail}
                        onChange={(e) => setCcMail(e.target.value)}
                        placeholder="Enter CC email"
                        className="input-field"
                    />
                </div>
                <button type="submit" className="submit-button">Send Email</button>
            </form>

            {/* Conditional rendering of success/failure message */}
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default AddingMail;
