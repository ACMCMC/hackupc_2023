// Methods for interacting with the backend API

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.mikasa.tech/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getHouses = async (searchTerms: string[]) => {
    const response = await api.get('/getHouses', { params: searchTerms });
    return response.data;
}