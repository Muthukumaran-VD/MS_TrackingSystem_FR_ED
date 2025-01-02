import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const submitBgvDetails = async (userId, formData) => {
    try {
        const response = await axios.post(`/api/initiated-bgv/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Indicate that we're sending a file
            },
        });
        return response.status === 200;
    } catch (error) {
        console.error('Error submitting BGV details:', error);
        throw error;
    }
};

export const completeBgvDetails = async (userId, formData) => {
    try {
        const response = await axios.post(`/api/complete-bgv/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Indicate that we're sending a file
            },
        });
        return response.status === 200;
    } catch (error) {
        console.error('Error completing BGV details:', error);
        throw error;
    }
};

export const submitEcaDetails = async (userId, ecaForm) => {
    try {
        const response = await axios.post(`/api/eca-shared/${userId}`, ecaForm, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.status === 200;
    } catch (error) {
        console.error('Error submitting ECA details:', error);
        throw error;
    }
};

export const fetchUsers = async (page, limit, searchQuery) => {
    try {
        const response = await axios.get(`${BASE_URL}/users/getbgvemployee`, {
            params: { page, limit, search: searchQuery },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const fetchStatuses = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/users/statuses`);
        return response.data;
    } catch (error) {
        console.error('Error fetching statuses:', error);
        throw error;
    }
};

export const updateUserStatus = async (userId, statusId) => {
    try {
        const response = await axios.post(`${BASE_URL}/users/updatinguserstatus`, { userId, status: statusId });
        return response.status === 200;
    } catch (error) {
        console.error('Error updating user status:', error);
        throw error;
    }
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
        const response = await axios.post(`${BASE_URL}/users/send-email`, emailData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.status === 200;
    } catch (error) {
        console.error('Error sending email data:', error);
        throw error;
    }
};
