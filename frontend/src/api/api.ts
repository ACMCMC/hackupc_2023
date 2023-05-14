// Methods for interacting with the backend API

import axios from 'axios';
import { ESClient } from './elasticsearch';

const api = axios.create({
    baseURL: 'https://api.mikasa.tech',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getAppliances = async (searchTerms: string[], forStudents: boolean, sustainable: boolean, orderBy: string) => {
    const response = await api.post('/getAppliances', { params: { params: searchTerms, forStudents: forStudents, sustainable: sustainable, orderBy: orderBy } });
    return response.data;
}

export const getCompletion = async (text: string) => {
    //return 'do';
    const response = await api.get('/getCompletion', { params: { text: text } });
    // Only keep the text after the last 'Answer: '
    const answer = response.data[0]['generated_text'].split('Answer: ').pop();
    return answer;
}

export const getReview = async (text: string) => {
    //return 'do';
    const response = await api.get('/getReview', { params: { params: text } });
    return response.data;
}

export const getHouses = async (searchTerms: string[], forStudents: boolean, sustainable: boolean, orderBy: string) => {
    const result = await ESClient.search({
        index: 'search-mikasa',
        body: {
            query: {
                match: {
                    "oven": "true"
                }
            }
        }
    });
    return result;
}