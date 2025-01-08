import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const submitBgvDetails = async (formData) => {
    try {
        const { userId, document, toEmails, ccEmails, project, status, statusUpdatingDate } = formData;

        const formDataToSend = new FormData();
        formDataToSend.append('userId', userId);
        formDataToSend.append('toEmails', JSON.stringify(toEmails));
        formDataToSend.append('ccEmails', JSON.stringify(ccEmails));
        formDataToSend.append('project', project);
        formDataToSend.append('status', status);
        formDataToSend.append('statusUpdatingDate', statusUpdatingDate);

        if (document) {
            formDataToSend.append('document', document); // Correct field name
        }

        const response = await fetch(`${BASE_URL}/users/update-bgv/${userId}`, {
            method: 'POST',
            body: formDataToSend,
        });

        return response.ok;
    } catch (error) {
        console.error('Error submitting BGV details:', error);
        throw error;
    }
};




export const completeBgvDetails = async (userId, formData) => {
    try {
        const response = await fetch(`/api/complete-bgv/${userId}`, {
            method: 'POST',
            body: formData,
        });
        return response.ok;
    } catch (error) {
        console.error('Error completing BGV details:', error);
        throw error;
    }
};

export const submitEcaDetails = async (userId, ecaForm) => {
    try {
        const response = await fetch(`/api/eca-shared/${userId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ecaForm),
        });
        return response.ok;
    } catch (error) {
        console.error('Error submitting ECA details:', error);
        throw error;
    }
};



export const fetchUsers = async (page, limit, searchQuery) => {
    const response = await axios.get(`${BASE_URL}/users/getbgvemployee`, {
        params: { page, limit, search: searchQuery }
    });
    console.log(response);
    return response.data;
};

export const fetchStatuses = async () => {
    return [
        { status_id: "ST001", name: "Requested Personal Details", role: "Manager" },
        { status_id: "ST002", name: "Personal Details Shared", role: "Employee" },
        { status_id: "ST003", name: "BGV Initiated", role: "Employee" },
        { status_id: "ST004", name: "BGV Submitted", role: "HR" },
        { status_id: "ST005", name: "BGV Completed", role: "HR" },
        { status_id: "ST006", name: "ECA Shared", role: "Manager" },
        { status_id: "ST007", name: "ECA Initiated", role: "Manager" },
        { status_id: "ST008", name: "SCOC Training Completed", role: "Employee" },
        { status_id: "ST009", name: "Credentials Recieved", role: "Employee" },
        { status_id: "ST010", name: "Setup System", role: "Employee" },
    ];
};


export const updateUserStatus = async (userId, statusId) => {
    const response = await axios.post(`${BASE_URL}/users/updatinguserstatus`, { userId, status: statusId });
    return response.status === 200;
};

export const fetchEmails = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/users/emails`);
        return response.data?.emails || [];
    } catch (error) {
        console.error('Failed to fetch email IDs', error);
        throw error;
    }
};

// Send email data
export const sendEmailData = async (emailData) => {
    try {
        const response = await fetch(`${BASE_URL}/send-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData),
        });
        if (!response.ok) {
            throw new Error('Failed to send email data');
        }
        return response;
    } catch (error) {
        console.error('Error sending email data:', error);
        throw error;
    }
};