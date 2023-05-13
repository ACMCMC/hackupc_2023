// Methods for interacting with the backend API

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.mikasa.tech',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getHouses = async (searchTerms: string[], forStudents: boolean, sustainable: boolean, orderBy: string) => {
    const response = await api.post('/getHouses', { params: { params: searchTerms, forStudents: forStudents, sustainable: sustainable, orderBy: orderBy } });
    return response.data;
}

export const getCompletion = async (text: string) => {
    //return 'do';
    const response = await api.get('/getCompletion', { params: { text: text } });
    return response.data;
}

export const getReview = async (text: string) => {
    //return 'do';
    const response = await api.get('/getReview', { params: { params: text } });
    return response.data;
}