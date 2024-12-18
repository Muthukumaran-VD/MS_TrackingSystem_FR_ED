import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const submitBgvDetails = async (userId, formData) => {
    try {
        const response = await fetch(`/api/update-bgv/${userId}`, {
            method: 'POST',
            body: formData,
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
    const response = await axios.get(`${BASE_URL}/users/statuses`);
    return response.data;
};

export const updateUserStatus = async (userId, statusId) => {
    const response = await axios.post(`${BASE_URL}/users/updatinguserstatus`, { userId, status: statusId });
    return response.status === 200;
};
