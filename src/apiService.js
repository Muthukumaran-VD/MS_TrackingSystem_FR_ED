import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const fetchUsers = async (page, limit, searchQuery) => {
    const response = await axios.get(`${BASE_URL}/users`, {
        params: { page, limit, search: searchQuery }
    });
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
